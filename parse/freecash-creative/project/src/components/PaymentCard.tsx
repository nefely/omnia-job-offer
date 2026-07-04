import type { CashoutTier } from "../data/cashout";
import "./PaymentCard.css";

/** Brand background + centered logo per method (real white marks on gradients). */
const BRAND: Record<
  CashoutTier["brand"],
  { logo: string; label: string; solid?: boolean }
> = {
  paypal: { logo: `${import.meta.env.BASE_URL}assets/pay/paypal.png`, label: "PayPal" },
  visa: { logo: `${import.meta.env.BASE_URL}assets/pay/visa.png`, label: "Visa" },
  bitcoin: { logo: `${import.meta.env.BASE_URL}assets/pay/bitcoin.png`, label: "Bitcoin" },
  litecoin: { logo: `${import.meta.env.BASE_URL}assets/pay/litecoin.png`, label: "Litecoin" },
  solana: { logo: `${import.meta.env.BASE_URL}assets/pay/solana-logo.png`, label: "Solana", solid: true },
  dogecoin: { logo: `${import.meta.env.BASE_URL}assets/pay/dogecoin.png`, label: "Dogecoin" },
  stake: { logo: `${import.meta.env.BASE_URL}assets/pay/stake.png`, label: "Stake" },
};

/**
 * PaymentCard — one withdrawal tier. Shows the amount, brand art, an
 * optional "Lower fees" badge, and a footer that is either a green
 * "Withdraw now" (range or affordable) or a "$balance / $required"
 * progress line when the balance is short.
 */
export default function PaymentCard({
  tier,
  balance,
  onWithdraw,
}: {
  tier: CashoutTier;
  balance: number;
  onWithdraw?: (tier: CashoutTier) => void;
}) {
  const affordable = tier.required === null || balance >= tier.required;
  const brand = BRAND[tier.brand];

  return (
    <div className="payment-card">
      <div className="pc-amount">{tier.amount}</div>
      <div className={`pc-media pc-media--${tier.brand}`}>
        <img
          className={"pc-logo" + (brand.solid ? " pc-logo--solid" : "")}
          src={brand.logo}
          alt={brand.label}
        />
        {tier.lowerFees && <span className="pc-lowerfees">Lower fees</span>}
      </div>
      <div className="pc-footer">
        {affordable ? (
          <button className="pc-withdraw" onClick={() => onWithdraw?.(tier)}>
            Withdraw now
          </button>
        ) : (
          <span className="pc-progress">
            ${balance.toFixed(2)} / ${tier.required}
          </span>
        )}
      </div>
    </div>
  );
}
