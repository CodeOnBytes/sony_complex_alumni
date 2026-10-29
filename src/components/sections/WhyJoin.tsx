
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { whyJoin } from "../../data/home";
import {
  Badge,
  BookIcon,
  CapIcon,
  HeartIcon,
  PeopleIcon,
  Photo,
  SplitButton,
} from "../ui";
import { Link } from "react-router-dom";

const icons: Record<string, ReactNode> = {
  people: <PeopleIcon />,
  book: <BookIcon />,
  cap: <CapIcon />,
  heart: <HeartIcon />,
};

export default function WhyJoin() {
  const navigate = useNavigate();

  return (
    <section className="why">
      <div className="why__left">
        <Badge>{whyJoin.badge}</Badge>
        <h2>{whyJoin.title}</h2>

        <div className="why__card">
          <ul>
            {whyJoin.points.map((p) => (
              <li key={p}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M3 10.500l4.500 4.500L17 5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>

        <Link to="/enroll" className="why__enroll-link">
          <SplitButton>{whyJoin.cta}</SplitButton>
        </Link>
        </div>
      </div>

      <Photo src={whyJoin.image} className="why__photo" />

      <div className="why__panel">
        {whyJoin.cards.map((c) => (
          <article key={c.title}>
            <span className="why__icon">{icons[c.icon]}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
