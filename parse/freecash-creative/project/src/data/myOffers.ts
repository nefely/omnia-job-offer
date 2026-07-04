/**
 * Static mock data for the "My Offers" tab. Two buckets: `started`
 * (offers in progress) and `completed` (finished / expired). Thumbnails
 * for games we don't yet have real art for use a gradient + emoji
 * placeholder (`grad`/`emoji`); real assets can replace them via `img`.
 */

export type StepStatus = "active" | "completed" | "expired";

export interface RewardStep {
  id: string;
  reward: string; // pre-formatted, e.g. "$ 0.02" or "$ 1"
  label: string;
  time?: string; // e.g. "14D" — only for active steps
  urgent?: boolean; // red time badge when the deadline is close (e.g. "42H")
  status: StepStatus;
}

export interface Lottery {
  amount: string; // "$50,000"
  label: string; // "Weekly Lottery"
  tickets: number;
}

export interface Provider {
  name: string;
  logo?: string; // asset path; falls back to a text badge
}

export interface OfferDetails {
  multiplier: number; // reward multiplier, 0–5 (halves allowed)
  newUsersOnly: boolean;
  flexibleOrder: boolean;
  status: string; // e.g. "Clicked", "Partially Completed"
  category: string; // e.g. "Game"
  provider: Provider;
  description: string; // short intro shown under "Description"
  steps: string; // multi-line body under "Steps" (newlines preserved)
}

/** Shared FAQ items shown at the bottom of every offer's Details tab. */
export const offerFaqs = [
  {
    q: "What is a Reward Multiplier?",
    a: "Boost your earnings with our Reward Multiplier",
  },
  {
    q: "Why is the Average Payout Time so Long?",
    a: "The payout time varies depending on the offer",
  },
];

export interface MyOffer {
  id: string;
  title: string;
  balance: string; // earned so far, e.g. "$11.35"
  img?: string; // real asset if available
  grad: string; // placeholder thumbnail background
  emoji: string; // placeholder glyph
  lottery?: Lottery;
  main: RewardStep[]; // active "Main Rewards"
  done: RewardStep[]; // "Completed or Expired"
  details: OfferDetails;
}

