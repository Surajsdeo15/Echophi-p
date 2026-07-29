import { useState } from "preact/hooks";

type Faq = { q: string; a: string };

export default function FaqAccordion({
  items,
  showMarker = false,
}: {
  items: Faq[];
  showMarker?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div class={`faq-acc${showMarker ? " faq-acc--marked" : ""}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div class={`faq-acc__row${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              class="faq-acc__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span class="faq-acc__q-text">
                {showMarker && (
                  <span class="faq-acc__marker" aria-hidden="true">
                    Q.
                  </span>
                )}
                {item.q}
              </span>
              <span class="faq-acc__icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              class="faq-acc__a-wrap"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div class="faq-acc__a-inner">
                <p class="faq-acc__a">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
