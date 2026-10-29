// src/pages/About.tsx
// The whole About page in one file: content + markup.
// Styles live at the bottom of src/styles/index.css (section "About page").
import { useState, type ReactNode } from "react";
import { Badge, BookIcon, CapIcon, HeartIcon, PeopleIcon, Photo } from "../components/ui";
import Events from "../components/sections/Events";

/* ------------------------------------------------------------------ */
/* CONTENT: edit text, years and image paths here                      */
/* ------------------------------------------------------------------ */
const header = {
  title: "About Us",
  intro:
    "Since 1997 our alumni association has brought graduates together to celebrate shared memories, support one another, and give back to the school that shaped us.",
  image: "/images/about-hero.jpg",
};

const intro = {
  badge: "About Us",
  title: "A lifelong community of graduates, from 1997 to 2025.",
  paragraphs: [
    "We are a community of graduates committed to staying close to each other and to the school. Through reunions, mentorship and service, we help every class, from our first graduates in 1997 to the newest in 2025, feel at home.",
    "By blending friendship with practical support, we help alumni find jobs, share knowledge, and invest in the next generation of students. Wherever you live and whatever you do, there is a place for you here.",
  ],
  image: "/images/about-main.jpg",
  sideImage: "/images/about-side.jpg",
  mission: {
    title: "Our Mission",
    text: "Our mission is to keep alumni connected, support their growth, and give back to students and the community.",
  },
  vision: {
    title: "Our Vision",
    text: "Our vision is a worldwide alumni family where every graduate can find friends, mentors and opportunities.",
  },
};

const values = {
  badge: "Our Core Values",
  title: "What We Stand For",
  text: "These values guide every reunion, project and programme we run.",
  items: [
    { tab: "Lifelong Friendship", title: "Lifelong Friendship", image: "/images/values-1.jpg", text: "We keep classmates and graduates of every year connected through reunions, chapters and everyday messages." },
    { tab: "Mentorship", title: "Mentorship", image: "/images/values-2.jpg", text: "Experienced alumni guide younger graduates with career advice, introductions and honest feedback." },
    { tab: "Service", title: "Service to Others", image: "/images/values-3.jpg", text: "We volunteer our time and skills on projects that improve the school and the community around it." },
    { tab: "Giving Back", title: "Giving Back", image: "/images/values-4.jpg", text: "Alumni donations fund scholarships and school improvements that help students succeed." },
  ],
};

const history = {
  badge: "Our History",
  title: "Alumni Milestones, 1997 – 2025",
  text: "Our journey reflects steady growth, from a small group of friends to a worldwide association.",
  items: [
    { date: "1997", title: "Foundation", image: "/images/history-1.jpg", text: "The first graduating class founded the alumni association to stay in touch." },
    { date: "2003", title: "First Chapters", image: "/images/history-2.jpg", text: "Regional chapters opened and the first reunion drew hundreds of graduates." },
    { date: "2010", title: "Scholarship Fund", image: "/images/history-3.jpg", text: "Alumni launched a scholarship fund to support students in need." },
    { date: "2018", title: "Mentorship Program", image: "/images/history-4.jpg", text: "We paired graduates with mentors across many industries." },
    { date: "2025", title: "15K+ Members", image: "/images/history-5.jpg", text: "The association now connects graduates from every class since 1997." },
  ],
};

const whyAlumni = {
  badge: "Why Join Us",
  title: "Why Alumni Choose Us",
  text: "Our graduates gain more than a certificate. They keep a network, a source of advice and a community that grows with them. Through reunions, mentorship and service, we help every graduate stay connected and keep moving forward.",
  imageLarge: "/images/why-1.jpg",
  imageTall: "/images/why-2.jpg",
  stats: [
    { value: "20K+", label: "Alumni building rewarding careers around the world" },
    { value: "150+", label: "Events, chapters and programs for every class" },
  ],
  points: [
    { icon: "people", text: "Reconnect with classmates and graduates from every year since 1997." },
    { icon: "book", text: "Learn from alumni leaders and experienced professionals." },
    { icon: "cap", text: "Find jobs, referrals and career advice through the network." },
    { icon: "heart", text: "Give back through mentoring, scholarships and service." },
  ],
};

const icons: Record<string, ReactNode> = {
  people: <PeopleIcon />, book: <BookIcon />, cap: <CapIcon />, heart: <HeartIcon />,
};

const leaders = {
  badge: "Our Leaders",
  title: "Meet Our Alumni Leaders",
  items: [
    { name: "Webster Otugha", role: "Association Chairperson · Class of 1997", image: "/images/leader-1.jpg", bio: "20+ years of mentoring graduates, leading reunions" },
    { name: "Ayacko", role: "Secretary General · Class of 1999", image: "/images/leader-2.jpg", bio: "A founding member who keeps our records, chapters and alumni directory running." },
    { name: "Kenneth Kasuku", role: "Treasurer · Class of 2007", image: "/images/leader-3.jpg", bio: "Manages the scholarship fund and makes sure every donation reaches students." },
  ],
};

const socials = [
  { name: "X", d: "M4 4h4.5l3.7 5L16.5 4H19l-5.7 6.5L20 20h-4.5l-4-5.4L6.8 20H4.3l6-6.9z" },
  { name: "LinkedIn", d: "M5 9h3v10H5zM6.5 4a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM10 9h3v1.4c.5-1 1.7-1.7 3.2-1.7 3 0 3.8 2 3.8 4.5V19h-3v-5c0-1.2-.3-2.2-1.6-2.2S13 12.8 13 14v5h-3z" },
  { name: "Facebook", d: "M14 8V6.5c0-.8.3-1.2 1.3-1.2H17V2h-2.7C11.6 2 10.5 3.6 10.5 6v2H8v3.2h2.5V21H14v-9.8h2.7L17 8z" },
  { name: "YouTube", d: "M3 7c0-1.5 1-2.5 2.5-2.7C8 4 12 4 12 4s4 0 6.5.3C20 4.5 21 5.5 21 7v10c0 1.5-1 2.5-2.5 2.7C16 20 12 20 12 20s-4 0-6.5-.3C4 19.5 3 18.5 3 17V7zm7 2.5v5l5-2.5-5-2.5z" },
];

