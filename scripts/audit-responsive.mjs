import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE || "http://127.0.0.1:4321";
const WIDTHS = [375, 768, 1280];
const THEMES = ["light", "dark"];
const PAGES = [
  "/",
  "/quality",
  "/use-cases",
  "/pricing",
  "/contact",
  "/about",
  "/channels/voice",
  "/channels/whatsapp",
  "/channels/email",
  "/channels/sms",
];

async function measure(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const sideways = doc.scrollWidth > doc.clientWidth + 1;

    // Unclipped overflow: element extends past viewport AND no ancestor clips it
    const vw = window.innerWidth;
    const unclipped = [];
    for (const el of document.body.querySelectorAll("*")) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (!(r.right > vw + 2 || r.left < -2)) continue;

      let clipped = false;
      let p = el.parentElement;
      while (p && p !== document.body) {
        const ps = getComputedStyle(p);
        if (
          /(auto|scroll|hidden|clip)/.test(ps.overflowX) ||
          /(auto|scroll|hidden|clip)/.test(ps.overflow) ||
          ps.overflow === "hidden"
        ) {
          clipped = true;
          break;
        }
        p = p.parentElement;
      }
      if (clipped) continue;

      const cls = el.className && String(el.className).slice
        ? String(el.className).trim().split(/\s+/).slice(0, 3).join(".")
        : "";
      unclipped.push({
        sel: `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${cls ? "." + cls : ""}`,
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
      if (unclipped.length >= 8) break;
    }

    // Float CTA geometry
    const float = document.querySelector(".float-cta");
    let floatInfo = null;
    if (float) {
      const fr = float.getBoundingClientRect();
      floatInfo = {
        right: Math.round(fr.right),
        bottom: Math.round(fr.bottom),
        width: Math.round(fr.width),
        within: fr.right <= vw + 1 && fr.left >= -1,
      };
    }

    return {
      sideways,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      unclipped,
      floatInfo,
    };
  });
}

async function auditNav(page) {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const trigger = page.locator("[data-nav-drawer-trigger]");
  await trigger.click();
  await page.waitForTimeout(120);
  const open = await page.evaluate(() => ({
    open: document.querySelector("[data-nav-drawer]")?.classList.contains("is-open"),
    focusInside: document
      .querySelector("[data-nav-drawer]")
      ?.contains(document.activeElement),
    expanded: document
      .querySelector("[data-nav-drawer-trigger]")
      ?.getAttribute("aria-expanded"),
  }));
  for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
  const trap = await page.evaluate(() =>
    document.querySelector("[data-nav-drawer]")?.contains(document.activeElement),
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(120);
  const closed = await page.evaluate(() => ({
    open: document.querySelector("[data-nav-drawer]")?.classList.contains("is-open"),
    focusOnTrigger:
      document.activeElement ===
      document.querySelector("[data-nav-drawer-trigger]"),
    expanded: document
      .querySelector("[data-nav-drawer-trigger]")
      ?.getAttribute("aria-expanded"),
  }));
  return { open, trap, closed };
}

const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext()).newPage();
const rows = [];

for (const path of PAGES) {
  for (const width of WIDTHS) {
    for (const theme of THEMES) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.evaluate((t) => {
        document.documentElement.setAttribute("data-theme", t);
      }, theme);
      await page.waitForTimeout(100);
      const m = await measure(page);
      const pass = !m.sideways && m.unclipped.length === 0 && (m.floatInfo?.within ?? true);
      rows.push({ path, width, theme, pass, ...m });
    }
  }
}

const nav = await auditNav(page);
await browser.close();

const fails = rows.filter((r) => !r.pass);
console.log(
  JSON.stringify(
    {
      summary: { total: rows.length, fails: fails.length, sideways: rows.filter((r) => r.sideways).length },
      fails,
      matrix: PAGES.map((path) => {
        const cell = (w, t) =>
          rows.find((r) => r.path === path && r.width === w && r.theme === t)?.pass
            ? "PASS"
            : "FAIL";
        return {
          path,
          "375L": cell(375, "light"),
          "375D": cell(375, "dark"),
          "768L": cell(768, "light"),
          "768D": cell(768, "dark"),
          "1280L": cell(1280, "light"),
          "1280D": cell(1280, "dark"),
        };
      }),
      nav,
    },
    null,
    2,
  ),
);
