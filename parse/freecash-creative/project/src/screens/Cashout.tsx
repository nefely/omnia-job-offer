import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentCard from "../components/PaymentCard";
import WithdrawSheet from "../components/WithdrawSheet";
import {
  cashoutSections,
  cashoutDisclaimer,
  type CashoutTier,
} from "../data/cashout";
import { wallet } from "../data/offers";
import "./Cashout.css";

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 8a2 2 0 012-2h12a2 2 0 012 2v1H5a1 1 0 000 2h15a1 1 0 011 1v5a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" fill="currentColor" opacity="0.15" />
    <path d="M3 8a2 2 0 012-2h13v3M3 8v9a2 2 0 002 2h14a1 1 0 001-1v-5a1 1 0 00-1-1H5a2 2 0 110-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16.5" cy="13.5" r="1.3" fill="currentColor" />
  </svg>
);

/**
 * Cashout — withdrawal hub. Header + balance card, then one section per
 * payout provider (Stake / PayPal / Visa Prepaid / Crypto), each a
 * horizontally scrolling row of PaymentCards, closed by a legal footer.
 */
export default function Cashout() {
  const navigate = useNavigate();
  const [active, setActive] = useState<CashoutTier | null>(null);

  return (
    <div className="cashout">
      <div className="co-head">
        <h1 className="co-title">Cashout</h1>
        <button
          className="co-withdrawals"
          onClick={() => navigate("/withdrawals")}
        >
          My withdrawals
        </button>
      </div>

      <p className="co-desc">
        Redeem your Freecash earnings directly to PayPal, Amazon, Bitcoin and
        more! Withdraw to your crypto wallet starting at just $0.50, and to
        Stake starting at $0.25!
      </p>

      <div className="co-balance">
        <span className="co-balance-ico">
          <WalletIcon />
        </span>
        <div>
          <div className="co-balance-label">Balance</div>
          <div className="co-balance-amount">$ {wallet.balance.toFixed(2)}</div>
        </div>
      </div>

      {cashoutSections.map((sec) => (
        <section key={sec.title} className="co-section">
          <div className="co-section-head">
            <h2>{sec.title}</h2>
            {sec.bonus && <span className="co-bonus">{sec.bonus}</span>}
          </div>
          <div className={"co-row" + (sec.wide ? " co-row--wide" : "")}>
            {sec.tiers.map((t) => (
              <PaymentCard
                key={t.id}
                tier={t}
                balance={wallet.balance}
                onWithdraw={setActive}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="co-disclaimer">
        {cashoutDisclaimer.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {active && (
        <WithdrawSheet tier={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}
