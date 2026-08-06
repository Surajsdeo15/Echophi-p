export function revealOnView(
  selector = "[data-reveal]",
  threshold = 0.15,
): void {
  const els = document.querySelectorAll<HTMLElement>(selector);
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold },
  );

  els.forEach((el) => io.observe(el));
}
