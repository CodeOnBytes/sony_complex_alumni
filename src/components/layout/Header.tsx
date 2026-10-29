
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { nav, site, topLinks } from "../../data/site";
import { SplitButton } from "../ui";
import { Link } from "react-router-dom";


const Caret = () => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M0 0h10L5 6z" />
  </svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const stuck = useScrolledPast(120);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`header ${stuck ? "is-stuck" : ""}`}>
      <div className="topbar">
        <span>
          Welcome to the {site.name} {site.tagline}
        </span>

        <ul>
          {topLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar">
        <NavLink
          to="/"
          className="logo"
          aria-label={site.name}
          end
        >
          <span className="logo__crest">SCAA</span>

          <span className="logo__text">
            <small>{site.tagline}</small>
            <strong>{site.name}</strong>
          </span>
        </NavLink>

        <nav
          className={`menu ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <div className="menu__item" key={item.label}>
              <NavLink
                to={item.to || "/"}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {item.label}
                {item.children && <Caret />}
              </NavLink>

              {item.children && (
                <ul className="menu__drop">
                  {item.children.map((child) => (
                    <li key={child}>
                      <a href="#">
                        {child}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className="icon-btn"
            aria-label="Search"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>

          <button
            className="icon-btn burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="main-navigation"
            type="button"
            onClick={() => setOpen((previous) => !previous)}
          >
            <svg
              width="26"
              height="22"
              viewBox="0 0 26 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M1 3h24M1 11h24M1 19h24" />
            </svg>
          </button>

          <Link to="/enroll">
            <SplitButton>Join Now</SplitButton>
          </Link>
        </div>
      </div>
    </header>
  );
}

