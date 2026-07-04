import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { withdrawals, type Withdrawal } from "../data/withdrawals";
import type { Brand } from "../data/cashout";
import "./MyWithdrawals.css";

const BRAND: Record<Brand, { logo: string; name: string }> = {
  paypal: { logo: `${import.meta.env.BASE_URL}assets/pay/paypal.png`, name: "PayPal" },
  visa: { logo: `${import.meta.env.BASE_URL}assets/pay/visa.png`, name: "Visa Prepaid" },
  bitcoin: { logo: `${import.meta.env.BASE_URL}assets/pay/bitcoin.png`, name: "Bitcoin" },
  litecoin: { logo: `${import.meta.env.BASE_URL}assets/pay/litecoin.png`, name: "Litecoin" },
  solana: { logo: `${import.meta.env.BASE_URL}assets/pay/solana-logo.png`, name: "Solana" },
  dogecoin: { logo: `${import.meta.env.BASE_URL}assets/pay/dogecoin.png`, name: "Dogecoin" },
  stake: { logo: `${import.meta.env.BASE_URL}assets/pay/stake.png`, name: "Stake" },
};

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * MyWithdrawals — the "My withdrawals" history screen (reached from the
 * Cashout header). A typed list of past payouts with pagination; tapping a
 * row opens a detail bottom-sheet.
 */
export default function MyWithdrawals() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<Withdrawal | null>(null);

  return (
    <div className="mw">
      <div className="mw-head">
        <button className="mw-back" onClick={() => navigate(-1)} aria-label="Back">
          <BackIcon />
        </button>
        <h1 className="mw-title">Withdrawals</h1>
      </div>

      <div className="mw-cols">
        <span>Type</span>
        <span>Rewards</span>
      </div>

      <div className="mw-list">
        {withdrawals.map((w) => (
          <button key={w.id} className="mw-row" onClick={() => setDetail(w)}>
            <span className={"mw-logo mw-logo--" + w.brand}>
              <img src={BRAND[w.brand].logo} alt="" />
            </span>
            <span className="mw-type">{w.type}</span>
            <span className="mw-reward">{w.reward}</span>
            <span className="mw-chev">
              <ChevronRight />
            </span>
          </button>
        ))}
      </div>

      <div className="mw-pager">
        <button className="mw-page is-active">1</button>
      </div>

      {detail && (
        <div className="mw-backdrop" onClick={() => setDetail(null)}>
          <div className="mw-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mw-sheet-head">
              <span className={"mw-logo mw-logo--lg mw-logo--" + detail.brand}>
                <img src={BRAND[detail.brand].logo} alt="" />
              </span>
              <h2>{BRAND[detail.brand].name}</h2>
              <button
                className="mw-close"
                onClick={() => setDetail(null)}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <DetailRow k="Reward" v={detail.reward} />
            <DetailRow k="Email/Address" v={detail.email} />
            <DetailRow k="Transaction ID" v={detail.txId || " "} />
            <DetailRow k="Date" v={detail.date} />
            <DetailRow
              k="Status"
              v={detail.status}
              vClass={"mw-status--" + detail.status.toLowerCase()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  k,
  v,
  vClass,
}: {
  k: string;
  v: string;
  vClass?: string;
}) {
  return (
    <div className="mw-drow">
      <span className="mw-dk">{k}</span>
      <span className={"mw-dv " + (vClass ?? "")}>{v}</span>
    </div>
  );
}
