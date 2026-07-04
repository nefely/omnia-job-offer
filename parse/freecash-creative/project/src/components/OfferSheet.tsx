import { useState } from "react";
import type { Offer } from "../data/offers";
import { rewardsFor } from "../data/offerDetails";
import RewardRow from "./RewardRow";
import "./OfferSheet.css";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const TicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 8a2 2 0 012-2h12a2 2 0 012 2v1.5a1.5 1.5 0 000 3V16a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5a1.5 1.5 0 000-3V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.4 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-.9 2.3-1.9c.7-1.1 1-2.1 1-2.2-.1 0-2-.7-2-2.7zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z" />
  </svg>
);

/**
 * OfferSheet — full offer detail, opened by tapping any offer card on the
 * Earn screen. Blurred game backdrop hero, title + platform, a big green
 * CTA, Rewards/Details pill tabs, the Lottery Rewards row and the Main
 * Rewards list (collapsed to a few rows with a "More Rewards" expander).
 */
export default function OfferSheet({
  offer,
  onClose,
}: {
  offer: Offer;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"rewards" | "details">("rewards");
  const [showAll, setShowAll] = useState(false);
  const rewards = rewardsFor(offer.title);
  const visible = showAll ? rewards : rewards.slice(0, 5);

  return (
    <div className="os-backdrop" onClick={onClose}>
      <div className="os-sheet" onClick={(e) => e.stopPropagation()}>
        {/* hero */}
        <div className="os-hero">
          <img className="os-hero-bg" src={offer.img} alt="" aria-hidden />
          <img className="os-hero-thumb" src={offer.img} alt={offer.title} />
          <button className="os-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="os-titlerow">
          <h2 className="os-title">{offer.title}</h2>
          <span className="os-badge">
            <AppleGlyph />
          </span>
        </div>

        <button className="os-cta">Play and Earn ${offer.reward}</button>

        <div className="os-tabs">
          <button
            className={"os-tab" + (tab === "rewards" ? " is-active" : "")}
            onClick={() => setTab("rewards")}
          >
            Rewards
          </button>
          <button
            className={"os-tab" + (tab === "details" ? " is-active" : "")}
            onClick={() => setTab("details")}
          >
            Details
          </button>
        </div>

        {tab === "rewards" ? (
          <>
            <div className="os-section-head">
              <h3>
                <span className="os-sec-ico os-sec-ico--lottery">
                  <TicketIcon />
                </span>
                Lottery Rewards
              </h3>
              <span className="os-sec-info">
                <InfoIcon />
              </span>
            </div>
            <div className="os-lottery">
              <span className="os-lottery-amount">$50,000</span>
              <span className="os-lottery-label">Weekly Lottery</span>
              <span className="os-lottery-tickets">
                0 <TicketIcon />
              </span>
              <button className="os-lottery-view">View</button>
            </div>

            <div className="os-section-head">
              <h3>
                <span className="os-sec-ico os-sec-ico--main">📈</span>
                Main Rewards
              </h3>
              <span className="os-sec-info">
                <InfoIcon />
              </span>
            </div>
            <div className="os-rows">
              {visible.map((s) => (
                <RewardRow key={s.id} step={s} />
              ))}
            </div>
            {rewards.length > 5 && (
              <button
                className="os-more"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "↑ Hide Rewards" : "↓ More Rewards"}
              </button>
            )}
          </>
        ) : (
          <p className="os-details">
            Play {offer.title} and complete the milestones to earn rewards.
            Rewards are credited to your balance automatically. New users only.
          </p>
        )}
      </div>
    </div>
  );
}
