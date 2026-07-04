import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import FeaturedCard from "../components/FeaturedCard";
import OfferCard from "../components/OfferCard";
import SurveyCard from "../components/SurveyCard";
import PartnerCard from "../components/PartnerCard";
import OfferSheet from "../components/OfferSheet";
import {
  featured,
  moreOffers,
  surveys,
  partners,
  wallet,
  type Offer,
} from "../data/offers";
import "./Earn.css";

/**
 * Earn — the home tab. Next-cashout progress + four content sections:
 * Best for You (carousel), More Offers (grid), Surveys (row), Offer
 * Partners (grid). All fed by static mock data.
 */
export default function Earn() {
  const pct = Math.min(100, (wallet.cashoutCurrent / wallet.cashoutGoal) * 100);
  const [active, setActive] = useState<Offer | null>(null);

  return (
    <div className="earn">
      {/* Next cashout */}
      <section className="cashout-block">
        <h2 className="cashout-title">Next cashout</h2>
        <div className="cashout-bar">
          <div className="cashout-fill" style={{ width: `${pct}%` }} />
          <span className="cashout-text">
            ${wallet.cashoutCurrent} / ${wallet.cashoutGoal}
          </span>
        </div>
      </section>

      {/* Best for You */}
      <SectionHeader icon="🏆" title="Best for You" />
      <div className="hscroll hscroll--featured">
        {featured.map((o) => (
          <FeaturedCard key={o.id} offer={o} onClick={setActive} />
        ))}
      </div>

      {/* More Offers */}
      <SectionHeader icon="🎁" title="More Offers" onViewAll={() => {}} />
      <div className="offer-grid">
        {moreOffers.map((o) => (
          <OfferCard key={o.id} offer={o} onClick={setActive} />
        ))}
      </div>

      {/* Surveys */}
      <SectionHeader icon="📋" title="Surveys" />
      <div className="hscroll">
        {surveys.map((s) => (
          <SurveyCard key={s.id} survey={s} />
        ))}
      </div>

      {/* Offer Partners */}
      <SectionHeader icon="🌐" title="Offer Partners" onViewAll={() => {}} />
      <div className="offer-grid offer-grid--partners">
        {partners.map((p) => (
          <PartnerCard key={p.id} partner={p} />
        ))}
      </div>

      {active && <OfferSheet offer={active} onClose={() => setActive(null)} />}
    </div>
  );
}
