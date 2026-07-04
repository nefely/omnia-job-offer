import { useState } from "react";
import {
  quests,
  streak,
  referral,
  howItWorks,
  lottery,
  lotteryPrizes,
  lotteryPodium,
} from "../data/rewards";
import { useCountdown } from "../lib/useCountdown";
import "./Rewards.css";

type Tab = "quests" | "bonuses" | "invite";
type BonusTab = "streak" | "lottery" | "codes";
type LotteryTab = "prizes" | "winners";

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
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
const HowIcon = ({ kind }: { kind: "link" | "wallet" | "star" }) => {
  if (kind === "link")
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M10 13a4 4 0 005.7 0l2.3-2.3A4 4 0 1012.3 5L11 6.3M14 11a4 4 0 00-5.7 0L6 13.3A4 4 0 1011.7 19L13 17.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "wallet")
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4l2.3 4.7 5.2.8-3.75 3.6.9 5.1L12 15.9 7.35 18.2l.9-5.1L4.5 9.5l5.2-.8L12 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * Rewards — three sub-tabs: Quests (one-off tasks), Bonuses (Daily Streak /
 * Weekly Lottery / Bonus Codes) and Invite Friends (referral link + terms).
 * All static mock content.
 */
export default function Rewards() {
  const [tab, setTab] = useState<Tab>("quests");
  const [bonus, setBonus] = useState<BonusTab>("streak");
  const [lotteryTab, setLotteryTab] = useState<LotteryTab>("prizes");
  const lotteryTimer = useCountdown(lottery.countdownSeconds);

  return (
    <div className="rw">
      <div className="rw-tabs">
        {(["quests", "bonuses", "invite"] as Tab[]).map((t) => (
          <button
            key={t}
            className={"rw-tab" + (tab === t ? " is-active" : "")}
            onClick={() => setTab(t)}
          >
            {t === "quests" ? "Quests" : t === "bonuses" ? "Bonuses" : "Invite Friends"}
          </button>
        ))}
      </div>

      {tab === "quests" && (
        <div className="rw-body">
          <div className="rw-banner rw-banner--quests">
            <div className="rw-banner-text">
              Quests just<br />for you!
            </div>
            <div className="rw-banner-art" aria-hidden>🎩💰</div>
          </div>

          <h2 className="rw-h2">
            <span className="rw-h2-ico">〜</span> Quests
          </h2>
          <div className="rw-quests">
            {quests.map((q) => (
              <button key={q.id} className="rw-quest">
                <span className="rw-quest-reward">{q.reward}</span>
                <span className="rw-quest-label">{q.label}</span>
                <span className="rw-quest-arrow">
                  <ArrowRight />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === "bonuses" && (
        <div className="rw-body">
          <div className="rw-bonus-tabs">
            <button
              className={"rw-btile" + (bonus === "streak" ? " is-active" : "")}
              onClick={() => setBonus("streak")}
            >
              <span className="rw-btile-ico">🔥</span>
              Daily<br />Streak
            </button>
            <button
              className={"rw-btile" + (bonus === "lottery" ? " is-active" : "")}
              onClick={() => setBonus("lottery")}
            >
              <span className="rw-btile-ico">🎟️</span>
              Weekly<br />Lottery
            </button>
            <button
              className={"rw-btile" + (bonus === "codes" ? " is-active" : "")}
              onClick={() => setBonus("codes")}
            >
              <span className="rw-btile-ico">🏷️</span>
              Bonus<br />Codes
            </button>
          </div>

          {bonus === "streak" && (
            <div className="rw-card">
              <div className="rw-card-head">
                <h3>🔥 Streak Reward</h3>
                <span className="rw-streak-count">
                  {streak.current} / {streak.total} ❄️
                </span>
              </div>
              <p className="rw-streak-desc">
                Win up to <b className="rw-amber">5,000 tickets</b> per day, and
                up to <b className="rw-amber">50,000 tickets</b> every 7 days.
              </p>
              <div className="rw-streak-claimrow">
                <span>Claim your ${streak.claimAmount} reward</span>
                <span className="rw-streak-info">
                  <InfoIcon />
                </span>
              </div>

              <div className="rw-streak-track">
                {Array.from({ length: streak.total }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      "rw-node" +
                      (i < streak.current ? " rw-node--done" : "") +
                      (i === streak.current ? " rw-node--current" : "")
                    }
                  >
                    {i < streak.current ? `$${streak.perStep}` : <DollarChip />}
                  </span>
                ))}
                <span className="rw-node rw-node--gem" />
              </div>

              <button className="rw-claim rw-claim--ready">
                Claim ${streak.claimAmount}
              </button>
            </div>
          )}

          {bonus === "lottery" && (
            <div className="rw-lot">
              <div className="rw-lot-top">
                <span className="rw-lot-no">Lottery #{lottery.number} -</span>
                <span className="rw-lot-timer">{lotteryTimer}</span>
              </div>

              <div className="rw-lot-hero">
                <div className="rw-lot-tickets-bg" aria-hidden>
                  🎟️🎟️
                </div>
                <div className="rw-lot-pool">{lottery.pool}</div>
                <div className="rw-lot-winners">
                  {lottery.winners}
                  <br />WINNERS
                </div>
              </div>

              <div className="rw-lot-balance">
                Ticket Balance: {lottery.tickets} 🎟️
              </div>

              <button className="rw-lot-hiw">
                <span className="rw-lot-hiw-l">
                  <InfoIcon /> How it Works
                </span>
                <span className="rw-lot-hiw-chev">⌄</span>
              </button>

              <div className="rw-lot-subtabs">
                <button
                  className={"rw-lot-subtab" + (lotteryTab === "prizes" ? " is-active" : "")}
                  onClick={() => setLotteryTab("prizes")}
                >
                  Prizes
                </button>
                <button
                  className={"rw-lot-subtab" + (lotteryTab === "winners" ? " is-active" : "")}
                  onClick={() => setLotteryTab("winners")}
                >
                  Previous Winners
                </button>
              </div>

              {lotteryTab === "prizes" ? (
                <div className="rw-card rw-prizes">
                  <div className="rw-podium">
                    <div className="rw-pod rw-pod--2">
                      <span className="rw-pod-badge">2nd</span>
                      <span className="rw-pod-ico">🎖️</span>
                      <span className="rw-pod-prize rw-pod-prize--2">
                        {lotteryPodium.second}
                      </span>
                    </div>
                    <div className="rw-pod rw-pod--1">
                      <span className="rw-pod-badge rw-pod-badge--1">1st</span>
                      <span className="rw-pod-ico">🏆</span>
                      <span className="rw-pod-prize rw-pod-prize--1">
                        {lotteryPodium.first}
                      </span>
                    </div>
                    <div className="rw-pod rw-pod--3">
                      <span className="rw-pod-badge rw-pod-badge--3">3rd</span>
                      <span className="rw-pod-ico">🏅</span>
                      <span className="rw-pod-prize rw-pod-prize--3">
                        {lotteryPodium.third}
                      </span>
                    </div>
                  </div>

                  <div className="rw-prize-rows">
                    {lotteryPrizes.map((p) => (
                      <div key={p.id} className="rw-prize-row">
                        <span className="rw-prize-place">{p.place}</span>
                        <span className="rw-prize-amt">{p.prize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rw-card rw-winners-empty">
                  <p>Previous winners will appear here after each draw.</p>
                </div>
              )}
            </div>
          )}

          {bonus === "codes" && (
            <div className="rw-card rw-codes">
              <h3 className="rw-codes-title">Have a Bonus Code?</h3>
              <p className="rw-codes-desc">
                Follow our socials to get notified when we drop new bonus codes.
              </p>
              <div className="rw-socials">
                <span className="rw-social rw-social--fb">f</span>
                <span className="rw-social rw-social--ig">◉</span>
                <span className="rw-social rw-social--x">𝕏</span>
              </div>
              <div className="rw-code-input">
                <input placeholder="Bonus code" />
                <button className="rw-code-apply">Apply</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "invite" && (
        <div className="rw-body">
          <div className="rw-banner rw-banner--invite">
            <div className="rw-banner-text">
              Earn up to <span className="rw-green">$12.50</span> for each friend
              you invite!
            </div>
            <div className="rw-banner-art" aria-hidden>🪙🎁</div>
          </div>

          <div className="rw-reflink">
            <span className="rw-reflink-url">
              {referral.link}
              <b>{referral.code}</b>
            </span>
            <button className="rw-reflink-edit">Edit</button>
          </div>

          <button className="rw-share">
            <span className="rw-share-ico">🔗</span> Share link
          </button>

          <div className="rw-earnings">
            <div>
              <div className="rw-earnings-label">
                Referral Earnings <InfoIcon />
              </div>
              <div className="rw-earnings-amount">$ 0</div>
            </div>
            <div className="rw-pending">
              <div>Pending Earnings</div>
              <div className="rw-pending-amount">$ 0</div>
            </div>
          </div>

          <div className="rw-hiw">
            <h3 className="rw-hiw-title">How it works</h3>
            {howItWorks.map((h) => (
              <div key={h.id} className="rw-hiw-item">
                <div className="rw-hiw-head">
                  <span className="rw-hiw-ico">
                    <HowIcon kind={h.icon} />
                  </span>
                  {h.title}
                </div>
                <p className="rw-hiw-text" dangerouslySetInnerHTML={{ __html: highlight(h.text) }} />
              </div>
            ))}
            <button className="rw-terms">↗ Full Terms</button>
          </div>

          <h3 className="rw-h2 rw-friends-title">Friends joined</h3>
        </div>
      )}
    </div>
  );
}

/** Wrap $-amounts in a green span for the "How it works" copy. */
function highlight(text: string): string {
  return text.replace(/(\$[\d.,]+)/g, '<b class="rw-green">$1</b>');
}
