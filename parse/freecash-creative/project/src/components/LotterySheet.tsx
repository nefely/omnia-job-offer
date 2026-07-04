import { useState } from "react";
import { lottery, lotteryPrizes, lotteryPodium } from "../data/rewards";
import { useCountdown } from "../lib/useCountdown";
import "./LotterySheet.css";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const InfoIcon = () => (
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
 * LotterySheet — the Weekly Lottery panel opened by the top-bar tickets
 * pill. Same content as Rewards » Bonuses » Weekly Lottery but as a
 * full bottom-sheet with a close button.
 */
export default function LotterySheet({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"prizes" | "winners">("prizes");
  const timer = useCountdown(lottery.countdownSeconds);

  return (
    <div className="ls-backdrop" onClick={onClose}>
      <div className="ls-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ls-top">
          <span className="ls-no">Lottery #{lottery.number} -</span>
          <span className="ls-timer">{timer}</span>
          <button className="ls-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="ls-hero">
          <div className="ls-tickets-bg" aria-hidden>🎟️🎟️</div>
          <div className="ls-pool">{lottery.pool}</div>
          <div className="ls-winners">
            {lottery.winners}
            <br />WINNERS
          </div>
        </div>

        <div className="ls-balance">Ticket Balance: {lottery.tickets} 🎟️</div>

        <button className="ls-hiw">
          <span className="ls-hiw-l">
            <InfoIcon /> How it Works
          </span>
          <span className="ls-hiw-chev">
            <Chevron />
          </span>
        </button>

        <div className="ls-subtabs">
          <button
            className={"ls-subtab" + (tab === "prizes" ? " is-active" : "")}
            onClick={() => setTab("prizes")}
          >
            Prizes
          </button>
          <button
            className={"ls-subtab" + (tab === "winners" ? " is-active" : "")}
            onClick={() => setTab("winners")}
          >
            Previous Winners
          </button>
        </div>

        {tab === "prizes" ? (
          <div className="ls-card">
            <div className="ls-podium">
              <div className="ls-pod">
                <span className="ls-pod-badge">2nd</span>
                <span className="ls-pod-ico">🎖️</span>
                <span className="ls-pod-prize ls-pod-prize--2">{lotteryPodium.second}</span>
              </div>
              <div className="ls-pod">
                <span className="ls-pod-badge ls-pod-badge--1">1st</span>
                <span className="ls-pod-ico ls-pod-ico--1">🏆</span>
                <span className="ls-pod-prize ls-pod-prize--1">{lotteryPodium.first}</span>
              </div>
              <div className="ls-pod">
                <span className="ls-pod-badge ls-pod-badge--3">3rd</span>
                <span className="ls-pod-ico">🏅</span>
                <span className="ls-pod-prize ls-pod-prize--3">{lotteryPodium.third}</span>
              </div>
            </div>
            <div className="ls-rows">
              {lotteryPrizes.map((p) => (
                <div key={p.id} className="ls-row">
                  <span className="ls-place">{p.place}</span>
                  <span className="ls-amt">{p.prize}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="ls-card ls-empty">
            Previous winners will appear here after each draw.
          </div>
        )}
      </div>
    </div>
  );
}
