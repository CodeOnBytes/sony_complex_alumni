import { useMemo, useRef, useState } from "react";
import { initiatives } from "../../data/home";
import { ArrowLeft, ArrowRight, Badge, Photo, SplitButton } from "../ui";

export default function Initiatives() {
  const [filter, setFilter] = useState("All");
  const track = useRef<HTMLDivElement>(null);
  const shown = useMemo(
    () => initiatives.items.filter((x) => filter === "All" || x.tag === filter),
    [filter]
  );
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  return (
    <section className="section container">
      <Badge>{initiatives.badge}</Badge>
      <div className="split-head split-head--line">
        <h2>{initiatives.title}</h2>
        <SplitButton>View More</SplitButton>
      </div>
      <div className="filters">
        <div className="filters__chips">
          {initiatives.filters.map((f) => (
            <button key={f} className={f === filter ? "is-active" : ""} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="filters__arrows">
          <button className="round-btn" aria-label="Previous" onClick={() => scroll(-1)}><ArrowLeft /></button>
          <button className="round-btn" aria-label="Next" onClick={() => scroll(1)}><ArrowRight /></button>
        </div>
      </div>
      <div className="track" ref={track}>
        {shown.length === 0 && <p>No initiatives in this category yet.</p>}
        {shown.map((x) => (
          <article className="init" key={x.title}>
            <Photo src={x.image} className="init__img"><span className="init__tag">{x.label}</span></Photo>
            <h3>{x.title}</h3>
            <p>{x.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
