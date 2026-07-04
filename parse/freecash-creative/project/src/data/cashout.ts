/**
 * Static mock data for the Cashout screen. Withdrawal methods are grouped
 * into sections (Stake, PayPal, Visa Prepaid, Crypto). Each tier is either
 * a fixed amount (needs `required` balance) or a range (`required: null`,
 * always withdrawable). Brand visuals are rendered in CSS by `brand`.
 */

export type Brand =
  | "paypal"
  | "visa"
  | "bitcoin"
  | "litecoin"
  | "solana"
  | "dogecoin"
  | "stake";

export interface CashoutTier {
  id: string;
  brand: Brand;
  amount: string; // display, e.g. "$ 5" or "$ 5 – $1,000"
  required: number | null; // dollars needed; null = range (always available)
  lowerFees?: boolean;
}

export interface CashoutSection {
  title: string;
  bonus?: string; // e.g. "+30% BONUS"
  wide?: boolean; // single full-width card (Stake)
  tiers: CashoutTier[];
}

export const cashoutSections: CashoutSection[] = [
  {
    title: "Stake",
    bonus: "+30% BONUS",
    wide: true,
    tiers: [
      { id: "stake", brand: "stake", amount: "$ 0.25 – $1,000", required: null },
    ],
  },
  {
    title: "PayPal",
    tiers: [
      { id: "pp5", brand: "paypal", amount: "$ 5", required: 5 },
      { id: "pp10", brand: "paypal", amount: "$ 10", required: 10 },
      { id: "pp100", brand: "paypal", amount: "$ 100", required: 100, lowerFees: true },
      { id: "pp200", brand: "paypal", amount: "$ 200", required: 200, lowerFees: true },
    ],
  },
  {
    title: "Visa Prepaid",
    tiers: [
      { id: "visa5", brand: "visa", amount: "$ 5", required: 5 },
      { id: "visa10", brand: "visa", amount: "$ 10", required: 10 },
      { id: "visa25", brand: "visa", amount: "$ 25", required: 25 },
      { id: "visa50", brand: "visa", amount: "$ 50", required: 50, lowerFees: true },
    ],
  },
  {
    title: "Crypto",
    tiers: [
      { id: "btc", brand: "bitcoin", amount: "$ 5 – $1,000", required: null },
      { id: "ltc", brand: "litecoin", amount: "$ 5 – $1,000", required: null },
      { id: "sol", brand: "solana", amount: "$ 0.25 – $1,000", required: null },
      { id: "doge", brand: "dogecoin", amount: "$ 5 – $1,000", required: null },
    ],
  },
];

export const cashoutDisclaimer = [
  "The merchants represented are not sponsors of the rewards or otherwise affiliated with Tango Card, Inc. The logos and other identifying marks attached are trademarks of and owned by each represented company and/or its affiliates. Please visit each company's website for additional terms and conditions.",
  "Before your first payout, an identity check (ID and selfie) is required due to anti-money-laundering laws.",
];
