import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startedOffers } from "../data/myOffers";
import {
  profile,
  freecashAbout,
  footerSections,
  footerLinks,
  footerSocials,
} from "../data/profile";
import ProfileSettings from "../components/ProfileSettings";
import "./Profile.css";

const Gear = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 2l1.6 2.2 2.6-.7.5 2.7 2.5 1-.9 2.6 1.8 2-1.8 2 .9 2.6-2.5 1-.5 2.7-2.6-.7L12 22l-1.6-2.2-2.6.7-.5-2.7-2.5-1 .9-2.6L3.9 12l1.8-2-.9-2.6 2.5-1 .5-2.7 2.6.7L12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Info = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Profile — reached by tapping the top-bar avatar. Shows the user summary,
 * level progress, quick links (Earnings / Withdrawals / Support), the
 * started-offers strip and the Freecash marketing footer. The gear opens
 * the settings sheet.
 */
export default function Profile() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(false);

  return (
    <div className="pf">
      <div className="pf-head">
        <h1 className="pf-title">My Profile</h1>
        <button className="pf-gear" onClick={() => setSettings(true)} aria-label="Settings">
          <Gear />
        </button>
      </div>

      {/* user summary */}
      <div className="pf-user">
        <img className="pf-avatar" src={profile.avatar} alt="" />
        <div className="pf-user-info">
          <div className="pf-name">{profile.name}</div>
          <div className="pf-stats">
            <div>
              <div className="pf-stat-val">{profile.totalEarnings}</div>
              <div className="pf-stat-key">Total Earnings</div>
            </div>
            <div>
              <div className="pf-stat-val">{profile.offersCompleted}</div>
              <div className="pf-stat-key">Offers Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* level */}
      <div className="pf-level-row">
        <span className="pf-level">
          Level <span className="pf-medal">🎖️</span>
          <b>{profile.level}</b>
        </span>
        <span className="pf-level-hint">
          {profile.coinsToLevelUp} coins to level up
        </span>
      </div>
      <div className="pf-level-bar">
        <div className="pf-level-fill" style={{ width: `${profile.levelProgress}%` }} />
      </div>

      {/* earnings link */}
      <button className="pf-link pf-earnings">
        <span className="pf-link-l">
          <span className="pf-link-ico">💰</span> Earnings
        </span>
        <ArrowRight />
      </button>

      {/* started offers */}
      <div className="pf-section-head">
        <h2>
          Started offers <span className="pf-info"><Info /></span>
        </h2>
        <button className="pf-viewall" onClick={() => navigate("/my-offers")}>
          View all <span className="pf-viewall-chev">›</span>
        </button>
      </div>
      <div className="pf-offers">
        {startedOffers.map((o) => (
          <div key={o.id} className="pf-offer">
            <div className="pf-offer-thumb" style={{ background: o.grad }}>
              {o.img ? <img src={o.img} alt="" /> : <span>{o.emoji}</span>}
            </div>
            <div className="pf-offer-title">{o.title}</div>
            <div className="pf-offer-cat">Other</div>
            <div className="pf-offer-bal">{o.balance}</div>
          </div>
        ))}
      </div>

      {/* withdrawals / support */}
      <button className="pf-row" onClick={() => navigate("/withdrawals")}>
        <span className="pf-row-l">
          <img className="pf-row-ico" src={`${import.meta.env.BASE_URL}assets/ui/my-profile-wallet.svg`} alt="" />
          Withdrawals
        </span>
        <ArrowRight />
      </button>
      <button className="pf-row">
        <span className="pf-row-l">
          <span className="pf-row-ico pf-row-ico--chat">💬</span>
          Support
        </span>
        <ArrowRight />
      </button>

      {/* footer */}
      <footer className="pf-footer">
        <img className="pf-fc-logo" src={`${import.meta.env.BASE_URL}assets/ui/Freecash.png`} alt="Freecash" />
        <p className="pf-about">{freecashAbout}</p>
        <img className="pf-appstore" src={`${import.meta.env.BASE_URL}assets/ui/apple-store.svg`} alt="Download on the App Store" />
        <div className="pf-trust">
          <span className="pf-trust-word">Excellent</span>
          <img src={`${import.meta.env.BASE_URL}assets/ui/128x24.png`} alt="4.5 stars" />
          <img className="pf-trust-logo" src={`${import.meta.env.BASE_URL}assets/ui/trustpilotLogo.svg`} alt="Trustpilot" />
        </div>

        <div className="pf-foot-accordions">
          {footerSections.map((s) => (
            <button key={s} className="pf-acc">
              {s} <Chevron />
            </button>
          ))}
        </div>

        <div className="pf-copyright">
          © Freecash 2026 · {footerLinks.join(" · ")}
        </div>
        <button className="pf-lang">🇬🇧 {profile.language} ⌄</button>
        <div className="pf-socials">
          {footerSocials.map((s, i) => (
            <span key={i} className="pf-social">{s}</span>
          ))}
        </div>
      </footer>

      {settings && <ProfileSettings onClose={() => setSettings(false)} />}
    </div>
  );
}
