import { useState } from "react";
import { events } from "../../data/home";
import { Badge, Photo } from "../ui";

export default function Events() {
  const [i, setI] = useState(0);
  const s = events.slides[i];
  return (
    <section className="section container">
      <Badge>{events.badge}</Badge>
      <div className="split-head">
        <h2>{events.title}</h2>
        <p className="quote-intro">{events.intro}</p>
      </div>
      <Photo src={s.image} className="events__hero">
        <div className="events__card">
          <div className="events__stats"><span>{s.stat1}</span><i /><span>{s.stat2}</span></div>
          <div className="events__text"><h3>{s.title}</h3><p>{s.text}</p></div>
        </div>
        <div className="events__thumbs" role="tablist" aria-label="Event categories">
          {events.slides.map((t, idx) => (
            <button key={t.title} role="tab" aria-selected={idx === i} aria-label={t.title}
              className={idx === i ? "is-active" : ""} onClick={() => setI(idx)}
              style={{ backgroundImage: `url(${t.image}), linear-gradient(135deg,#d9d2c7,#a99f91)` }} />
          ))}
        </div>
      </Photo>
    </section>
  );
}
