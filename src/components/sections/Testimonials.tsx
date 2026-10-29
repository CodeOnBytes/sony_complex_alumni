import { useState } from "react";
import { testimonials } from "../../data/home";
import { Badge, Photo, SplitButton } from "../ui";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials.items[i];
  return (
    <section className="section container center">
      <Badge>{testimonials.badge}</Badge>
      <h2>{testimonials.title}</h2>
      <p className="lead">{testimonials.intro}</p>
      <div className="testi">
        <Photo src={t.image} className="testi__img" />
        <div className="testi__body">
          <div className="testi__top">
            <div className="testi__who"><h3>{t.name}</h3><span>{t.role}</span></div>
            <span className="testi__mark" aria-hidden="true">”</span>
          </div>
          <blockquote>“{t.quote}”</blockquote>
          <div className="testi__bottom">
            <div className="dots">
              {testimonials.items.map((x, idx) => (
                <button key={x.name} aria-label={`Show testimonial from ${x.name}`}
                  className={idx === i ? "is-active" : ""} onClick={() => setI(idx)} />
              ))}
            </div>
            <SplitButton>More Testimonials</SplitButton>
          </div>
        </div>
      </div>
    </section>
  );
}
