import { useState } from "preact/hooks";
import type { ChannelKey } from "../data/home";

type Check = { t: string; d: string };

const CHANNELS: { key: ChannelKey; label: string }[] = [
  { key: "voice", label: "Voice" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
];

export default function QualityChecksTabs({
  checks,
}: {
  checks: Record<ChannelKey, readonly Check[]>;
}) {
  const [tab, setTab] = useState<ChannelKey>("voice");
  const active = checks[tab];

  return (
    <div class="q-checks">
      <div class="q-checks__tabs" role="tablist" aria-label="Channels">
        {CHANNELS.map((c) => {
          const on = tab === c.key;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={on}
              class={`q-checks__tab${on ? " is-active" : ""}`}
              onClick={() => setTab(c.key)}
            >
              <span
                class={`channel-dot channel-dot--${c.key}`}
                aria-hidden="true"
              />
              {c.label}
            </button>
          );
        })}
      </div>
      <div class="q-checks__grid" role="tabpanel">
        {active.map((k) => (
          <div class="q-checks__card">
            <span class="q-checks__mark" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div>
              <strong class="q-checks__name">{k.t}</strong>
              <p class="q-checks__desc">{k.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
