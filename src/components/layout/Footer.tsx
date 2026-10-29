import { useState, type FormEvent } from "react";
import { footer, site } from "../../data/site";
import { subscribeNewsletter } from "../../services/api";

const socials = [
  { name: "YouTube", d: "M3 7c0-1.5 1-2.5 2.5-2.7C8 4 12 4 12 4s4 0 6.500.3C20 4.500 21 5.500 21 7v10c0 1.500-1 2.500-2.500 2.700C16 20 12 20 12 20s-4 0-6.500-.3C4 19.500 3 18.500 3 17V7zm7 2.500v5l5-2.500-5-2.500z" },
  { name: "LinkedIn", d: "M5 9h3v10H5zM6.500 4a1.700 1.700 0 110 3.400 1.700 1.700 0 010-3.400zM10 9h3v1.400c.5-1 1.700-1.700 3.200-1.700 3 0 3.800 2 3.800 4.500V19h-3v-5c0-1.200-.3-2.200-1.600-2.200S13 12.800 13 14v5h-3z" },
  { name: "Facebook", d: "M14 8V6.500c0-.8.300-1.200 1.300-1.200H17V2h-2.700C11.600 2 10.500 3.600 10.500 6v2H8v3.200h2.500V21H14v-9.800h2.700L17 8z" },
  { name: "X", d: "M4 4h4.500l3.700 5L16.500 4H19l-5.700 6.500L20 20h-4.500l-4-5.400L6.800 20H4.300l6-6.900z" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await subscribeNewsletter(email);
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#" className="logo logo--light">
            <span className="logo__crest">SCAA</span>
            <span className="logo__text"><small>{site.tagline}</small><strong>{site.name}</strong></span>
          </a>
          <p className="footer__motto">{site.motto}</p>
        </div>

        <div className="footer__grid">
          {footer.groups.map((g) => (
            <div key={g.title}>
              <h4>{g.title}</h4>
              <ul>{g.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
          <div>
            <h4>Contact Information</h4>
            <p><b>Address:</b> {site.address}</p>
            <p><b>Contact:</b> {site.phone} <span className="sep" /> {site.email}</p>
            <p><b>Working hour:</b> {site.hours}</p>
            <div className="socials">
              {socials.map((s) => (
                <a key={s.name} href="#" aria-label={s.name}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Join Our Newsletter</h4>
            <p>{footer.newsletterText}</p>
            <form className="newsletter" onSubmit={onSubmit}>
              <input type="email" required placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
              <button aria-label="Subscribe" disabled={status === "sending"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
              </button>
            </form>
            {status === "sent" && <p className="newsletter__ok" role="status">Thanks, you’re subscribed.</p>}
            {status === "error" && <p className="newsletter__ok" role="alert">Something went wrong. Please try again.</p>}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {site.name} {site.tagline}. All Rights Reserved.</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back To Top <i>↑</i></a>
        </div>
      </div>
    </footer>
  );
}
