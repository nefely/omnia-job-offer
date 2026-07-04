import type { Offer } from "../data/offers";
import "./FeaturedCard.css";

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.4 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-.9 2.3-1.9c.7-1.1 1-2.1 1-2.2-.1 0-2-.7-2-2.7zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z" />
  </svg>
);

/**
 * FeaturedCard — the large "Best for You" card: the real game art is used
 * twice — blurred as a full-bleed backdrop, and sharp as the centered
 * thumbnail — with the title, a platform badge and a full-width green CTA.
 */
export default function FeaturedCard({
  offer,
  onClick,
}: {
  offer: Offer;
  onClick?: (offer: Offer) => void;
}) {
  return (
    <article className="featured-card" onClick={() => onClick?.(offer)}>
      <div className="featured-media">
        <img
          className="featured-backdrop"
          src={offer.img}
          alt=""
          aria-hidden
        />
        <img className="featured-thumb" src={offer.img} alt={offer.title} />
      </div>

      <div className="featured-row">
        <h3 className="featured-title">{offer.title}</h3>
        <span className="featured-badge">
          <AppleGlyph />
        </span>
      </div>

      <button className="featured-cta" type="button">
        Play and Earn ${offer.reward}
      </button>
    </article>
  );
}