export const startedOffers: MyOffer[] = [
  {
    id: "water-sort",
    title: "Water Sort Master 3D",
    balance: "$7.08",
    img: `${import.meta.env.BASE_URL}assets/games/water-sort.jpg`,
    grad: "linear-gradient(160deg,#111827,#0b0f1a)",
    emoji: "🧪",
    main: [
      { id: "w1", reward: "$ 0.05", label: "Complete Level 20", time: "14D", status: "active" },
      { id: "w2", reward: "$ 0.30", label: "Complete Level 60", time: "14D", status: "active" },
    ],
    done: [{ id: "wd1", reward: "$ 0", label: "Install", status: "completed" }],
    details: {
      multiplier: 3.5,
      newUsersOnly: true,
      flexibleOrder: true,
      status: "Clicked",
      category: "Game",
      provider: { name: "MyChips", logo: `${import.meta.env.BASE_URL}assets/partners/mychips.svg` },
      description:
        "Experience the ultimate brain workout with our challenging yet relaxing game! Test your skills and see what you're truly capable of. 🧠💪",
      steps:
        "Experience the ultimate brain workout with our challenging yet relaxing game! Test your skills and see what you're truly capable of. 🧠💪",
    },
  },
  {
    id: "crypto-magnet",
    title: "Crypto Magnet",
    balance: "$11.35",
    grad: "linear-gradient(160deg,#2aa8ff,#1666e0)",
    emoji: "🧲",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "c1", reward: "$ 0.02", label: "Reach 300 Meters Depth", time: "14D", status: "active" },
      { id: "c2", reward: "$ 0.08", label: "Reach 750 Meters Depth", time: "14D", status: "active" },
      { id: "c3", reward: "$ 0.21", label: "Reach 1500 Meters Depth", time: "14D", status: "active" },
      { id: "c4", reward: "$ 0.63", label: "Reach 3000 Meters Depth", time: "14D", status: "active" },
      { id: "c5", reward: "$ 2.76", label: "Reach 6000 Meters Depth", time: "14D", status: "active" },
      { id: "c6", reward: "$ 7.65", label: "Reach 9000 Meters Depth", time: "14D", status: "active" },
    ],
    done: [{ id: "cd1", reward: "$ 0", label: "Install", status: "completed" }],
    details: {
      multiplier: 4,
      newUsersOnly: true,
      flexibleOrder: true,
      status: "Partially Completed",
      category: "Game",
      provider: { name: "Tyrads" },
      description:
        "1. Play and enjoy Crypto Magnet!\n2. Complete the tasks listed to collect your points!\n3. Each task has a time limit! Complete the event on time to be able to collect the points!\n4. You must be a new player to get rewarded",
      steps:
        "1. Play and enjoy Crypto Magnet.\n2. Complete the tasks listed to collect your points!\n3. Each task has a time limit! Complete the event on time to be able to collect the points!\n4. You must be a new player to get rewarded.\n- Reach 300 Meters Depth - Complete within 15 days\n- Reach 750 Meters Depth - Complete within 15 days\n- Reach 1500 Meters Depth - Complete within 15 days\n- Reach 3000 Meters Depth - Complete within 15 days\n- Reach 6000 Meters Depth - Complete within 15 days\n- Reach 9000 Meters Depth - Complete within 15 days",
    },
  },
  {
    id: "coin-fantasy",
    title: "Coin Fantasy: GO!",
    balance: "$146.62",
    img: `${import.meta.env.BASE_URL}assets/games/coin-fantasy.png`,
    grad: "linear-gradient(160deg,#3b6ef5,#1e3a8a)",
    emoji: "🪙",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "cf1", reward: "$ 0.01", label: "Complete World 5", time: "29D", status: "active" },
      { id: "cf2", reward: "$ 0.02", label: "Complete World 10", time: "29D", status: "active" },
      { id: "cf3", reward: "$ 0.06", label: "Complete World 20", time: "29D", status: "active" },
      { id: "cf4", reward: "$ 0.12", label: "Complete World 35", time: "29D", status: "active" },
      { id: "cf5", reward: "$ 0.22", label: "Complete World 50", time: "29D", status: "active" },
      { id: "cf6", reward: "$ 0.60", label: "Complete World 75", time: "29D", status: "active" },
      { id: "cf7", reward: "$ 1.20", label: "Complete World 100", time: "29D", status: "active" },
      { id: "cf8", reward: "$ 48", label: "Complete World 150", time: "19D", status: "active" },
      { id: "cf9", reward: "$ 76", label: "Complete World 200", time: "29D", status: "active" },
      { id: "cf10", reward: "$ 1.20", label: "Complete World 60", time: "42H", urgent: true, status: "active" },
      { id: "cf11", reward: "$ 6", label: "Complete World 90", time: "6D", status: "active" },
      { id: "cf12", reward: "$ 12", label: "Complete World 125", time: "13D", status: "active" },
      { id: "cf13", reward: "$ 1", label: "Earn bonus rewards with each purchase in 30 days", time: "29D", status: "active" },
    ],
    done: [{ id: "cfd1", reward: "$ 0", label: "Install", status: "completed" }],
    details: {
      multiplier: 5,
      newUsersOnly: true,
      flexibleOrder: true,
      status: "Partially Completed",
      category: "Game",
      provider: { name: "Freecash" },
      description:
        "💰 Spin, earn & conquer! Build your Coin Fantasy empire with endless rewards! 🎲✨",
      steps:
        "Step into the world of Coin Fantasy – the ultimate play-to-earn adventure! 🌑⚔️\n🎲 Spin the wheel, unlock powerful treasures, and rise through levels to become the master of fortune.\n💰 Complete quests, collect coins, and enjoy exciting challenges that keep you coming back every day.\n🔥 Compete with players worldwide, climb the leaderboards, and prove your luck and strategy.\n🎁 With endless opportunities to win and grow, Coin Fantasy is more than a game – it's your daily dose of thrill and reward!\n\n👉 Are you ready to spin your way to glory?",
    },
  },
  {
    id: "mining-empire",
    title: "Mining Empire Idle",
    balance: "$25.48",
    img: `${import.meta.env.BASE_URL}assets/games/mining-empire.png`,
    grad: "linear-gradient(160deg,#f5a623,#b45309)",
    emoji: "⛏️",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "me1", reward: "$ 0.07", label: "Open Coal Shaft #3 in 1st Continent", time: "30D", status: "active" },
      { id: "me2", reward: "$ 0.22", label: "Open Coal Shaft #10 in 1st Continent", time: "30D", status: "active" },
      { id: "me3", reward: "$ 0.43", label: "Open Coal Shaft #19 in 1st Continent", time: "30D", status: "active" },
      { id: "me4", reward: "$ 0.90", label: "Open Ruby Shaft #3 in 1st Continent", time: "30D", status: "active" },
      { id: "me5", reward: "$ 1.08", label: "Open Emerald Shaft #2 in 1st Continent", time: "30D", status: "active" },
      { id: "me6", reward: "$ 1.44", label: "Open Diamond Shaft #2 in 1st Continent", time: "30D", status: "active" },
      { id: "me7", reward: "$ 1.62", label: "Open Sapphire Shaft #3 in 2nd Continent", time: "30D", status: "active" },
      { id: "me8", reward: "$ 1.91", label: "Open Moonstone Shaft #3 in 2nd Continent", time: "20D", status: "active" },
      { id: "me9", reward: "$ 2.16", label: "Open Amethyst Shaft #2 in 2nd Continent", time: "20D", status: "active" },
      { id: "me10", reward: "$ 2.34", label: "Open Amber Shaft #3 in 3rd Continent", time: "20D", status: "active" },
      { id: "me11", reward: "$ 3.24", label: "Open Topaz Shaft #3 in 3rd Continent", time: "20D", status: "active" },
      { id: "me12", reward: "$ 9.36", label: "Open Sunstone Shaft #15 in 3rd Continent", time: "20D", status: "active" },
    ],
    done: [{ id: "med1", reward: "$ 0", label: "Install", status: "completed" }],
    details: {
      multiplier: 3,
      newUsersOnly: true,
      flexibleOrder: true,
      status: "Clicked",
      category: "Game",
      provider: { name: "MyChips", logo: `${import.meta.env.BASE_URL}assets/partners/mychips.svg` },
      description:
        '⛏️💰 Step into the captivating world of "Mining Empire Idle," where strategic prowess transforms you into a mining tycoon! 🌍🔍',
      steps:
        "🌍🔍 Delve deep into the earth's depths to unearth precious gems, rare metals, and untold treasures. 💎\n🏰 Begin your journey to wealth in a humble mine, but with persistence and savvy management, watch as your mining empire reaches unimaginable heights! 🚀\n🏔️ Users need to complete all previous mine shafts to unlock the new mine.",
    },
  },
];

