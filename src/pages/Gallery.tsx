// src/pages/Gallery.tsx
// The whole Gallery page in one file: content + markup + filter and lightbox logic.
// Styles live at the bottom of src/styles/index.css (section "Gallery page").
// It also reuses .ab-head, .ab-crumb and .ab-banner from the About page styles.
import { useEffect, useRef, useState } from "react";
import { Photo } from "../components/ui";

/* ------------------------------------------------------------------ */
/* CONTENT: edit text, categories and image paths here                 */
/* ------------------------------------------------------------------ */
const header = {
  title: "Photo Gallery",
  intro:
    "Moments from reunions, graduations and community days. Browse the photos and relive the Sony Sugar memories.",
};

const banner = { image: "/images/gallery/gallery-banner.jpg" };

const categories = ["All", "Reunions", "Graduation", "Sports", "Community", "Campus"];

const pageSize = 9;

const photos = [
  { src: "/images/gallery/g-01.jpg", alt: "Alumni of 2005 posing together at the reunion", category: "Reunions" },
  { src: "/images/gallery/g-02.jpg", alt: "Graduates in gowns outside the school hall", category: "Graduation" },
  { src: "/images/gallery/g-03.jpg", alt: "Alumni football match on the school pitch", category: "Sports" },
  { src: "/images/gallery/g-04.jpg", alt: "Volunteers planting trees on the compound", category: "Community" },
  { src: "/images/gallery/g-05.jpg", alt: "Main school building and flag", category: "Campus" },
  { src: "/images/gallery/g-06.jpg", alt: "Reunion dinner tables in the hall", category: "Reunions" },
  { src: "/images/gallery/g-07.jpg", alt: "Pupil receiving a certificate on stage", category: "Graduation" },
  { src: "/images/gallery/g-08.jpg", alt: "Fun run participants at the starting line", category: "Sports" },
  { src: "/images/gallery/g-09.jpg", alt: "Alumni handing over books to the library", category: "Community" },
  { src: "/images/gallery/g-10.jpg", alt: "Classrooms seen from the school field", category: "Campus" },
  { src: "/images/gallery/g-11.jpg", alt: "Old classmates sharing a laugh", category: "Reunions" },
  { src: "/images/gallery/g-12.jpg", alt: "Graduation group photo with teachers", category: "Graduation" },
];

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(pageSize);
  const [open, setOpen] = useState<number | null>(null); // index inside `list`
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const list = filter === "All" ? photos : photos.filter((p) => p.category === filter);
  const shown = list.slice(0, visible);

  const choose = (c: string) => {
    setFilter(c);
    setVisible(pageSize);
    setOpen(null);
  };

  const show = (i: number, el: HTMLElement) => {
    openerRef.current = el;
    setOpen(i);
  };
  const close = () => {
    setOpen(null);
    openerRef.current?.focus();
  };
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length));

  // Lightbox: keyboard controls, page scroll lock, focus on the close button
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null, list.length]);

  const current = open === null ? null : list[open];

  return (
    <>
      {/* Page header */}
      <section className="ab-head">
        <div className="ab-head__row">
          <div>
            <nav className="ab-crumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1.5 1l5 5-5 5" /></svg>
              <span aria-current="page">Gallery</span>
            </nav>
            <h1>{header.title}</h1>
          </div>
          <p className="quote-intro">{header.intro}</p>
        </div>
      </section>

      <Photo src={banner.image} className="ab-banner" />

      <section className="section container gl-main">
        {/* Filters */}
        <div className="gl-filters" role="group" aria-label="Filter photos by category">
          {categories.map((c) => (
            <button key={c} type="button" className={c === filter ? "is-active" : ""} aria-pressed={c === filter} onClick={() => choose(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        {shown.length === 0 ? (
          <p className="gl-empty">No photos in this category yet. Try another one.</p>
        ) : (
          <ul className="gl-grid">
            {shown.map((p, i) => (
              <li key={p.src}>
                <button type="button" className="gl-item" onClick={(e) => show(i, e.currentTarget)} aria-label={`Open photo: ${p.alt}`}>
                  <img src={p.src} alt={p.alt} loading="lazy" />
                  <span className="gl-item__over">
                    <span className="gl-item__tag">{p.category}</span>
                    <span className="gl-item__zoom" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M10 4v12M4 10h12" /></svg>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {visible < list.length && (
          <div className="gl-more">
            <button type="button" className="gl-more__btn" onClick={() => setVisible((v) => v + pageSize)}>
              Load more photos
            </button>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {current && (
        <div className="gl-lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <button ref={closeRef} type="button" className="gl-lb__close" aria-label="Close" onClick={close}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 5l12 12M17 5L5 17" /></svg>
          </button>
          <button type="button" className="gl-lb__nav gl-lb__nav--prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 4l-7 7 7 7" /></svg>
          </button>
          <figure className="gl-lb__fig" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} />
            <figcaption>
              <span>{current.alt}</span>
              <span className="gl-lb__count">{open! + 1} / {list.length}</span>
            </figcaption>
          </figure>
          <button type="button" className="gl-lb__nav gl-lb__nav--next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 4l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
