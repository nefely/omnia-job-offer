import type { Survey } from "../data/offers";
import "./SurveyCard.css";

/**
 * SurveyCard — gradient tile with a rocket glyph, star rating, label,
 * duration and reward. Sized to sit in a horizontally scrollable row.
 */
export default function SurveyCard({ survey }: { survey: Survey }) {
  return (
    <button className="survey-card" type="button">
      <div className="survey-media" style={{ background: survey.grad }}>
        <span className="survey-rocket">{survey.icon}</span>
        <span className="survey-rating">
          {survey.rating.toFixed(1)} <span className="survey-star">★</span>
        </span>
      </div>
      <div className="survey-body">
        <div className="survey-label">{survey.label}</div>
        <div className="survey-mins">{survey.minutes} mins</div>
        <div className="survey-reward">${survey.reward.toFixed(2)}</div>
      </div>
    </button>
  );
}
