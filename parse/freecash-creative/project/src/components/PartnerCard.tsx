import type { Partner } from "../data/offers";
import "./PartnerCard.css";

/**
 * PartnerCard — offer-wall provider tile: centered logo image, optional
 * "+N%" boost badge, star rating chip, and the partner name.
 */
export default function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <button className="partner-card" type="button">
      {partner.bonus && <span className="partner-bonus">+{partner.bonus}%</span>}
      <div className="partner-logo">
        <img src={partner.logo} alt={partner.name} loading="lazy" />
      </div>
      <span className="partner-rating">
        {partner.rating} <span className="partner-star">★</span>
      </span>
      <div className="partner-name">{partner.name}</div>
    </button>
  );
}
