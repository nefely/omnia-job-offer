/**
 * Static mock data for the Rewards screen (Quests / Bonuses / Invite).
 */

export interface Quest {
  id: string;
  reward: string; // "$ 0.50"
  label: string;
}

export const quests: Quest[] = [
  { id: "q1", reward: "$ 0.50", label: "Install 2 apps, use them for 2 minutes" },
  { id: "q2", reward: "$ 12.50", label: "Invite your first friend" },
  { id: "q3", reward: "$ 30", label: "Sign up to Stake and verify for free" },
];

export const streak = {
  current: 3,
  total: 5,
  perStep: 5, // dollars per streak day
  claimAmount: 15, // current * perStep
};

export const referral = {
  link: "freecash.com/r/",
  code: "YUM1M",
};

export const lottery = {
  number: 62,
  // 3d 03h 21m 04s expressed in seconds, counted down live
  countdownSeconds: 3 * 86400 + 3 * 3600 + 21 * 60 + 4,
  pool: "$50,000",
  winners: 2500,
  tickets: 19,
};

export interface PrizeTier {
  id: string;
  place: string; // "4th - 10th"
  prize: string; // "$500"
}

export const lotteryPrizes: PrizeTier[] = [
  { id: "p4", place: "4th - 10th", prize: "$500" },
  { id: "p11", place: "11th - 100th", prize: "$100" },
  { id: "p101", place: "101st - 1000th", prize: "$10" },
  { id: "p1001", place: "1001st - 2500th", prize: "$5" },
];

export const lotteryPodium = {
  first: "$15,000",
  second: "$4,000",
  third: "$2,000",
};

export interface HowItWorks {
  id: string;
  icon: "link" | "wallet" | "star";
  title: string;
  text: string;
}

export const howItWorks: HowItWorks[] = [
  {
    id: "h1",
    icon: "link",
    title: "Earn by helping others",
    text: "Share your unique link – receive $2.50 for every friend that plays a game. They'll get $10 too!",
  },
  {
    id: "h2",
    icon: "wallet",
    title: "Get more when they cashout",
    text: "You'll receive an extra $10 when your friend makes their first withdrawal.",
  },
  {
    id: "h3",
    icon: "star",
    title: "Keep it fair",
    text: "We only reward you for real new users from eligible countries who sign up and play. No duplicate accounts allowed.",
  },
];
