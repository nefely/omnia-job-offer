import type { Offer } from "../data/offers";
import "./OfferCard.css";

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.4 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-.9 2.3-1.9c.7-1.1 1-2.1 1-2.2-.1 0-2-.7-2-2.7zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z" />
  </svg>
);

/**
 * OfferCard — compact card for the "More Offers" grid: gradient thumbnail
 * with a platform badge, title, and reward. Thumbnail uses the offer's
 * CSS gradient + decorative emoji instead of a binary asset.
 */
export default function OfferCard({
  offer,
  onClick,
}: {
  offer: Offer;
  onClick?: (offer: Offer) => void;
}) {
  return (
    <button className="offer-card" type="button" onClick={() => onClick?.(offer)}>
      <div className="offer-thumb">
        <img src={offer.img} alt={offer.title} loading="lazy" />
        <span className="offer-badge">
          <AppleGlyph />
        </span>
      </div>
      <div className="offer-title">{offer.title}</div>
      <div className="offer-reward">${offer.reward}</div>
    </button>
  );
}
