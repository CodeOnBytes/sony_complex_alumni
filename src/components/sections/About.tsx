import { about } from "../../data/home";
import { Badge, CheckIcon, Photo, SplitButton } from "../ui";
import { Link } from "react-router-dom";


export default function About() {
  return (
    <section className="about">
      <Photo src={about.image} className="about__photo" />
      <div className="about__body">
        <Badge>{about.badge}</Badge>
        <h2>{about.title}</h2>
        <p>{about.text}</p>
        <ul className="checks">
          {about.points.map((p) => <li key={p}><CheckIcon />{p}</li>)}
        </ul>

        <Link to="/about">
          <SplitButton>More About Us</SplitButton>
        </Link>      
</div>
    </section>
  );
}
