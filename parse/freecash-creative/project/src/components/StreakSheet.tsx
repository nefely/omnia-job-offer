import { streak } from "../data/rewards";
import "./StreakSheet.css";

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const DollarChip = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 6v12M15 9a3 2.2 0 00-3-2c-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2a3 2.2 0 01-3-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * StreakSheet — the "Streak Reward" panel opened by tapping the 🔥 streak
 * pill in the top bar. Slides down from under the header over a dimmed
 * backdrop; shows the daily-streak progress track and claim CTA.
 */
export default function StreakSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="ss-backdrop" onClick={onClose}>
      <div className="ss-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ss-head">
          <h3>🔥 Streak Reward</h3>
          <span className="ss-count">
            {streak.current} / {streak.total} ❄️
          </span>
        </div>

        <p className="ss-desc">
          Win up to <b className="ss-amber">5,000 tickets</b> per day, and up to{" "}
          <b className="ss-amber">50,000 tickets</b> every 7 days.
        </p>

        <div className="ss-claimrow">
          <span>Claim your ${streak.claimAmount} reward</span>
          <span className="ss-info">
            <InfoIcon />
          </span>
        </div>

        <div className="ss-track">
          {Array.from({ length: streak.total }).map((_, i) => (
            <span
              key={i}
              className={
                "ss-node" +
                (i < streak.current ? " ss-node--done" : "") +
                (i === streak.current ? " ss-node--current" : "")
              }
            >
              {i < streak.current ? `$${streak.perStep}` : <DollarChip />}
            </span>
          ))}
          <span className="ss-node ss-node--gem" />
        </div>

        <button className="ss-claim ss-claim--ready">
          Claim ${streak.claimAmount}
        </button>
      </div>
    </div>
  );
}
