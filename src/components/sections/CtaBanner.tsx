import { ctaBanner } from "../../data/home";
import { ArrowRight } from "../ui";

export default function CtaBanner() {
  return (
    <section className="cta" style={{ backgroundImage: `linear-gradient(90deg,#000000d9 0%,#00000080 55%,#00000040 100%), url(${ctaBanner.image}), linear-gradient(135deg,#3a3a3a,#1a1a1a)` }}>
      <div className="cta__inner container">
        <div className="cta__text">
          <h2>{ctaBanner.title}</h2>
          <p>{ctaBanner.text}</p>
        </div>
        <div className="cta__card">
          <ul>
            {ctaBanner.points.map((p) => (
              <li key={p}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 10.500l4.500 4.500L17 5" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <a href="#" className="cta__btn"><span>{ctaBanner.button}</span><ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}
