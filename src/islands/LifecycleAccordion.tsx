import { useEffect, useRef, useState } from "preact/hooks";

type Step = {
  numLabel: string;
  title: string;
  desc: string;
  detail: string;
  verified?: boolean;
};

export default function LifecycleAccordion({
  steps,
}: {
  steps: readonly Step[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setReady(true);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      class={`lifecycle-steps lifecycle-steps--stack${ready ? " is-ready" : ""}`}
      data-lifecycle-accordion
    >
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <div
            class={`lifecycle-step${s.verified ? " is-verified" : ""}${isOpen ? " is-open" : ""}`}
            style={`--step-i:${i}`}
            data-lifecycle-step={s.numLabel}
          >
            <div class="lifecycle-step__tile" aria-hidden="true">
              <span class="lifecycle-step__tile-num">{s.numLabel}</span>
              <span class="lifecycle-step__tile-scan" />
            </div>
            <div class="lifecycle-step__num">{s.numLabel}</div>
            <button
              type="button"
              class="lifecycle-step__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <h3 class="lifecycle-step__title">{s.title}</h3>
              <span class="lifecycle-step__chevron" aria-hidden="true">
                ⌄
              </span>
            </button>
            <p class="lifecycle-step__desc">{s.desc}</p>
            <div
              class="lifecycle-step__detail-wrap"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div class="lifecycle-step__detail-inner">
                <p class="lifecycle-step__detail">{s.detail}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
