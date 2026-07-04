import { useMemo, useState } from "react";
import RewardRow from "../components/RewardRow";
import {
  startedOffers,
  completedOffers,
  offerFaqs,
  type MyOffer,
} from "../data/myOffers";
import "./MyOffers.css";

type MainTab = "started" | "completed";
type SubTab = "rewards" | "details";

const TicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 8a2 2 0 012-2h12a2 2 0 012 2v1.5a1.5 1.5 0 000 3V16a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5a1.5 1.5 0 000-3V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13l11-6.5-11-6.5z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 4l2.3 4.7 5.2.8-3.75 3.6.9 5.1L12 15.9 7.35 18.2l.9-5.1L4.5 9.5l5.2-.8L12 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 8h13l-3-3M20 16H7l3 3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="10" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M4 20c0-3.3 2.7-5.6 6-5.6 1.2 0 2.3.3 3.2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M16 17.5l1.6 1.6 3-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronIcon = ({ up }: { up?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    style={{ transform: up ? "rotate(180deg)" : undefined }}
  >
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Row of hexagon pips showing an offer's reward multiplier (0–5). */
function MultiplierPips({ value }: { value: number }) {
  return (
    <div className="mo-pips">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i)); // 0..1 for this pip
        const clipId = `pip-clip-${i}`;
        return (
          <svg key={i} viewBox="0 0 28 30" className="mo-pip" aria-hidden>
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={28 * fill} height="30" />
              </clipPath>
            </defs>
            <path
              className="mo-pip-bg"
              d="M14 1l11 6.3v13.4L14 29 3 20.7V7.3L14 1z"
            />
            <path
              className="mo-pip-fill"
              d="M14 1l11 6.3v13.4L14 29 3 20.7V7.3L14 1z"
              clipPath={`url(#${clipId})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

/** Thumbnail used both in the strip and the offer header. */
function OfferThumb({ offer, size }: { offer: MyOffer; size: number }) {
  return (
    <div
      className="mo-thumb"
      style={{ background: offer.grad, width: size, height: size }}
    >
      {offer.img ? (
        <img src={offer.img} alt={offer.title} />
      ) : (
        <span className="mo-thumb-emoji">{offer.emoji}</span>
      )}
    </div>
  );
}

export default function MyOffers() {
  const [tab, setTab] = useState<MainTab>("started");
  const [sub, setSub] = useState<SubTab>("rewards");

  const list = tab === "started" ? startedOffers : completedOffers;
  const [selectedId, setSelectedId] = useState(list[0]?.id);

  // Keep a valid selection when switching tabs.
  const selected = useMemo(() => {
    return list.find((o) => o.id === selectedId) ?? list[0];
  }, [list, selectedId]);

  const [showAll, setShowAll] = useState(false);
  const [moreInfo, setMoreInfo] = useState(true);
  const doneVisible =
    showAll || tab === "started" ? selected?.done : selected?.done.slice(0, 3);

  return (
    <div className="my-offers">
      {/* Started / Completed toggle */}
      <div className="mo-toggle">
        <button
          className={"mo-toggle-btn" + (tab === "started" ? " is-active" : "")}
          onClick={() => {
            setTab("started");
            setSelectedId(startedOffers[0]?.id);
            setShowAll(false);
          }}
        >
          Started
        </button>
        <button
          className={"mo-toggle-btn" + (tab === "completed" ? " is-active" : "")}
          onClick={() => {
            setTab("completed");
            setSelectedId(completedOffers[0]?.id);
            setShowAll(false);
          }}
        >
          Completed
        </button>
      </div>

      {tab === "completed" && (
        <div className="mo-info-line">
          <span className="mo-info-ico">
            <InfoIcon />
          </span>
          You have completed all reward steps or hit max completion days for
          these offers.
        </div>
      )}

      {/* Offer thumbnail strip */}
      <div className="mo-strip">
        {list.map((o) => (
          <button
            key={o.id}
            className={
              "mo-strip-item" + (o.id === selected?.id ? " is-selected" : "")
            }
            onClick={() => {
              setSelectedId(o.id);
              setShowAll(false);
            }}
          >
            <OfferThumb offer={o} size={92} />
            <span className="mo-strip-name">{o.title}</span>
          </button>
        ))}
      </div>

      {/* Promo banner (completed tab only) */}
      {tab === "completed" && (
        <div className="mo-promo">
          <div className="mo-promo-text">
            <h3>Earn up to $1,000 More</h3>
            <p>by playing a new game for 5 minutes</p>
            <button className="mo-promo-link">Play and earn more →</button>
          </div>
          <div className="mo-promo-coins" aria-hidden>
            🪙💰🪙
          </div>
        </div>
      )}

      {/* Selected offer header */}
      {selected && (
        <div className="mo-header">
          <OfferThumb offer={selected} size={64} />
          <div className="mo-header-info">
            <div className="mo-header-title">{selected.title}</div>
            <div className="mo-header-balance">{selected.balance}</div>
          </div>
          <button className="mo-play" type="button" aria-label="Play">
            <PlayIcon />
          </button>
        </div>
      )}

      {/* Rewards / Details subtabs */}
      <div className="mo-subtabs">
        <button
          className={"mo-subtab" + (sub === "rewards" ? " is-active" : "")}
          onClick={() => setSub("rewards")}
        >
          Rewards
        </button>
        <button
          className={"mo-subtab" + (sub === "details" ? " is-active" : "")}
          onClick={() => setSub("details")}
        >
          Details
        </button>
      </div>

      {sub === "details" ? (
        selected && (
          <div className="mo-details-card">
            <div className="mo-detail">
              <div className="mo-detail-head">
                <span className="mo-detail-ico">
                  <StarIcon />
                </span>
                Your Reward Multiplier
              </div>
              <MultiplierPips value={selected.details.multiplier} />
            </div>

            {selected.details.flexibleOrder && (
              <div className="mo-detail">
                <div className="mo-detail-head">
                  <span className="mo-detail-ico">
                    <SwapIcon />
                  </span>
                  Task Order Flexibility
                </div>
                <p className="mo-detail-text">
                  You don't need to complete the steps in any particular order.
                </p>
              </div>
            )}

            {selected.details.newUsersOnly && (
              <div className="mo-detail">
                <div className="mo-detail-head">
                  <span className="mo-detail-ico">
                    <UserCheckIcon />
                  </span>
                  New Users Only
                </div>
                <p className="mo-detail-text">
                  Only new users who haven't installed "{selected.title}" on
                  their device before are eligible to earn points.
                </p>
              </div>
            )}
          </div>
        )
      ) : null}

      {sub === "details" && selected && (
        <>
          {/* Description */}
          <div className="mo-desc-card">
            <h2 className="mo-desc-title">Description</h2>
            <p className="mo-desc-text">{selected.details.description}</p>

            <button
              className="mo-moreinfo"
              onClick={() => setMoreInfo((v) => !v)}
            >
              More Info
              <span className="mo-moreinfo-chev">
                <ChevronIcon up={moreInfo} />
              </span>
            </button>

            {moreInfo && (
              <>
                <div className="mo-meta">
                  <div className="mo-meta-col">
                    <span className="mo-meta-val mo-meta-val--status">
                      {selected.details.status}
                    </span>
                    <span className="mo-meta-key">Status</span>
                  </div>
                  <div className="mo-meta-col mo-meta-col--mid">
                    <span className="mo-meta-val mo-meta-val--cat">
                      {selected.details.category}
                    </span>
                    <span className="mo-meta-key">Category</span>
                  </div>
                  <div className="mo-meta-col">
                    <span className="mo-meta-val mo-meta-provider">
                      {selected.details.provider.logo ? (
                        <img
                          src={selected.details.provider.logo}
                          alt=""
                          className="mo-provider-logo"
                        />
                      ) : (
                        <span className="mo-provider-badge">
                          {selected.details.provider.name[0]}
                        </span>
                      )}
                      {selected.details.provider.name}
                    </span>
                    <span className="mo-meta-key">Provider</span>
                  </div>
                </div>

                <h3 className="mo-steps-title">Steps</h3>
                <p className="mo-steps-text">{selected.details.steps}</p>
              </>
            )}
          </div>

          {/* FAQs */}
          <h2 className="mo-faqs-title">FAQs</h2>
          <div className="mo-faqs">
            {offerFaqs.map((f) => (
              <button key={f.q} className="mo-faq">
                <div className="mo-faq-text">
                  <div className="mo-faq-q">{f.q}</div>
                  <div className="mo-faq-a">{f.a}</div>
                </div>
                <span className="mo-faq-chev">
                  <ChevronIcon />
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {sub === "rewards" && (
        <>
          {/* Lottery */}
          {selected?.lottery && (
            <section className="mo-section">
              <div className="mo-section-head">
                <h2>
                  <span className="mo-sec-ico mo-sec-ico--lottery">
                    <TicketIcon />
                  </span>
                  Lottery Rewards
                </h2>
                <span className="mo-sec-info">
                  <InfoIcon />
                </span>
              </div>
              <div className="mo-lottery">
                <span className="mo-lottery-amount">
                  {selected.lottery.amount}
                </span>
                <span className="mo-lottery-label">
                  {selected.lottery.label}
                </span>
                <span className="mo-lottery-tickets">
                  {selected.lottery.tickets} <TicketIcon />
                </span>
                <button className="mo-lottery-view">View</button>
              </div>
            </section>
          )}

          {/* Main Rewards */}
          {selected && selected.main.length > 0 && (
            <section className="mo-section">
              <div className="mo-section-head">
                <h2>
                  <span className="mo-sec-ico mo-sec-ico--main">📈</span>
                  Main Rewards
                </h2>
                <span className="mo-sec-info">
                  <InfoIcon />
                </span>
              </div>
              <div className="mo-rows">
                {selected.main.map((s) => (
                  <RewardRow key={s.id} step={s} />
                ))}
              </div>
            </section>
          )}

          {/* Completed or Expired */}
          {selected && selected.done.length > 0 && (
            <section className="mo-section">
              <h2 className="mo-plain-head">Completed or Expired</h2>
              <div className="mo-rows">
                {doneVisible?.map((s) => (
                  <RewardRow key={s.id} step={s} />
                ))}
              </div>
              {tab === "completed" && selected.done.length > 3 && (
                <button
                  className="mo-toggle-rewards"
                  onClick={() => setShowAll((v) => !v)}
                >
                  {showAll ? "Hide rewards" : "More rewards"}
                </button>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