const ArrowUpRight = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 12L12 4M5.5 4H12v6.5" /></svg>
);

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function About() {
  const [tab, setTab] = useState(0);
  const v = values.items[tab];

  return (
    <>
      {/* Page header */}
      <section className="ab-head">
        <div className="ab-head__row">
          <div>
            <nav className="ab-crumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1.5 1l5 5-5 5" /></svg>
              <span aria-current="page">{header.title}</span>
            </nav>
            <h1>{header.title}</h1>
          </div>
          <p className="quote-intro">{header.intro}</p>
        </div>
      </section>
      <Photo src={header.image} className="ab-banner" />

      {/* About + mission / vision */}
      <section className="section container">
        <div className="ab-intro">
          <div>
            <Badge>{intro.badge}</Badge>
            <h2>{intro.title}</h2>
            {intro.paragraphs.map((p) => <p key={p} className="ab-text">{p}</p>)}
          </div>
          <Photo src={intro.image} className="ab-intro__img" />
        </div>

        <div className="ab-mv">
          <Photo src={intro.sideImage} className="ab-mv__img" />
          <article className="ab-mv__card ab-mv__card--navy">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><circle cx="34" cy="38" r="26" /><circle cx="34" cy="38" r="17" /><circle cx="34" cy="38" r="8" /><path d="M34 38L62 10M54 8h10v10" /></svg>
            <h3>{intro.mission.title}</h3>
            <p>{intro.mission.text}</p>
          </article>
          <article className="ab-mv__card ab-mv__card--maroon">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 36c8-14 18-20 30-20s22 6 30 20c-8 14-18 20-30 20S14 50 6 36z" /><circle cx="36" cy="36" r="10" /><circle cx="36" cy="36" r="3" /></svg>
            <h3>{intro.vision.title}</h3>
            <p>{intro.vision.text}</p>
          </article>
        </div>
      </section>

      {/* Core values */}
      <section className="section container center">
        <Badge>{values.badge}</Badge>
        <h2>{values.title}</h2>
        <p className="lead">{values.text}</p>

        <div className="ab-tabs" role="tablist" aria-label="Core values">
          {values.items.map((t, i) => (
            <button key={t.tab} role="tab" aria-selected={i === tab} className={i === tab ? "is-active" : ""} onClick={() => setTab(i)}>
              {t.tab}
            </button>
          ))}
        </div>

        <Photo src={v.image} className="ab-values__img">
          <div className="ab-values__card">
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        </Photo>
      </section>

      {/* History timeline */}
      <section className="ab-history">
        <div className="container">
          <span className="badge badge--light"><CapIcon />{history.badge}</span>
          <div className="split-head ab-history__head">
            <h2>{history.title}</h2>
            <p className="quote-intro quote-intro--light">{history.text}</p>
          </div>
          <div className="ab-timeline">
            {history.items.map((h) => (
              <article key={h.date}>
                <time className="ab-timeline__date">/{h.date}/</time>
                <span className="ab-timeline__dot" aria-hidden="true" />
                <div className="ab-timeline__card">
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                  <Photo src={h.image} className="ab-timeline__img" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why alumni choose us */}
      <section className="ab-why">
        <div className="ab-why__side">
          <div className="ab-why__media">
            <Photo src={whyAlumni.imageLarge} className="ab-why__photo-lg" />
            <Photo src={whyAlumni.imageTall} className="ab-why__photo-tall" />
          </div>
          <div className="ab-why__stats">
            {whyAlumni.stats.map((st) => (
              <div key={st.value}>
                <strong>{st.value}</strong>
                <p>{st.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ab-why__body">
          <Badge>{whyAlumni.badge}</Badge>
          <h2>{whyAlumni.title}</h2>
          <p className="ab-why__text">{whyAlumni.text}</p>
          <ul className="ab-why__points">
            {whyAlumni.points.map((p) => (
              <li key={p.text}>
                <span className="ab-why__icon">{icons[p.icon]}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reuses the Events section from the home page */}
      <Events />

      {/* Our leaders: hover a card to see the details */}
      <section className="section container">
        <Badge>{leaders.badge}</Badge>
        <h2 className="ab-leaders__title">{leaders.title}</h2>
        <div className="cards3 ab-leaders">
          {leaders.items.map((l) => (
            <article className="ab-leader" key={l.name}>
              <Photo src={l.image} className="ab-leader__photo" />
              <div className="ab-leader__panel">
                <div className="ab-leader__head">
                  <div className="ab-leader__who">
                    <h3><a href="#">{l.name}</a></h3>
                    <span>{l.role}</span>
                  </div>
                  <span className="ab-leader__go ab-leader__go--outline" aria-hidden="true"><ArrowUpRight /></span>
                </div>
                <div className="ab-leader__more">
                  <p>{l.bio}</p>
                  <div className="ab-leader__foot">
                    <div className="ab-leader__socials">
                      {socials.map((so) => (
                        <a key={so.name} href="#" aria-label={`${l.name} on ${so.name}`}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={so.d} /></svg>
                        </a>
                      ))}
                    </div>
                    <a href="#" className="ab-leader__go ab-leader__go--solid" aria-label={`View ${l.name}`}><ArrowUpRight /></a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
