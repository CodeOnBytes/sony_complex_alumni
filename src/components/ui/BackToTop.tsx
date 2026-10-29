import { useScrolledPast } from "../../hooks/useScrolledPast";

export default function BackToTop() {
  const visible = useScrolledPast(600);
  if (!visible) return null;
  return (
    <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14l7-7 7 7" /></svg>
    </button>
  );
}
