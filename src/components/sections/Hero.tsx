import { useState } from "react";
import { features, defaultFeature, heroStat } from "../../data/home";
import { ArrowRight, Badge, SplitButton } from "../ui";
import { Link } from "react-router-dom";


export default function Hero() {
  const [active, setActive] = useState(defaultFeature);
  return (
    <section className="hero">
      <div className="hero__photo" />
      <div className="hero__inner">
        <Badge>Knowledge Meets Community</Badge>
        <h1>Connecting Alumni<br />To Lead The Future</h1>
        <p>We believe in the lasting power of friendship and the potential of every graduate who walks through our doors.</p>

        <Link to="/events">
          <SplitButton variant="navy">
            Explore Activities
          </SplitButton>
        </Link>      
        </div>

      <aside className="hero__stat" aria-label="Alumni at a glance">
        <div className="hero__stat-top">
          <strong>{heroStat.value}</strong>
          <div className="avatars">
            {heroStat.avatars.map((a) => (
              <span key={a} style={{ backgroundImage: `url(${a}), linear-gradient(135deg,#d9b99b,#8a6a52)` }} />
            ))}
          </div>
        </div>
        <h3>{heroStat.title}</h3>
        <p>{heroStat.text}</p>
        <span className="hero__years">{heroStat.years}</span>
      </aside>

      <div className="strip" onMouseLeave={() => setActive(defaultFeature)}>
        {features.map((f, i) => (
          <article
            key={f.title}
            tabIndex={0}
            className={`strip__cell ${i === active ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            {i === active && (
            <Link to={f.href} className="strip__cta">
              <span>{f.cta}</span>
              <ArrowRight />
            </Link>           
           )}
          </article>
        ))}
      </div>
    </section>
  );
}
