import { useState } from "react";
import { profile } from "../data/profile";
import "./ProfileSettings.css";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 15V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 20h4l10-10-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const Verified = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.6 1.5-.9 2.9.9 2.9-2.6 1.5-1 2.8-3-.3L12 22l-2.4-1.8-3 .3-1-2.8L3 16.2l.9-2.9L3 10.4l2.6-1.5 1-2.8 3 .3L12 2z" />
    <path d="M8.5 12l2.2 2.2L15.5 9.5" stroke="#0d1117" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** ProfileSettings — bottom-sheet with account info and settings. */
export default function ProfileSettings({ onClose }: { onClose: () => void }) {
  const [isPublic, setIsPublic] = useState(profile.profilePublic);
  const [promo, setPromo] = useState(profile.promoOffers);

  return (
    <div className="ps-backdrop" onClick={onClose}>
      <div className="ps-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="ps-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="ps-head">
          <img className="ps-avatar" src={profile.avatar} alt="" />
          <div>
            <div className="ps-name">
              {profile.name}
              <span className="ps-edit">
                <EditIcon />
              </span>
            </div>
            <div className="ps-flag">{profile.country}</div>
          </div>
        </div>

        {/* Information */}
        <div className="ps-card">
          <h3 className="ps-card-title">Information</h3>
          <div className="ps-row">
            <span className="ps-k">Freecash ID</span>
            <span className="ps-v ps-v--id">
              {profile.freecashId}
              <span className="ps-copy"><CopyIcon /></span>
            </span>
          </div>
          <div className="ps-row">
            <span className="ps-k">Referrer</span>
            <span className="ps-v">{profile.referrer}</span>
          </div>
          <div className="ps-row">
            <span className="ps-k">Referral earnings</span>
            <span className="ps-v">{profile.referralEarnings}</span>
          </div>
          <div className="ps-row ps-row--last">
            <span className="ps-k">Date joined</span>
            <span className="ps-v">{profile.dateJoined}</span>
          </div>
        </div>

        {/* Settings */}
        <div className="ps-card">
          <h3 className="ps-card-title">Settings</h3>
          <div className="ps-row">
            <span className="ps-k">Language</span>
            <button className="ps-lang">🇬🇧 {profile.language} ⌄</button>
          </div>
          <div className="ps-row">
            <span className="ps-k">Profile</span>
            <span className="ps-toggle-wrap">
              <span className={!isPublic ? "ps-toggle-active" : ""}>Private</span>
              <button
                className={"ps-toggle" + (isPublic ? " is-on" : "")}
                onClick={() => setIsPublic((v) => !v)}
              >
                <span className="ps-knob" />
              </button>
              <span className={isPublic ? "ps-toggle-active" : ""}>Public</span>
            </span>
          </div>
          <div className="ps-emailblock">
            <div className="ps-k">Email</div>
            <div className="ps-email">
              {profile.email}
              {profile.emailVerified && (
                <span className="ps-verified"><Verified /></span>
              )}
            </div>
          </div>
          <div className="ps-row ps-row--last">
            <span className="ps-k">Receive promotional offers</span>
            <button
              className={"ps-toggle" + (promo ? " is-on" : "")}
              onClick={() => setPromo((v) => !v)}
            >
              <span className="ps-knob" />
            </button>
          </div>
        </div>

        <button className="ps-logout">Logout</button>
        <button className="ps-delete">Delete account</button>
      </div>
    </div>
  );
}
