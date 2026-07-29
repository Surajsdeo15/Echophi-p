import { useEffect, useRef, useState } from "preact/hooks";
import type { ChannelKey } from "../data/home";
import { DEMO, CHANNELS, CHANNEL_ORDER } from "../data/home";

type DemoLine = {
  who: string;
  text: string;
  meta?: string;
  self?: boolean;
};

type TimelineEvent = { at: number; run: () => void };

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function createClock(onFrame: (t: number) => void) {
  let raf = 0;
  let start = 0;
  let pauseTotal = 0;
  let pausedAt: number | null = null;
  let stopped = false;

  const tick = (now: number) => {
    if (stopped) return;
    if (document.hidden) {
      if (pausedAt == null) pausedAt = now;
      raf = requestAnimationFrame(tick);
      return;
    }
    if (pausedAt != null) {
      pauseTotal += now - pausedAt;
      pausedAt = null;
    }
    onFrame(now - start - pauseTotal);
    raf = requestAnimationFrame(tick);
  };

  return {
    start() {
      stopped = false;
      start = performance.now();
      pauseTotal = 0;
      pausedAt = null;
      raf = requestAnimationFrame(tick);
    },
    stop() {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}

function runTimeline(events: TimelineEvent[], onDone?: () => void) {
  const sorted = [...events].sort((a, b) => a.at - b.at);
  let i = 0;
  const clock = createClock((t) => {
    while (i < sorted.length && sorted[i].at <= t) {
      sorted[i].run();
      i += 1;
    }
    if (i >= sorted.length) {
      clock.stop();
      onDone?.();
    }
  });
  clock.start();
  return () => clock.stop();
}

function WordSpans({ text }: { text: string }) {
  const words = splitWords(text);
  return (
    <>
      {words.map((w, i) => (
        <span class="hd-word" data-hd-word key={`${i}-${w}`}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function CharSpans({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span class="hd-char" data-hd-char key={`${i}-${ch}`}>
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </>
  );
}

function VoicePanel({ lines }: { lines: DemoLine[] }) {
  return (
    <div class="hero-demo__transcript" data-hd-stage="voice">
      {lines.map((l, i) => (
        <div class="hero-demo__line" data-hd-line={i} key={i}>
          <span class="hero-demo__who hd-reveal" data-hd-who>
            {l.who}
          </span>
          <span class="hero-demo__text" data-hd-text>
            <span class="hd-pulse" data-hd-pulse aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <WordSpans text={l.text} />
          </span>
          <span
            class={`hero-demo__meta hd-reveal${l.meta ? "" : " is-empty"}`}
            data-hd-meta={l.meta ? "1" : "0"}
          >
            {l.meta || ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function WhatsAppPanel({ lines }: { lines: DemoLine[] }) {
  return (
    <div class="hero-demo__bubbles" data-hd-stage="whatsapp">
      {lines.map((l, i) => (
        <div
          class={`hd-wa-row${l.self ? " is-self" : ""}`}
          data-hd-line={i}
          key={i}
        >
          <div class="hd-wa-slot">
            <div class="hd-typing" data-hd-typing aria-hidden="true">
              typing…
            </div>
            <div
              class={`hero-demo__bubble hd-reveal${l.self ? " is-self" : ""}`}
              data-hd-bubble
            >
              {l.text}
            </div>
          </div>
          {l.self ? (
            <span class="hd-tick hd-reveal" data-hd-tick aria-hidden="true">
              ✓
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function EmailPanel({
  lines,
  emailFrom,
  emailSubject,
}: {
  lines: DemoLine[];
  emailFrom?: string;
  emailSubject?: string;
}) {
  return (
    <div class="hero-demo__email" data-hd-stage="email">
      <div class="hero-demo__email-head">
        <div class="hero-demo__email-from">
          From <span>{emailFrom}</span>
        </div>
        <div class="hero-demo__email-subject">{emailSubject}</div>
      </div>
      <div class="hero-demo__email-body">
        {lines.map((l, i) => (
          <div
            class={`hero-demo__email-block${l.self ? "" : " is-quote"}`}
            data-hd-line={i}
            key={i}
          >
            <div class="hero-demo__who hd-reveal" data-hd-who>
              {l.who}
            </div>
            <p class="hero-demo__text hd-email-text" data-hd-text>
              <CharSpans text={l.text} />
              <span class="hd-caret" data-hd-caret aria-hidden="true" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmsPanel({ lines }: { lines: DemoLine[] }) {
  return (
    <div class="hero-demo__bubbles" data-hd-stage="sms">
      {lines.map((l, i) => (
        <div
          class={`hero-demo__bubble hd-pop${l.self ? " is-self" : ""}`}
          data-hd-line={i}
          data-hd-bubble
          key={i}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}

function buildVoiceTimeline(root: HTMLElement): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let t = 0;
  const lines = [...root.querySelectorAll<HTMLElement>("[data-hd-line]")];

  lines.forEach((line, idx) => {
    const who = line.querySelector<HTMLElement>("[data-hd-who]");
    const pulse = line.querySelector<HTMLElement>("[data-hd-pulse]");
    const meta = line.querySelector<HTMLElement>("[data-hd-meta='1']");
    const words = [
      ...line.querySelectorAll<HTMLElement>("[data-hd-word]"),
    ];
    const whoLabel = who?.textContent?.trim() || "";
    const isAgent = whoLabel === "Agent";
    const pace = isAgent ? 70 : 90;

    if (isAgent) {
      events.push({
        at: t,
        run: () => {
          who?.classList.add("is-on");
          pulse?.classList.add("is-on");
        },
      });
      t += 400;
      events.push({
        at: t,
        run: () => pulse?.classList.remove("is-on"),
      });
    } else {
      events.push({
        at: t,
        run: () => who?.classList.add("is-on"),
      });
    }

    let cursor = 0;
    while (cursor < words.length) {
      const size = Math.min(
        words.length - cursor,
        2 + Math.floor(Math.random() * 3),
      );
      const from = cursor;
      const to = cursor + size;
      const jitter = Math.floor(Math.random() * 36) - 12;
      t += Math.max(40, pace + jitter);
      events.push({
        at: t,
        run: () => {
          for (let i = from; i < to; i += 1) words[i]?.classList.add("is-on");
        },
      });
      cursor = to;
    }

    if (meta) {
      t += 16;
      events.push({
        at: t,
        run: () => meta.classList.add("is-on"),
      });
      t += 120;
    }

    if (idx < lines.length - 1) t += 180;
  });

  return events;
}

function buildWhatsAppTimeline(root: HTMLElement): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let t = 120;
  const rows = [...root.querySelectorAll<HTMLElement>("[data-hd-line]")];

  rows.forEach((row, idx) => {
    const typing = row.querySelector<HTMLElement>("[data-hd-typing]");
    const bubble = row.querySelector<HTMLElement>("[data-hd-bubble]");
    const tick = row.querySelector<HTMLElement>("[data-hd-tick]");

    events.push({
      at: t,
      run: () => typing?.classList.add("is-on"),
    });
    t += 700;
    events.push({
      at: t,
      run: () => {
        typing?.classList.remove("is-on");
        bubble?.classList.add("is-on");
      },
    });
    if (tick) {
      t += 160;
      events.push({
        at: t,
        run: () => tick.classList.add("is-on"),
      });
    }
    if (idx < rows.length - 1) t += 380;
  });

  return events;
}

function updateCaret(
  textEl: HTMLElement | null,
  caret: HTMLElement | null,
  count: number,
) {
  if (!textEl || !caret) return;
  const chars = textEl.querySelectorAll<HTMLElement>("[data-hd-char]");
  if (count <= 0) {
    caret.style.transform = "translate(0, 0)";
    return;
  }
  const last = chars[count - 1];
  if (!last) return;
  const parent = textEl.getBoundingClientRect();
  const box = last.getBoundingClientRect();
  caret.style.transform = `translate(${box.right - parent.left}px, 0)`;
}

function buildEmailTimeline(root: HTMLElement): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let t = 100;
  const lines = [...root.querySelectorAll<HTMLElement>("[data-hd-line]")];

  lines.forEach((line, idx) => {
    const who = line.querySelector<HTMLElement>("[data-hd-who]");
    const textEl = line.querySelector<HTMLElement>("[data-hd-text]");
    const caret = line.querySelector<HTMLElement>("[data-hd-caret]");
    const chars = [
      ...(textEl?.querySelectorAll<HTMLElement>("[data-hd-char]") || []),
    ];

    events.push({
      at: t,
      run: () => {
        who?.classList.add("is-on");
        caret?.classList.add("is-on");
        updateCaret(textEl, caret, 0);
      },
    });

    chars.forEach((_, i) => {
      t += 18;
      events.push({
        at: t,
        run: () => {
          chars[i].classList.add("is-on");
          updateCaret(textEl, caret, i + 1);
        },
      });
    });

    events.push({
      at: t,
      run: () => caret?.classList.remove("is-on"),
    });
    if (idx < lines.length - 1) t += 280;
  });

  return events;
}

function buildSmsTimeline(root: HTMLElement): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let t = 80;
  const bubbles = [...root.querySelectorAll<HTMLElement>("[data-hd-bubble]")];
  bubbles.forEach((b, idx) => {
    events.push({
      at: t,
      run: () => b.classList.add("is-on"),
    });
    if (idx < bubbles.length - 1) t += 500;
  });
  return events;
}

function setFinal(root: HTMLElement) {
  root.classList.add("is-final");
  root.classList.remove("is-animating");
  root
    .querySelectorAll(
      ".hd-word, .hd-char, .hd-reveal, .hd-pop, [data-hd-chip], [data-hd-footer], [data-hd-label]",
    )
    .forEach((el) => el.classList.add("is-on"));
  root
    .querySelectorAll("[data-hd-pulse], [data-hd-typing], [data-hd-caret]")
    .forEach((el) => el.classList.remove("is-on"));
}

function resetReveal(root: HTMLElement) {
  root.classList.remove("is-final", "is-animating");
  root
    .querySelectorAll(
      ".hd-word, .hd-char, .hd-reveal, .hd-pop, [data-hd-chip], [data-hd-footer], [data-hd-label], [data-hd-pulse], [data-hd-typing], [data-hd-caret]",
    )
    .forEach((el) => el.classList.remove("is-on"));
  root.querySelectorAll<HTMLElement>("[data-hd-caret]").forEach((c) => {
    c.style.transform = "translate(0, 0)";
  });
}

function reserveHeight(root: HTMLElement) {
  // Content is fully laid out (opacity 0 still occupies space). Lock it.
  root.style.minHeight = `${root.scrollHeight}px`;
}

export default function HeroDemo({
  initial = "voice",
  channel,
}: {
  initial?: ChannelKey;
  /** When set, lock to this channel and hide the tab switcher (channel pages). */
  channel?: ChannelKey;
}) {
  const locked = channel != null;
  const [active, setActive] = useState<ChannelKey>(channel ?? initial);
  const rootRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const enteredRef = useRef(false);
  const skipTabEffect = useRef(true);
  const demo = DEMO[active];

  const cancel = () => {
    stopRef.current?.();
    stopRef.current = null;
  };

  const play = () => {
    const root = rootRef.current;
    if (!root) return;
    cancel();
    resetReveal(root);
    reserveHeight(root);

    if (prefersReducedMotion()) {
      setFinal(root);
      return;
    }

    root.classList.add("is-animating");
    const stage = root.querySelector<HTMLElement>("[data-hd-stage]");
    if (!stage) return;

    let events: TimelineEvent[] = [];
    const kind = stage.dataset.hdStage;
    if (kind === "voice") events = buildVoiceTimeline(stage);
    else if (kind === "whatsapp") events = buildWhatsAppTimeline(stage);
    else if (kind === "email") events = buildEmailTimeline(stage);
    else if (kind === "sms") events = buildSmsTimeline(stage);

    events.push({
      at: 0,
      run: () =>
        root.querySelector<HTMLElement>("[data-hd-label]")?.classList.add("is-on"),
    });

    const lastAt = events.reduce((m, e) => Math.max(m, e.at), 0);
    events.push({
      at: lastAt + 220,
      run: () =>
        root.querySelector<HTMLElement>("[data-hd-chip]")?.classList.add("is-on"),
    });
    events.push({
      at: lastAt + 420,
      run: () =>
        root
          .querySelector<HTMLElement>("[data-hd-footer]")
          ?.classList.add("is-on"),
    });

    stopRef.current = runTimeline(events, () => {
      root.classList.remove("is-animating");
      stopRef.current = null;
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    reserveHeight(root);

    if (prefersReducedMotion()) {
      setFinal(root);
      return;
    }

    resetReveal(root);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || enteredRef.current) return;
        enteredRef.current = true;
        play();
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipTabEffect.current) {
      skipTabEffect.current = false;
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    cancel();
    // Wait one frame so the new channel markup is laid out before measuring.
    const id = requestAnimationFrame(() => {
      reserveHeight(root);
      if (prefersReducedMotion()) {
        setFinal(root);
        return;
      }
      if (enteredRef.current) play();
      else resetReveal(root);
    });

    return () => {
      cancelAnimationFrame(id);
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div class="hero-demo" id="try-it-live" ref={rootRef}>
      {!locked && (
        <div class="hero-demo__tabs" role="tablist" aria-label="Channel demos">
          {CHANNEL_ORDER.map((key) => {
            const on = key === active;
            return (
              <button
                type="button"
                class={`hero-demo__tab${on ? " is-active" : ""}`}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(key)}
              >
                <span
                  class={`channel-dot channel-dot--${key}`}
                  style={{ opacity: on ? 1 : 0.35 }}
                  aria-hidden="true"
                />
                <span>{CHANNELS[key].label}</span>
              </button>
            );
          })}
        </div>
      )}

      <div class="hero-demo__body">
        <div class="hero-demo__label hd-reveal" data-hd-label>
          <span class="hero-demo__label-text">
            {CHANNELS[active].label} · live demo
          </span>
        </div>

        {demo.kind === "transcript" && <VoicePanel lines={demo.lines} />}
        {demo.kind === "email" && (
          <EmailPanel
            lines={demo.lines}
            emailFrom={demo.emailFrom}
            emailSubject={demo.emailSubject}
          />
        )}
        {demo.kind === "chat" && <WhatsAppPanel lines={demo.lines} />}
        {demo.kind === "sms" && <SmsPanel lines={demo.lines} />}

        <div class="hero-demo__chip-row hd-reveal" data-hd-chip>
          <span class="hero-demo__chip">
            <span class="hero-demo__chip-dot" aria-hidden="true" />
            {demo.chip}
          </span>
          <span class="hero-demo__chip-note">by the Echophi quality layer</span>
        </div>
      </div>

      <div class="hero-demo__footer hd-reveal" data-hd-footer>
        <p class="hero-demo__caption">
          Try it yourself — this button really works.
        </p>
        <a class="hero-demo__cta" href={demo.actionHref}>
          {demo.actionLabel}
        </a>
      </div>
    </div>
  );
}
