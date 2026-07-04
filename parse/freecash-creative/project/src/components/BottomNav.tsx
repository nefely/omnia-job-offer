import { NavLink } from "react-router-dom";
import "./BottomNav.css";

type Tab = {
  to: string;
  label: string;
  icon: React.JSX.Element;
};

const tabs: Tab[] = [
  {
    to: "/earn",
    label: "Earn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="4" width="12" height="12" rx="3" fill="currentColor" opacity="0.35" />
        <rect x="8" y="8" width="12" height="12" rx="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: "/my-offers",
    label: "My Offers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="3" width="14" height="18" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/cashout",
    label: "Cashout",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
        <path d="M12 13.5v2M10.5 13.5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/rewards",
    label: "Rewards",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l6 3v5c0 4-2.6 6.7-6 8-3.4-1.3-6-4-6-8V6l6-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            "nav-item" + (isActive ? " nav-item--active" : "")
          }
        >
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
