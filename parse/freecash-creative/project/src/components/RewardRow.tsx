import type { RewardStep } from "../data/myOffers";
import "./RewardRow.css";

const HourglassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 4h10M7 20h10M8 4c0 4 8 4 8 8s-8 4-8 8M16 4c0 4-8 4-8 8s8 4 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 12.5l3.5 3.5L18 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/**
 * RewardRow — one milestone in an offer's reward list. Renders three
 * visual states: `active` (green reward pill + time badge), `completed`
 * (muted pill + green check), `expired` (muted pill + struck-through
 * label + grey cross).
 */
export default function RewardRow({ step }: { step: RewardStep }) {
  return (
    <div className={`reward-row reward-row--${step.status}`}>
      <span className="reward-amount">{step.reward}</span>
      <span className="reward-label">{step.label}</span>
      {step.status === "active" && step.time && (
        <span className={"reward-time" + (step.urgent ? " reward-time--urgent" : "")}>
          <HourglassIcon />
          {step.time}
        </span>
      )}
      {step.status === "completed" && (
        <span className="reward-icon reward-icon--done">
          <CheckIcon />
        </span>
      )}
      {step.status === "expired" && (
        <span className="reward-icon reward-icon--expired">
          <CrossIcon />
        </span>
      )}
    </div>
  );
}
