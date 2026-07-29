import { useState } from "preact/hooks";
import type { ChannelKey } from "../data/home";
import { CHANNELS, CHANNEL_ORDER } from "../data/home";
import type { UseCase } from "../data/use-cases";

type FilterKey = "all" | ChannelKey;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  ...CHANNEL_ORDER.map((key) => ({ key, label: CHANNELS[key].label })),
];

export default function UseCasesExplorer({
  cases,
}: {
  cases: readonly UseCase[];
}) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [hiding, setHiding] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState<Set<string>>(
    () => new Set(cases.map((c) => c.slug)),
  );

  const applyFilter = (next: FilterKey) => {
    if (next === filter) return;
    const keep = new Set(
      cases
        .filter((c) => next === "all" || c.channels.includes(next))
        .map((c) => c.slug),
    );
    const toHide = [...visible].filter((slug) => !keep.has(slug));
    setFilter(next);
    if (toHide.length === 0) {
      setVisible(keep);
      return;
    }
    setHiding(new Set(toHide));
    window.setTimeout(() => {
      setVisible(keep);
      setHiding(new Set());
    }, 120);
  };

  const shown = cases.filter((c) => visible.has(c.slug));
  const count = cases.filter(
    (c) => filter === "all" || c.channels.includes(filter),
  ).length;

  return (
    <div class="uc-explorer">
      <div class="uc-filters" role="toolbar" aria-label="Filter by channel">
        <div class="uc-filters__pills">
          {FILTERS.map((f) => {
            const pressed = filter === f.key;
            return (
              <button
                type="button"
                class={`uc-filters__btn${pressed ? " is-active" : ""}`}
                aria-pressed={pressed}
                onClick={() => applyFilter(f.key)}
              >
                {f.key === "all"
                  ? pressed && (
                      <span class="uc-filters__active-dot" aria-hidden="true" />
                    )
                  : (
                      <span
                        class={`channel-dot channel-dot--${f.key}`}
                        aria-hidden="true"
                      />
                    )}
                {f.label}
              </button>
            );
          })}
        </div>
        <span class="uc-filters__count" aria-live="polite">
          {count} of {cases.length}
        </span>
      </div>

      <div class="uc-grid bordered-grid bordered-grid--3">
        {shown.map((u) => (
          <article
            class={`uc-card${hiding.has(u.slug) ? " is-hiding" : ""}`}
            key={u.slug}
            data-slug={u.slug}
          >
            <h3 class="uc-card__title">{u.title}</h3>
            <p class="uc-card__tagline">{u.tagline}</p>
            <p class="uc-card__scenario">{u.scenario}</p>
            <div class="uc-card__metric">
              <span class="uc-card__stat">{u.stat}</span>
              <span class="uc-card__stat-label">{u.statLabel}</span>
            </div>
            <div class="uc-card__chips">
              {u.channels.map((ch) => (
                <span class="uc-card__chip" key={ch}>
                  <span
                    class={`channel-dot channel-dot--${ch}`}
                    aria-hidden="true"
                  />
                  {CHANNELS[ch].label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
