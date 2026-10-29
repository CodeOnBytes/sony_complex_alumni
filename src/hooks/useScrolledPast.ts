import { useEffect, useState } from "react";

/** True once the page has been scrolled further than `px` pixels. */
export function useScrolledPast(px: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const next = window.scrollY > px;

        setPast((current) => (current === next ? current : next));

        ticking = false;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [px]);

  return past;
}