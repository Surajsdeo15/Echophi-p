/**
 * Echophi responsive audit — implements the Responsive Testing Plan.
 * Usage: AUDIT_BASE=http://localhost:5174 node scripts/responsive-audit.mjs
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.AUDIT_BASE || "http://localhost:5174";
const OUT = join(process.cwd(), "testing/responsive");
const SCREENSHOTS = join(OUT, "screenshots");

const VIEWPORTS = [
  { id: "V1", width: 320, height: 568 },
  { id: "V2", width: 375, height: 812 },
  { id: "V3", width: 390, height: 844 },
  { id: "V4", width: 414, height: 896 },
  { id: "V5", width: 430, height: 932 },
  { id: "V6", width: 639, height: 800 },
  { id: "V7", width: 640, height: 800 },
  { id: "V8", width: 767, height: 800 },
  { id: "V9", width: 768, height: 800 },
  { id: "V10", width: 1023, height: 800 },
  { id: "V11", width: 1024, height: 800 },
  { id: "V12", width: 1280, height: 800 },
  { id: "V13", width: 1440, height: 900 },
  { id: "V14", width: 1920, height: 1080 },
];

const THEMES = ["light", "dark"];

const ALL_PAGES = [
  "/",
  "/about",
  "/pricing",
  "/quality",
  "/use-cases",
  "/contact",
  "/channels/voice",
  "/channels/whatsapp",
  "/channels/email",
  "/channels/sms",
  "/docs/getting-started",
  "/docs/quickstart",
  "/docs/authentication",
  "/docs/conversations",
  "/docs/integration",
  "/docs/event-lifecycle",
  "/docs/rest-webhooks",
  "/docs/receive-webhooks",
  "/docs/verify-hmac",
  "/docs/rate-limits",
  "/docs/retry-policy",
  "/docs/api-versioning",
  "/docs/common-errors",
  "/docs/status-codes",
  "/docs/testing-hookdeck",
  "/docs/testing-ngrok",
  "/docs/testing-webhook-site",
  "/docs/index",
  "/api-reference",
  "/playground",
];

const SMOKE_PAGES = ["/", "/playground", "/docs/getting-started"];
const SMOKE_VIEWPORTS = ["V1", "V9", "V11"];
const EDGE_VIEWPORTS = ["V6", "V7", "V8", "V10"];
const SWEEP_VIEWPORTS = ["V2", "V11"];

async function measure(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sideways = doc.scrollWidth > doc.clientWidth + 1;

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

      const cls =
        el.className && String(el.className).slice
          ? String(el.className).trim().split(/\s+/).slice(0, 3).join(".")
          : "";
      unclipped.push({
        sel: `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${cls ? "." + cls : ""}`,
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
      if (unclipped.length >= 8) break;
    }

    const float = document.querySelector(".float-cta");
    let floatInfo = null;
    let floatCoversFooter = false;
    if (float) {
      const fr = float.getBoundingClientRect();
      floatInfo = {
        right: Math.round(fr.right),
        bottom: Math.round(fr.bottom),
        width: Math.round(fr.width),
        within: fr.right <= vw + 1 && fr.left >= -1,
      };
      const footerLinks = document.querySelectorAll(".footer a, footer a");
      for (const link of footerLinks) {
        const lr = link.getBoundingClientRect();
        if (
          lr.bottom > fr.top &&
          lr.top < fr.bottom &&
          lr.right > fr.left &&
          lr.left < fr.right
        ) {
          floatCoversFooter = true;
          break;
        }
      }
    }

    const container = document.querySelector(".container");
    let gutterOk = true;
    if (container) {
      const cr = container.getBoundingClientRect();
      gutterOk = cr.left >= 8 && cr.left <= 20;
    }

    const smallTargets = [];
    for (const el of document.querySelectorAll(
      "button, a, input, select, textarea, [role='tab']",
    )) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.top < 0 || r.top > vh) continue;
      if (Math.min(r.width, r.height) < 44) {
        const cls =
          el.className && String(el.className).slice
            ? String(el.className).trim().split(/\s+/).slice(0, 2).join(".")
            : "";
        smallTargets.push({
          sel: `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}`,
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
        if (smallTargets.length >= 5) break;
      }
    }

    const navBurger = document.querySelector(".nav__burger");
    const navLinks = document.querySelector(".nav__links");
    const docsToggle = document.querySelector("[data-docs-toggle]");
    const docsSidebar = document.querySelector("[data-docs-sidebar], .docs-sidebar");

    return {
      sideways,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      unclipped,
      floatInfo,
      floatCoversFooter,
      gutterOk,
      smallTargets,
      navMode:
        navBurger && getComputedStyle(navBurger).display !== "none"
          ? "drawer"
          : "desktop",
      docsSidebarVisible:
        docsSidebar &&
        getComputedStyle(docsSidebar).display !== "none" &&
        !docsSidebar.classList.contains("is-open")
          ? getComputedStyle(docsSidebar).display !== "none"
          : docsSidebar?.classList.contains("is-open") ?? false,
      docsToggleVisible:
        docsToggle && getComputedStyle(docsToggle).display !== "none",
      heroTwoCol: !!document.querySelector(".hero-2col"),
      playgroundTwoCol: (() => {
        const pg = document.querySelector(".playground");
        if (!pg) return null;
        const cols = getComputedStyle(pg).gridTemplateColumns;
        return cols && cols !== "none" && cols.split(" ").length >= 2;
      })(),
    };
  });
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("echophi-theme", t);
    } catch (_) {}
  }, theme);
}

async function auditPage(page, path, vp, theme, opts = {}) {
  const { screenshot = false } = opts;
  await page.setViewportSize({ width: vp.width, height: vp.height });
  const url = `${BASE}${path}`;
  let status = 200;
  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    status = resp?.status() ?? 200;
  } catch (e) {
    return {
      path,
      viewport: vp.id,
      theme,
      error: String(e.message || e),
      pass: false,
      checks: {},
    };
  }

  if (status >= 400) {
    return {
      path,
      viewport: vp.id,
      theme,
      status,
      pass: false,
      checks: { http: false },
    };
  }

  await setTheme(page, theme);
  await page.waitForTimeout(150);

  const m = await measure(page);
  const checks = {
    G1_noHorizontalScroll: !m.sideways,
    G2_gutter: m.gutterOk,
    G5_floatWithinViewport: m.floatInfo?.within ?? true,
    G5_floatCoversFooter: !m.floatCoversFooter,
    G6_noUnclippedOverflow: m.unclipped.length === 0,
    G4_tapTargets: m.smallTargets.length === 0,
  };

  const pass = Object.values(checks).every(Boolean);
  let screenshotPath = null;

  if (screenshot || !pass) {
    const slug = `${path.replace(/\//g, "_").replace(/^_/, "") || "home"}__${vp.id}__${theme}`;
    screenshotPath = join(SCREENSHOTS, `${slug}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
  }

  return {
    path,
    viewport: vp.id,
    width: vp.width,
    theme,
    pass,
    checks,
    meta: {
      scrollWidth: m.scrollWidth,
      clientWidth: m.clientWidth,
      unclipped: m.unclipped,
      floatInfo: m.floatInfo,
      smallTargets: m.smallTargets,
      navMode: m.navMode,
      docsToggleVisible: m.docsToggleVisible,
      playgroundTwoCol: m.playgroundTwoCol,
    },
    screenshot: screenshotPath,
  };
}

async function testNavDrawer(page) {
  const findings = [];
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await setTheme(page, "light");

  const trigger = page.locator("[data-nav-drawer-trigger]");
  const burgerVisible = await trigger.isVisible();
  if (!burgerVisible) {
    findings.push({ test: "N1", pass: false, note: "Burger not visible at 375px" });
    return findings;
  }

  await trigger.click();
  await page.waitForTimeout(150);
  const openState = await page.evaluate(() => ({
    open: document.querySelector("[data-nav-drawer]")?.classList.contains("is-open"),
    expanded:
      document.querySelector("[data-nav-drawer-trigger]")?.getAttribute("aria-expanded") ===
      "true",
  }));
  findings.push({
    test: "N1",
    pass: openState.open && openState.expanded,
    note: openState.open ? "Drawer opens" : "Drawer failed to open",
  });

  const docLink = page.locator(".nav__drawer-link", { hasText: "Docs" }).first();
  const apiKey = page.locator(".nav__drawer-api-key");
  findings.push({
    test: "N2",
    pass: (await docLink.count()) > 0 && (await apiKey.count()) > 0,
    note: "Document links and Get API key in drawer",
  });

  for (let i = 0; i < 16; i++) await page.keyboard.press("Tab");
  const trap = await page.evaluate(() =>
    document.querySelector("[data-nav-drawer]")?.contains(document.activeElement),
  );
  findings.push({ test: "N1_focusTrap", pass: trap, note: trap ? "Focus in drawer" : "Focus escaped drawer" });

  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  const closed = await page.evaluate(() => ({
    open: document.querySelector("[data-nav-drawer]")?.classList.contains("is-open"),
    expanded:
      document.querySelector("[data-nav-drawer-trigger]")?.getAttribute("aria-expanded") ===
      "true",
  }));
  findings.push({
    test: "N1_escape",
    pass: !closed.open && !closed.expanded,
    note: closed.open ? "Drawer did not close on Escape" : "Escape closes drawer",
  });

  return findings;
}

async function testNavBreakpoint(page) {
  const findings = [];
  for (const { id, width } of [
    { id: "V10", width: 1023 },
    { id: "V11", width: 1024 },
  ]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const mode = await page.evaluate(() => {
      const burger = document.querySelector(".nav__burger");
      const links = document.querySelector(".nav__links");
      const burgerShown = burger && getComputedStyle(burger).display !== "none";
      const linksShown = links && getComputedStyle(links).display !== "none";
      return { burgerShown, linksShown };
    });
    const expectedDrawer = id === "V10";
    findings.push({
      test: "N4",
      viewport: id,
      pass: expectedDrawer ? mode.burgerShown && !mode.linksShown : mode.linksShown && !mode.burgerShown,
      note: `V10 drawer / V11 desktop — burger:${mode.burgerShown} links:${mode.linksShown}`,
    });
  }
  return findings;
}

async function testDocsSidebar(page) {
  const findings = [];
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/docs/getting-started`, { waitUntil: "networkidle" });
  await setTheme(page, "light");

  const toggle = page.locator("[data-docs-toggle]");
  await toggle.click();
  await page.waitForTimeout(150);
  const open = await page.evaluate(() =>
    document.querySelector("[data-docs-sidebar]")?.classList.contains("is-open"),
  );
  findings.push({ test: "D1", pass: open, note: open ? "Docs sidebar opens" : "Docs toggle failed" });

  await toggle.click();
  await page.waitForTimeout(100);
  const closed = await page.evaluate(() =>
    document.querySelector("[data-docs-sidebar]")?.classList.contains("is-open"),
  );
  findings.push({ test: "D1_close", pass: !closed, note: "Docs sidebar closes on second click" });

  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto(`${BASE}/docs/getting-started`, { waitUntil: "networkidle" });
  const desktop = await page.evaluate(() => ({
    toggleHidden: getComputedStyle(document.querySelector("[data-docs-toggle]")).display === "none",
    sidebarBlock: getComputedStyle(document.querySelector("[data-docs-sidebar]")).display !== "none",
  }));
  findings.push({
    test: "D5",
    pass: desktop.toggleHidden && desktop.sidebarBlock,
    note: `Desktop sidebar visible, toggle hidden`,
  });

  return findings;
}

async function testHeroDemo(page) {
  const findings = [];
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const tabs = page.locator(".hero-demo__tab");
  const count = await tabs.count();
  findings.push({ test: "H3", pass: count === 4, note: `${count} channel tabs at 320px` });

  if (count > 1) {
    await tabs.nth(1).click();
    await page.waitForTimeout(300);
    const panel = await page.evaluate(() => {
      const p = document.querySelector('[role="tabpanel"]');
      return p && p.getBoundingClientRect().width <= window.innerWidth + 1;
    });
    findings.push({ test: "H4", pass: panel, note: "Tab panel fits viewport after switch" });
  }

  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const twoCol = await page.evaluate(() => {
    const grid = document.querySelector(".hero-2col");
    if (!grid) return false;
    const cols = getComputedStyle(grid).gridTemplateColumns;
    return cols.split(" ").length >= 2;
  });
  findings.push({ test: "H2", pass: twoCol, note: "Hero two-column at 1024px" });

  return findings;
}

async function testPlayground(page) {
  const findings = [];
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto(`${BASE}/playground`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const headerOk = await page.evaluate(() => {
    const head = document.querySelector(".playground-intro__head");
    if (!head) return false;
    return head.getBoundingClientRect().width <= window.innerWidth + 1;
  });
  findings.push({ test: "P3", pass: headerOk, note: "Playground header fits at 320px" });

  const oneCol = await page.evaluate(() => {
    const pg = document.querySelector(".playground");
    if (!pg) return null;
    const cols = getComputedStyle(pg).gridTemplateColumns;
    return cols === "none" || cols.split(" ").length < 2;
  });
  findings.push({ test: "P1", pass: oneCol === true, note: "Playground single column at 320px" });

  await page.setViewportSize({ width: 768, height: 800 });
  await page.goto(`${BASE}/playground`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const twoCol = await page.evaluate(() => {
    const pg = document.querySelector(".playground");
    if (!pg) return false;
    const cols = getComputedStyle(pg).gridTemplateColumns;
    return cols.split(" ").length >= 2;
  });
  findings.push({ test: "P2", pass: twoCol, note: "Playground two-column at 768px" });

  const select = page.locator(".playground-field select").first();
  if (await select.count()) {
    const options = await select.locator("option").allTextContents();
    const convIdx = options.findIndex((o) => o.includes("/conversations") || o.includes("conversations"));
    if (convIdx >= 0) {
      await select.selectOption({ index: convIdx });
      await page.waitForTimeout(600);
      const enhancerOk = await page.evaluate(() => {
        const el = document.querySelector(".playground-enhancer");
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.right <= window.innerWidth + 2;
      });
      findings.push({
        test: "P4",
        pass: enhancerOk,
        note: enhancerOk ? "Conversation enhancer fits viewport" : "Enhancer missing or overflows",
      });
    }
  }

  return findings;
}

async function testFaqAccordion(page) {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const btn = page.locator(".faq-acc__q").first();
  if ((await btn.count()) === 0) return [{ test: "FAQ", pass: true, note: "No FAQ on page" }];
  await btn.click();
  await page.waitForTimeout(200);
  const open = await page.evaluate(() =>
    document.querySelector(".faq-acc__row")?.classList.contains("is-open"),
  );
  return [{ test: "FAQ", pass: open, note: open ? "FAQ accordion opens" : "FAQ failed to open" }];
}

async function testContactForm(page) {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  const form = page.locator('form[aria-label="Contact form"]');
  const hasLabel = (await form.count()) > 0;
  const fieldsFull = await page.evaluate(() => {
    const inputs = document.querySelectorAll(".contact-form__body input, .contact-form__body textarea");
    for (const el of inputs) {
      const r = el.getBoundingClientRect();
      const parent = el.closest(".contact-form__body")?.getBoundingClientRect();
      if (!parent) continue;
      if (r.width < parent.width * 0.85) return false;
    }
    return inputs.length > 0;
  });
  return [
    { test: "C1_form", pass: fieldsFull, note: "Form fields full width at 320px" },
    { test: "C1_aria", pass: hasLabel, note: "Contact form has aria-label" },
  ];
}

function buildFinding(id, row, checkKey, severity, component, testCase) {
  return {
    id,
    page: row.path,
    viewport: `${row.viewport} (${row.width}px)`,
    theme: row.theme,
    component,
    testCase,
    severity,
    expected: checkKey,
    actual: row.meta?.unclipped?.length
      ? `Unclipped overflow: ${JSON.stringify(row.meta.unclipped.slice(0, 2))}`
      : row.checks[checkKey] === false
        ? "Check failed"
        : row.error || "Unknown",
    screenshot: row.screenshot,
    status: "Open",
  };
}

function rowsToFindings(rows) {
  const findings = [];
  let n = 1;
  for (const row of rows.filter((r) => !r.pass)) {
    if (row.error) {
      findings.push({
        id: `RESP-${String(n++).padStart(3, "0")}`,
        page: row.path,
        viewport: row.viewport,
        theme: row.theme,
        component: "Page load",
        testCase: "HTTP",
        severity: "P0",
        expected: "Page loads",
        actual: row.error,
        screenshot: row.screenshot,
        status: "Open",
      });
      continue;
    }
    for (const [key, ok] of Object.entries(row.checks || {})) {
      if (ok) continue;
      const sev =
        key.includes("HorizontalScroll") || key.includes("Unclipped")
          ? "P0"
          : key.includes("floatCoversFooter")
            ? "P1"
            : key.includes("tapTargets")
              ? "P2"
              : "P2";
      findings.push(
        buildFinding(
          `RESP-${String(n++).padStart(3, "0")}`,
          row,
          key,
          sev,
          "Layout",
          "G1-G7",
        ),
      );
    }
  }
  return findings;
}

function markdownReport(data) {
  const lines = [
    "# Echophi Responsive Testing Results",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Base URL: ${BASE}`,
    "",
    "## Executive Summary",
    "",
    "| Metric | Result | Target |",
    "|--------|--------|--------|",
    `| Pages tested | ${data.pagesTested} | 30 |`,
    `| Total checks | ${data.totalChecks} | — |`,
    `| Passed | ${data.passed} | — |`,
    `| Failed | ${data.failed} | 0 P0/P1 before release |`,
    `| P0 issues | ${data.bySeverity.P0} | 0 |`,
    `| P1 issues | ${data.bySeverity.P1} | 0 |`,
    `| P2 issues | ${data.bySeverity.P2} | — |`,
    `| Horizontal scroll (G1) failures | ${data.g1Fails} | 0 |`,
    "",
    "## Interactive Tests",
    "",
    "| Test | Pass | Notes |",
    "|------|------|-------|",
  ];

  for (const t of data.interactive) {
    lines.push(`| ${t.test} | ${t.pass ? "PASS" : "FAIL"} | ${t.note || ""} |`);
  }

  lines.push("", "## Smoke Matrix (/, playground, docs/getting-started × V1, V9, V11)", "");
  lines.push("| Page | V1 L | V1 D | V9 L | V9 D | V11 L | V11 D |");
  lines.push("|------|------|------|------|------|-------|-------|");
  for (const row of data.smokeMatrix) {
    lines.push(
      `| ${row.path} | ${row.cells.join(" | ")} |`,
    );
  }

  lines.push("", "## Full Sweep (all pages × V2, V11)", "");
  lines.push("| Page | V2 L | V2 D | V11 L | V11 D |");
  lines.push("|------|------|------|-------|-------|");
  for (const row of data.sweepMatrix) {
    lines.push(`| ${row.path} | ${row.cells.join(" | ")} |`);
  }

  if (data.findings.length) {
    lines.push("", "## Findings Log", "");
    lines.push(
      "| ID | Page | Viewport | Theme | Severity | Test | Expected | Actual | Screenshot |",
    );
    lines.push(
      "|----|------|----------|-------|----------|------|----------|--------|------------|",
    );
    for (const f of data.findings) {
      const shot = f.screenshot ? f.screenshot.split("/").pop() : "—";
      lines.push(
        `| ${f.id} | ${f.page} | ${f.viewport} | ${f.theme} | ${f.severity} | ${f.testCase} | ${f.expected} | ${f.actual?.slice(0, 60)} | ${shot} |`,
      );
    }
  } else {
    lines.push("", "## Findings Log", "", "No automated failures detected.", "");
  }

  lines.push("", "## Known Risk Areas — Manual Follow-up", "");
  lines.push("These items need human visual review even when automated checks pass:");
  lines.push("- HeroDemo tab wrapping aesthetics at 320px");
  lines.push("- Playground rail usability on 768px tablets");
  lines.push("- Pricing tilt card hover on touch devices");
  lines.push("- Long API endpoint path readability on api-reference");
  lines.push("- Contact page at exactly 400px width");
  lines.push("");

  return lines.join("\n");
}

await mkdir(SCREENSHOTS, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const allRows = [];
const vpById = Object.fromEntries(VIEWPORTS.map((v) => [v.id, v]));

console.error("Running smoke pass...");
for (const path of SMOKE_PAGES) {
  for (const vpId of SMOKE_VIEWPORTS) {
    for (const theme of THEMES) {
      const row = await auditPage(page, path, vpById[vpId], theme, {
        screenshot: true,
      });
      allRows.push(row);
    }
  }
}

console.error("Running breakpoint edge tests...");
const edgePages = ["/", "/playground", "/docs/getting-started"];
for (const path of edgePages) {
  for (const vpId of EDGE_VIEWPORTS) {
    for (const theme of ["light"]) {
      allRows.push(await auditPage(page, path, vpById[vpId], theme));
    }
  }
}

console.error("Running full page sweep...");
for (const path of ALL_PAGES) {
  for (const vpId of SWEEP_VIEWPORTS) {
    for (const theme of THEMES) {
      if (
        allRows.some(
          (r) =>
            r.path === path &&
            r.viewport === vpId &&
            r.theme === theme &&
            !SMOKE_PAGES.includes(path),
        )
      )
        continue;
      if (SMOKE_PAGES.includes(path) && SMOKE_VIEWPORTS.includes(vpId)) continue;
      allRows.push(await auditPage(page, path, vpById[vpId], theme));
    }
  }
}

console.error("Running interactive tests...");
const interactive = [
  ...(await testNavDrawer(page)),
  ...(await testNavBreakpoint(page)),
  ...(await testDocsSidebar(page)),
  ...(await testHeroDemo(page)),
  ...(await testPlayground(page)),
  ...(await testFaqAccordion(page)),
  ...(await testContactForm(page)),
];

await browser.close();

const findings = rowsToFindings(allRows);
for (const t of interactive.filter((x) => !x.pass)) {
  findings.push({
    id: `RESP-${String(findings.length + 1).padStart(3, "0")}`,
    page: t.test.startsWith("D") ? "/docs/getting-started" : t.test.startsWith("P") ? "/playground" : "/",
    viewport: t.viewport || "375px",
    theme: "light",
    component: "Interactive",
    testCase: t.test,
    severity: t.test.startsWith("N1") || t.test.startsWith("D1") ? "P0" : "P1",
    expected: "Pass",
    actual: t.note,
    screenshot: null,
    status: "Open",
  });
}

const bySeverity = { P0: 0, P1: 0, P2: 0, P3: 0 };
for (const f of findings) bySeverity[f.severity] = (bySeverity[f.severity] || 0) + 1;

function cell(path, vpId, theme) {
  const r = allRows.find((x) => x.path === path && x.viewport === vpId && x.theme === theme);
  return r?.pass ? "PASS" : "FAIL";
}

const smokeMatrix = SMOKE_PAGES.map((path) => ({
  path,
  cells: [
    cell(path, "V1", "light"),
    cell(path, "V1", "dark"),
    cell(path, "V9", "light"),
    cell(path, "V9", "dark"),
    cell(path, "V11", "light"),
    cell(path, "V11", "dark"),
  ],
}));

const sweepMatrix = ALL_PAGES.map((path) => ({
  path,
  cells: [
    cell(path, "V2", "light"),
    cell(path, "V2", "dark"),
    cell(path, "V11", "light"),
    cell(path, "V11", "dark"),
  ],
}));

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  pagesTested: ALL_PAGES.length,
  totalChecks: allRows.length,
  passed: allRows.filter((r) => r.pass).length,
  failed: allRows.filter((r) => !r.pass).length,
  g1Fails: allRows.filter((r) => r.checks && !r.checks.G1_noHorizontalScroll).length,
  bySeverity,
  smokeMatrix,
  sweepMatrix,
  interactive,
  findings,
  rows: allRows,
};

await writeFile(join(OUT, "results.json"), JSON.stringify(report, null, 2));
await writeFile(join(OUT, "RESULTS.md"), markdownReport(report));

console.log(JSON.stringify({ summary: {
  pagesTested: report.pagesTested,
  totalChecks: report.totalChecks,
  passed: report.passed,
  failed: report.failed,
  interactiveFails: interactive.filter((x) => !x.pass).length,
  findings: findings.length,
  P0: bySeverity.P0,
  P1: bySeverity.P1,
  output: OUT,
}}, null, 2));
