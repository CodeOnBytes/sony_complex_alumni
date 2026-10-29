import { programs } from "../../data/home";
import { Badge, BookIcon, PeopleIcon, Photo } from "../ui";

export default function Programs() {
  return (
    <section className="section container center">
      <Badge>{programs.badge}</Badge>
      <h2>{programs.title}</h2>
      <div className="cards3">
        {programs.items.map((p) => (
          <article className="card" key={p.title}>
            <Photo src={p.image} className="card__img" />
            <div className="card__meta">
              <span><BookIcon />{p.count}</span><i /><span><PeopleIcon />{p.members}</span>
            </div>
            <div className="card__body">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <a href="#" className="card__link">{p.link}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
