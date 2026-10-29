// src/pages/Events.tsx
// The whole Events page in one file: content + markup + pagination logic.
// Styles live at the bottom of src/styles/index.css (section "Events page").
// It also reuses .ab-head, .ab-crumb and .ab-banner from the About page styles.
import { useRef, useState } from "react";
import { Photo } from "../components/ui";

/* ------------------------------------------------------------------ */
/* CONTENT: edit text, dates and image paths here                      */
/* ------------------------------------------------------------------ */
const header = {
  title: "All Events",
  intro:
    "From class reunions to scholarship drives, see what the Sony alumni family is planning and find an event you can join.",
};

const banner = { image: "/images/events/events-banner.jpg" };

const perPage = 6;

const events = [
  { image: "/images/events/event-1.jpg", category: "Reunion", title: "Class of 2005 Reunion Brings Old Friends Home", date: "Nov 14, 2026", time: "10:00 AM" },
  { image: "/images/events/event-2.jpg", category: "Fundraiser", title: "Scholarship Fun Run Supports Bright Learners", date: "Nov 21, 2026", time: "07:30 AM" },
  { image: "/images/events/event-3.jpg", category: "Ceremony", title: "Graduation Day Celebrates Outstanding Pupils", date: "Nov 27, 2026", time: "09:00 AM" },
  { image: "/images/events/event-4.jpg", category: "Mentorship", title: "Career Day Connects Pupils With Alumni Mentors", date: "Dec 03, 2026", time: "11:00 AM" },
  { image: "/images/events/event-5.jpg", category: "Sports", title: "Alumni Football Match Fires Up the Old Pitch", date: "Dec 05, 2026", time: "02:00 PM" },
  { image: "/images/events/event-6.jpg", category: "Community", title: "Tree Planting Day Greens the School Compound", date: "Dec 12, 2026", time: "08:30 AM" },
  { image: "/images/events/event-7.jpg", category: "Workshop", title: "Skills Workshop Helps Young Graduates Get Hired", date: "Jan 16, 2027", time: "10:00 AM" },
  { image: "/images/events/event-8.jpg", category: "Meeting", title: "Annual General Meeting Brings Members Together", date: "Jan 30, 2027", time: "01:00 PM" },
  { image: "/images/events/event-9.jpg", category: "Fundraiser", title: "Charity Dinner Raises Funds for the New Library", date: "Feb 13, 2027", time: "06:00 PM" },
];

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Events() {
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);

  const pages = Math.ceil(events.length / perPage);
  const shown = events.slice((page - 1) * perPage, page * perPage);

  const go = (n: number) => {
    setPage(n);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Page header */}
      <section className="ab-head">
        <div className="ab-head__row">
          <div>
            <nav className="ab-crumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1.5 1l5 5-5 5" /></svg>
              <span aria-current="page">Events</span>
            </nav>
            <h1>{header.title}</h1>
          </div>
          <p className="quote-intro">{header.intro}</p>
        </div>
      </section>

      <Photo src={banner.image} className="ab-banner" />

      {/* Event cards */}
      <section className="section container ev-list" ref={listRef}>
        <div className="ev-grid">
          {shown.map((e) => (
            <article className="ev-card" key={e.title}>
              <Photo src={e.image} className="ev-card__img" />
              <span className="ev-card__cat">{e.category}</span>
              <h3>{e.title}</h3>
              <div className="ev-card__rule" />
              <p className="ev-card__meta">
                <time>{e.date}</time>
                <span className="ev-card__sep" aria-hidden="true" />
                <time>{e.time}</time>
              </p>
            </article>
          ))}
        </div>

        {pages > 1 && (
          <nav className="ev-pager" aria-label="Events pages">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={n === page ? "is-active" : ""}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Page ${n}`}
                onClick={() => go(n)}
              >
                {n}
              </button>
            ))}
            {page < pages && (
              <button type="button" aria-label="Next page" onClick={() => go(page + 1)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9h14M10.5 3.5L16 9l-5.5 5.5" /></svg>
              </button>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
