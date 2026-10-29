// src/pages/Contact.tsx
// The whole Contact page in one file: content + markup + form logic.
// Styles live at the bottom of src/styles/index.css (section "Contact page").
// It also reuses .ab-head and .ab-crumb from the About page styles.
import { useState, type FormEvent, type ReactNode } from "react";
import { Arrow, Badge, Photo } from "../components/ui";

/* ------------------------------------------------------------------ */
/* CONTENT: edit text, contacts and image paths here                   */
/* ------------------------------------------------------------------ */
const header = {
  title: "Contact Us",
  intro:
    "Whether you want to reconnect with classmates, join an event, or support a scholarship, our alumni team is happy to hear from you.",
};

const banner = {
  image: "/images/contact-banner.jpg",
  title: "Connect With Our Alumni Team and Stay Part of the Sony Family",
};

const info = [
  { icon: "pin", title: "Our Address", lines: ["Sony Sugar Complex Primary School", "Sare-Awendo, Awendo, Migori County, Kenya"] },
  { icon: "phone", title: "Contact With Us", lines: ["Phone: +254 700 000 000", "WhatsApp: +254 711 000 000"] },
  { icon: "mail", title: "Email Address", lines: ["info@sonyalumni.org", "alumni@sonyalumni.org"] },
  { icon: "clock", title: "Working Time", lines: ["Monday – Friday:", "8:00 AM – 5:00 PM"] },
];

const socials = [
  { name: "X", d: "M4 4h4.5l3.7 5L16.5 4H19l-5.7 6.5L20 20h-4.5l-4-5.4L6.8 20H4.3l6-6.9z" },
  { name: "LinkedIn", d: "M5 9h3v10H5zM6.5 4a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM10 9h3v1.4c.5-1 1.7-1.7 3.2-1.7 3 0 3.8 2 3.8 4.5V19h-3v-5c0-1.2-.3-2.2-1.6-2.2S13 12.8 13 14v5h-3z" },
  { name: "Facebook", d: "M14 8V6.5c0-.8.3-1.2 1.3-1.2H17V2h-2.7C11.6 2 10.5 3.6 10.5 6v2H8v3.2h2.5V21H14v-9.8h2.7L17 8z" },
  { name: "YouTube", d: "M3 7c0-1.5 1-2.5 2.5-2.7C8 4 12 4 12 4s4 0 6.5.3C20 4.5 21 5.5 21 7v10c0 1.5-1 2.5-2.5 2.7C16 20 12 20 12 20s-4 0-6.5-.3C4 19.5 3 18.5 3 17V7zm7 2.5v5l5-2.5-5-2.5z" },
];

const form = {
  title: "Get In Touch",
  submit: "Send Message",
  firstYear: 1997,
  lastYear: 2025,
  topics: ["Join the association", "Update my details", "Events and reunions", "Scholarships and giving", "Mentorship and careers", "Something else"],
};

const directory = {
  badge: "Alumni Office",
  title: "Alumni Association Directory",
  text: "Our volunteers and staff help graduates reconnect, plan reunions, and support students. Reach the right team below and we will reply as soon as we can.",
  offices: {
    title: "Frequently Contacted Offices",
    head: ["Department", "Office", "Phone", "Email"],
    rows: [
      ["Alumni Office", "Admin Block, Room 1", "+254 700 000 001", "alumni@sonyalumni.org"],
      ["Membership & Records", "Admin Block, Room 2", "+254 700 000 002", "members@sonyalumni.org"],
      ["Events & Reunions", "Hall Office", "+254 700 000 003", "events@sonyalumni.org"],
      ["Scholarship Fund", "Bursar's Office", "+254 700 000 004", "giving@sonyalumni.org"],
      ["Mentorship & Careers", "Library, Room 3", "+254 700 000 005", "careers@sonyalumni.org"],
    ],
  },
  chapters: {
    title: "Chapter Coordinators",
    head: ["Chapter", "Region", "Phone", "Email"],
    rows: [
      ["Awendo Chapter", "Migori County", "+254 700 000 011", "awendo@sonyalumni.org"],
      ["Kisumu Chapter", "Kisumu County", "+254 700 000 012", "kisumu@sonyalumni.org"],
      ["Nairobi Chapter", "Nairobi County", "+254 700 000 013", "nairobi@sonyalumni.org"],
      ["Mombasa Chapter", "Mombasa County", "+254 700 000 014", "mombasa@sonyalumni.org"],
      ["Overseas Alumni", "Worldwide", "+254 700 000 015", "overseas@sonyalumni.org"],
    ],
  },
  note: "Office hours may vary during school holidays. Please contact the relevant office before you visit.",
};

const map = {
  title: "Map to Sony Sugar Complex Primary School",
  // If the pin is not exactly right, open the school in Google Maps, choose
  // Share > Embed a map, and paste the src="..." link here instead.
  src: `https://www.google.com/maps?q=${encodeURIComponent("Sony Sugar Complex Primary School, Awendo, Migori, Kenya")}&output=embed`,
};

