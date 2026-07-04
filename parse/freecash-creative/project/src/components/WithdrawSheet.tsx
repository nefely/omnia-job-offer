import type { CashoutTier } from "../data/cashout";
import "./WithdrawSheet.css";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const LOGO: Record<CashoutTier["brand"], string> = {
  paypal: `${import.meta.env.BASE_URL}assets/pay/paypal.png`,
  visa: `${import.meta.env.BASE_URL}assets/pay/visa.png`,
  bitcoin: `${import.meta.env.BASE_URL}assets/pay/bitcoin.png`,
  litecoin: `${import.meta.env.BASE_URL}assets/pay/litecoin.png`,
  solana: `${import.meta.env.BASE_URL}assets/pay/solana-logo.png`,
  dogecoin: `${import.meta.env.BASE_URL}assets/pay/dogecoin.png`,
  stake: `${import.meta.env.BASE_URL}assets/pay/stake.png`,
};

const NAME: Record<CashoutTier["brand"], string> = {
  paypal: "PayPal",
  visa: "Visa Prepaid",
  bitcoin: "Bitcoin",
  litecoin: "Litecoin",
  solana: "Solana",
  dogecoin: "Dogecoin",
  stake: "Stake",
};

const RATE: Partial<Record<CashoutTier["brand"], string>> = {
  bitcoin: "$ 61,607.56",
  litecoin: "$ 84.20",
  solana: "$ 172.34",
  dogecoin: "$ 0.16",
};

const TICKER: Partial<Record<CashoutTier["brand"], string>> = {
  bitcoin: "BTC",
  litecoin: "LTC",
  solana: "SOL",
  dogecoin: "DOGE",
};

type Kind = "crypto" | "fiat" | "stake";
function kindOf(brand: CashoutTier["brand"]): Kind {
  if (brand === "stake") return "stake";
  if (brand === "paypal" || brand === "visa") return "fiat";
  return "crypto";
}

/**
 * WithdrawSheet — bottom-sheet form shown when a payout method is tapped.
 * Three layouts: `crypto` (address + destination + live rate/fees),
 * `fiat` (PayPal/Visa email + fees + confirm), `stake` (username + bonus).
 * All fields are static placeholders — no real transaction happens.
 */
export default function WithdrawSheet({
  tier,
  onClose,
}: {
  tier: CashoutTier;
  onClose: () => void;
}) {
  const kind = kindOf(tier.brand);
  const name = NAME[tier.brand];

  return (
    <div className="ws-backdrop" onClick={onClose}>
      <div className="ws-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="ws-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        {/* header */}
        <div className="ws-head">
          <span className={`ws-badge ws-badge--${tier.brand}`}>
            <img src={LOGO[tier.brand]} alt="" />
          </span>
          <h2 className="ws-title">
            {kind === "stake" ? "Confirm Withdrawal" : name}
          </h2>
        </div>

        {kind === "crypto" && <CryptoBody name={name} tier={tier} />}
        {kind === "fiat" && <FiatBody name={name} />}
        {kind === "stake" && <StakeBody />}
      </div>
    </div>
  );
}

function CryptoBody({ name, tier }: { name: string; tier: CashoutTier }) {
  const ticker = TICKER[tier.brand] ?? name.slice(0, 3).toUpperCase();
  return (
    <>
      <div className="ws-radios">
        <label className="ws-radio is-checked">
          <span className="ws-dot" />
          {name} Address
        </label>
        <label className="ws-radio">
          <span className="ws-dot" />
          Stake.us <span className="ws-flag">🇺🇸</span>
          <span className="ws-bonus-text">30% Bonus</span>
        </label>
        <label className="ws-radio">
          <span className="ws-dot" />
          Stake.com <span className="ws-flag">🌐</span>
          <span className="ws-bonus-text">15% Bonus</span>
        </label>
      </div>

      <label className="ws-label">{name} Address</label>
      <input className="ws-input" placeholder={`Enter ${name} Address...`} />
      <p className="ws-hint">The {name} Address for your {name} Wallet.</p>

      <label className="ws-label ws-label--mt">Amount in USD</label>
      <div className="ws-amount">
        <span className="ws-amount-dollar">$</span>
        <span className="ws-amount-val">0</span>
        <button className="ws-max">Max amount</button>
      </div>
      <p className="ws-min">Minimum $ 5</p>

      <div className="ws-summary">
        <Row k={`${ticker} exchange rate`} v={RATE[tier.brand] ?? "$ 0"} />
        <Row k="Crypto Fee" info v="$ 0.28" />
        <Row k="Withdrawal Fee" v="$ 0" green />
        <Row k="Amount" v="$ 0" bold />
      </div>

      <div className="ws-receive">
        <span>You'll receive ({ticker})</span>
        <strong className="ws-receive-crypto">0</strong>
      </div>

      <button className="ws-submit ws-submit--disabled" disabled>
        Withdraw
      </button>
    </>
  );
}