export const completedOffers: MyOffer[] = [
  {
    id: "bitcoin-miner",
    title: "Bitcoin Miner",
    balance: "$10.04",
    grad: "radial-gradient(circle at 50% 45%, #1b1b1b, #0a0a0a)",
    emoji: "₿",
    main: [],
    done: [
      { id: "b1", reward: "$ 0.01", label: "Daily Login: Play on 2 different days", status: "expired" },
      { id: "b2", reward: "$ 0.10", label: "Daily Login: Play on 7 different days", status: "expired" },
      { id: "b3", reward: "$ 1", label: "Daily Login: Play on 30 different days", status: "expired" },
      { id: "b4", reward: "$ 0.02", label: "Link Freecash Account", status: "completed" },
      { id: "b5", reward: "$ 0.01", label: "Level 0: Keep playing to fill the bar!", status: "expired" },
      { id: "b6", reward: "$ 0.10", label: "Level 1: Keep playing to fill the bar!", status: "expired" },
      { id: "b7", reward: "$ 0.30", label: "Level 2: Keep playing to fill the bar!", status: "expired" },
      { id: "b8", reward: "$ 0.40", label: "Level 3: Keep playing to fill the bar!", status: "expired" },
      { id: "b9", reward: "$ 0.60", label: "Level 4: Keep playing to fill the bar!", status: "expired" },
      { id: "b10", reward: "$ 1.50", label: "Level 5: Keep playing to fill the bar!", status: "expired" },
      { id: "b11", reward: "$ 6", label: "Level 6: Keep playing to fill the bar!", status: "expired" },
    ],
    details: {
      multiplier: 5,
      newUsersOnly: true,
      flexibleOrder: true,
      status: "Clicked",
      category: "Game",
      provider: { name: "MyChips", logo: `${import.meta.env.BASE_URL}assets/partners/mychips.svg` },
      description: "Link Freecash account!",
      steps: "Complete the tasks to earn rewards in 30 days!",
    },
  },
];