/* ------------------------------------------------------------------ */
/* SMALL HELPERS                                                       */
/* ------------------------------------------------------------------ */
const svg = (children: ReactNode) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const icons: Record<string, ReactNode> = {
  pin: svg(<><path d="M14 25s8-7.5 8-14a8 8 0 10-16 0c0 6.5 8 14 8 14z" /><circle cx="14" cy="11" r="3" /></>),
  phone: svg(<><path d="M5 15v-2a9 9 0 0118 0v2" /><path d="M5 15h3v6H6a1 1 0 01-1-1v-5zM23 15h-3v6h2a1 1 0 001-1v-5z" /><path d="M20 21c0 2-3 3-6 3" /></>),
  mail: svg(<><rect x="3" y="6" width="22" height="16" rx="2" /><path d="M4 8l10 8 10-8" /></>),
  clock: svg(<><circle cx="14" cy="14" r="11" /><path d="M14 7v7l5 3" /></>),
};

async function sendMessage(data: Record<string, FormDataEntryValue>): Promise<void> {
  const api = import.meta.env.VITE_API_URL as string | undefined;
  if (!api) {
    // Demo mode: no backend configured yet, so just pretend it worked.
    await new Promise((r) => setTimeout(r, 600));
    return;
  }
  const res = await fetch(`${api}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Message failed");
}

function DirectoryTable({ head, rows, label }: { head: string[]; rows: string[][]; label: string }) {
  return (
    <div className="ct-table-wrap">
      <table className="ct-table" aria-label={label}>
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i}>{i === 3 ? <a href={`mailto:${c}`}>{c}</a> : c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const years = Array.from({ length: form.lastYear - form.firstYear + 1 }, (_, i) => form.lastYear - i);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("sending");
    try {
      await sendMessage(Object.fromEntries(new FormData(formEl)));
      setStatus("sent");
      formEl.reset();
    } catch {
      setStatus("error");
    }
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
              <span aria-current="page">{header.title}</span>
            </nav>
            <h1>{header.title}</h1>
          </div>
          <p className="quote-intro">{header.intro}</p>
        </div>
      </section>

      {/* Banner with heading; the form card overlaps its bottom edge */}
      <Photo src={banner.image} className="ct-banner">
        <div className="ct-banner__inner">
          <h2>{banner.title}</h2>
        </div>
      </Photo>

      <section className="container ct-main">
        <div className="ct-info">
          <div className="ct-info__grid">
            {info.map((i) => (
              <article className="ct-item" key={i.title}>
                <span className="ct-item__icon">{icons[i.icon]}</span>
                <div>
                  <h3>{i.title}</h3>
                  {i.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </article>
            ))}
          </div>
          <div className="ct-info__rule" />
          <div className="ct-socials">
            {socials.map((s) => (
              <a key={s.name} href="#" aria-label={s.name}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>

        <form className="ct-form" onSubmit={onSubmit}>
          <h3>{form.title}</h3>
          <div className="ct-form__grid">
            <input className="ct-field" name="firstName" placeholder="*First name" aria-label="First name" required autoComplete="given-name" />
            <input className="ct-field" name="lastName" placeholder="*Last name" aria-label="Last name" required autoComplete="family-name" />
            <input className="ct-field" name="email" type="email" placeholder="*Email address" aria-label="Email address" required autoComplete="email" />
            <input className="ct-field" name="phone" type="tel" placeholder="Phone number" aria-label="Phone number" autoComplete="tel" />
            <select className="ct-field" name="graduationYear" aria-label="Graduation year" defaultValue="">
              <option value="" disabled>Graduation year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select className="ct-field" name="topic" aria-label="How can we help?" defaultValue="">
              <option value="" disabled>How can we help?</option>
              {form.topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <textarea className="ct-field full" name="message" placeholder="*Write your message..." aria-label="Message" required />
          </div>

          <button type="submit" className="split-btn maroon ct-submit" disabled={status === "sending"}>
            <span className="split-btn__label">{status === "sending" ? "Sending..." : form.submit}</span>
            <span className="split-btn__icon"><Arrow /></span>
          </button>
          {status === "sent" && <p className="ct-status" role="status">Thank you. We have received your message and will reply soon.</p>}
          {status === "error" && <p className="ct-status ct-status--error" role="alert">Something went wrong. Please try again.</p>}
        </form>
      </section>

      {/* Directory */}
      <section className="section container ct-dir">
        <Badge>{directory.badge}</Badge>
        <h2>{directory.title}</h2>
        <p className="ct-dir__text">{directory.text}</p>

        <h3 className="ct-dir__sub">{directory.offices.title}</h3>
        <DirectoryTable head={directory.offices.head} rows={directory.offices.rows} label={directory.offices.title} />

        <h3 className="ct-dir__sub">{directory.chapters.title}</h3>
        <DirectoryTable head={directory.chapters.head} rows={directory.chapters.rows} label={directory.chapters.title} />

        <p className="ct-dir__note">{directory.note}</p>
      </section>

      {/* Map */}
      <iframe className="ct-map" title={map.title} src={map.src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    </>
  );
}