function FiatBody({ name }: { name: string }) {
  return (
    <>
      <div className="ws-note">
        <div>
          Currency: <strong>USD</strong>
        </div>
        <div>
          <strong>Note:</strong> This item is only available for UA residents
        </div>
      </div>

      <label className="ws-label">{name} account*</label>
      <input className="ws-input" placeholder={`Input your ${name} account email`} />
      <div className="ws-callout">
        Your reward will be sent to this address. Make sure this email is linked
        to your {name} account.
      </div>

      <div className="ws-summary ws-summary--mt">
        <Row k="Withdrawal Fee" v="$ 5 (5%)" />
        <Row k={`${name} consumer fee`} v="Free" green />
        <Row k="Amount" v="$100" bold />
      </div>

      <div className="ws-receive">
        <span>You'll receive</span>
        <strong>$ 95</strong>
      </div>

      <label className="ws-check">
        <span className="ws-checkbox" />I understand my order is non-refundable
      </label>

      <button className="ws-submit ws-submit--disabled" disabled>
        Withdraw
      </button>
    </>
  );
}

function StakeBody() {
  return (
    <>
      <div className="ws-callout ws-callout--top">
        Minimum cashout to Stake.us is $ 0.10. We recommend you withdraw to a
        verified account.
      </div>

      <label className="ws-label">Stake.us Username</label>
      <input className="ws-input" placeholder="Stake.us Username" />
      <p className="ws-hint">
        No Stake Account?{" "}
        <a className="ws-link">Create Stake Account</a>
      </p>

      <label className="ws-label ws-label--mt">Amount in USD</label>
      <div className="ws-amount">
        <span className="ws-amount-dollar">$</span>
        <span className="ws-amount-val">0</span>
        <button className="ws-max">Max amount</button>
      </div>
      <p className="ws-min">
        <span className="ws-min-ico">
          <InfoIcon />
        </span>
        Minimum $ 0.10
      </p>

      <div className="ws-summary">
        <Row k="Withdrawal Fee" v="Free" green />
        <div className="ws-row">
          <span className="ws-row-k">
            Bonus <span className="ws-bonus-pill">+30% BONUS</span>
          </span>
          <span className="ws-row-v ws-row-v--bold">$ 0</span>
        </div>
        <Row k="Amount" v="$ 0" bold />
      </div>

      <div className="ws-receive">
        <span>You'll receive (Stake Cash)</span>
        <strong className="ws-receive-stake">Ⓢ 0</strong>
      </div>

      <button className="ws-submit ws-submit--go">Withdraw</button>
    </>
  );
}

function Row({
  k,
  v,
  green,
  bold,
  info,
}: {
  k: string;
  v: string;
  green?: boolean;
  bold?: boolean;
  info?: boolean;
}) {
  return (
    <div className="ws-row">
      <span className={"ws-row-k" + (bold ? " ws-row-k--bold" : "")}>
        {k}
        {info && (
          <span className="ws-row-info">
            <InfoIcon />
          </span>
        )}
      </span>
      <span
        className={
          "ws-row-v" +
          (green ? " ws-row-v--green" : "") +
          (bold ? " ws-row-v--bold" : "")
        }
      >
        {v}
      </span>
    </div>
  );
}
