// ===== offers =====
/**
 * Static mock data for the Earn screen. No backend — these arrays feed
 * the UI directly. Image paths point at real assets in /public/assets
 * (sourced from the saved Freecash page).
 */





const featured = [
  { id: "zombie-waves", title: "Zombie Waves", reward: 146, platform: "ios", img: "assets/games/zombie-waves.jpg" },
  { id: "hashkey", title: "HashKey Global", reward: 15, platform: "ios", img: "assets/games/hashkey.jpg" },
  { id: "idle-soap-feat", title: "Idle Soap ASMR", reward: 57, platform: "ios", img: "assets/games/idle-soap.png" },
];

const moreOffers = [
  { id: "zombie-2", title: "Zombie Waves", reward: 146, platform: "ios", img: "assets/games/zombie-waves.jpg" },
  { id: "hashkey-2", title: "HashKey Global", reward: 15, platform: "ios", img: "assets/games/hashkey.jpg" },
  { id: "idle-soap", title: "Idle Soap ASMR", reward: 57, platform: "ios", img: "assets/games/idle-soap.png" },
  { id: "water-sort", title: "Water Sort Master 3D", reward: 7, platform: "ios", img: "assets/games/water-sort.jpg" },
  { id: "merge-island", title: "Merge Islanders", reward: 47, platform: "ios", img: "assets/games/merge-islanders.png" },
  { id: "superheroes", title: "Superheroes Idle RPG", reward: 126, platform: "ios", img: "assets/games/superheroes.png" },
  { id: "time-master", title: "Time Master", reward: 262, platform: "ios", img: "assets/games/time-master.webp" },
  { id: "berry-factory", title: "Berry Factory Tycoon", reward: 41, platform: "ios", img: "assets/games/berry-factory.jpg" },
  { id: "rock-n-cash", title: "Rock N Cash", reward: 391, platform: "ios", img: "assets/games/rock-n-cash.jpg" },
  { id: "palmon", title: "Palmon: Survival", reward: 362, platform: "ios", img: "assets/games/palmon.jpg" },
  { id: "jelly-cube", title: "Jelly Cube Run 2048 - Multi - 30 Days", reward: 51, platform: "ios", img: "assets/games/jelly-cube-logo.webp" },
];

const surveys = [
  { id: "burning", label: "Burning", minutes: 5, reward: 0.42, rating: 4.0, grad: "linear-gradient(160deg,#ffb03a,#f5741a)", icon: "🔥" },
  { id: "short-1", label: "Short", minutes: 3, reward: 0.08, rating: 2.5, grad: "linear-gradient(160deg,#22c1ff,#1666e0)", icon: "🚀" },
  { id: "medium", label: "Medium", minutes: 8, reward: 0.55, rating: 3.5, grad: "linear-gradient(160deg,#8b5cf6,#5b21b6)", icon: "🎯" },
];

const partners = [
  { id: "mychips", name: "MyChips", rating: 5, logo: "assets/partners/mychips.svg" },
  { id: "revu", name: "Revenue Universe", rating: 5, bonus: 50, logo: "assets/partners/revu.svg" },
  { id: "mmwall", name: "MM Wall", rating: 5, bonus: 50, logo: "assets/partners/mmwall.svg" },
  { id: "adgate", name: "AdGate", rating: 5, bonus: 50, logo: "assets/partners/adgate.png" },
  { id: "timewall", name: "TimeWall", rating: 3, bonus: 20, logo: "assets/partners/timewall.png" },
  { id: "ayet", name: "Ayet Studios", rating: 3, bonus: 50, logo: "assets/partners/ayet.jpeg" },
];

const wallet = {
  streak: 22,
  balance: 832.54,
  tickets: 19,
  // "Next cashout" progress bar (independent of the displayed balance)
  cashoutCurrent: 274,
  cashoutGoal: 500,
};

// ===== myOffers =====
/**
 * Static mock data for the "My Offers" tab. Two buckets: `started`
 * (offers in progress) and `completed` (finished / expired). Thumbnails
 * for games we don't yet have real art for use a gradient + emoji
 * placeholder (`grad`/`emoji`); real assets can replace them via `img`.
 */






/** Shared FAQ items shown at the bottom of every offer's Details tab. */
const offerFaqs = [
  {
    q: "What is a Reward Multiplier?",
    a: "Boost your earnings with our Reward Multiplier",
  },
  {
    q: "Why is the Average Payout Time so Long?",
    a: "The payout time varies depending on the offer",
  },
];


const startedOffers = [
  {
    id: "water-sort",
    title: "Water Sort Master 3D",
    balance: "$7.08",
    img: "assets/games/water-sort.jpg",
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
      provider: { name: "MyChips", logo: "assets/partners/mychips.svg" },
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
      { id: "c1", reward: "$ 0.02", label: "Reach 300 Meters Depth", time: "14D", status: "completed" },
      { id: "c2", reward: "$ 0.08", label: "Reach 750 Meters Depth", time: "14D", status: "completed" },
      { id: "c3", reward: "$ 0.21", label: "Reach 1500 Meters Depth", time: "14D", status: "completed" },
      { id: "c4", reward: "$ 0.63", label: "Reach 3000 Meters Depth", time: "14D", status: "completed" },
      { id: "c5", reward: "$ 2.76", label: "Reach 6000 Meters Depth", time: "14D", status: "completed" },
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
    img: "assets/games/coin-fantasy.png",
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
    img: "assets/games/mining-empire.png",
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
      provider: { name: "MyChips", logo: "assets/partners/mychips.svg" },
      description:
        '⛏️💰 Step into the captivating world of "Mining Empire Idle," where strategic prowess transforms you into a mining tycoon! 🌍🔍',
      steps:
        "🌍🔍 Delve deep into the earth's depths to unearth precious gems, rare metals, and untold treasures. 💎\n🏰 Begin your journey to wealth in a humble mine, but with persistence and savvy management, watch as your mining empire reaches unimaginable heights! 🚀\n🏔️ Users need to complete all previous mine shafts to unlock the new mine.",
    },
  },

  {
    id: "mo-zombie",
    title: "Zombie Waves",
    balance: "$12.40",
    img: "assets/games/zombie-waves.jpg",
    grad: "linear-gradient(160deg,#3a2a1a,#12100e)",
    emoji: "🎮",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "mo-zombie0", reward: "$ 0", label: "Install", status: "completed" },
      { id: "mo-zombie1", reward: "$ 0.05", label: "Reach Level 10", time: "30D", status: "active" },
      { id: "mo-zombie2", reward: "$ 0.30", label: "Reach Level 30", time: "30D", status: "active" },
      { id: "mo-zombie3", reward: "$ 1.20", label: "Reach Level 60", time: "30D", status: "active" },
    ],
    done: [{ id: "mo-zombied", reward: "$ 0", label: "Install", status: "completed" }],
    details: { multiplier: 3.5, newUsersOnly: true, flexibleOrder: true, status: "Clicked", category: "Game", provider: { name: "MyChips", logo: "assets/partners/mychips.svg" }, description: "Survive the zombie waves and level up to earn rewards.", steps: "Survive the zombie waves and level up to earn rewards." }
  },
  {
    id: "mo-time",
    title: "Time Master",
    balance: "$8.90",
    img: "assets/games/time-master.webp",
    grad: "linear-gradient(160deg,#3b2a6e,#1a1440)",
    emoji: "🎮",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "mo-time0", reward: "$ 0.08", label: "Complete Location 5", status: "completed" },
      { id: "mo-time1", reward: "$ 0.20", label: "Complete Location 10", time: "30D", status: "active" },
      { id: "mo-time2", reward: "$ 1", label: "Complete Location 25", time: "30D", status: "active" },
      { id: "mo-time3", reward: "$ 6", label: "Complete Location 50", time: "30D", status: "active" },
    ],
    done: [{ id: "mo-timed", reward: "$ 0", label: "Install", status: "completed" }],
    details: { multiplier: 4, newUsersOnly: true, flexibleOrder: true, status: "Clicked", category: "Game", provider: { name: "MyChips", logo: "assets/partners/mychips.svg" }, description: "Complete locations to progress and earn rewards.", steps: "Complete locations to progress and earn rewards." }
  },
  {
    id: "mo-palmon",
    title: "Palmon: Survival",
    balance: "$25.60",
    img: "assets/games/palmon.jpg",
    grad: "linear-gradient(160deg,#e94f8a,#7b5cff)",
    emoji: "🎮",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "mo-palmon0", reward: "$ 0", label: "Install", status: "completed" },
      { id: "mo-palmon1", reward: "$ 0.04", label: "Reach Camp Level 6", time: "30D", status: "active" },
      { id: "mo-palmon2", reward: "$ 0.13", label: "Reach Camp Level 13", time: "30D", status: "active" },
      { id: "mo-palmon3", reward: "$ 0.42", label: "Reach Camp Level 16", time: "30D", status: "active" },
    ],
    done: [{ id: "mo-palmond", reward: "$ 0", label: "Install", status: "completed" }],
    details: { multiplier: 5, newUsersOnly: true, flexibleOrder: true, status: "Clicked", category: "Game", provider: { name: "MyChips", logo: "assets/partners/mychips.svg" }, description: "Collect Palmons and reach camp levels to earn rewards.", steps: "Collect Palmons and reach camp levels to earn rewards." }
  },
  {
    id: "mo-jelly",
    title: "Jelly Cube Run 2048 - Multi - 30 Days",
    balance: "$3.75",
    img: "assets/games/jelly-cube-logo.webp",
    grad: "linear-gradient(160deg,#7b5cff,#00e0ff)",
    emoji: "🎮",
    lottery: { amount: "$50,000", label: "Weekly Lottery", tickets: 0 },
    main: [
      { id: "mo-jelly0", reward: "$ 0.02", label: "Reach rank Wooden 2", status: "completed" },
      { id: "mo-jelly1", reward: "$ 0.08", label: "Reach rank Steel 1", time: "30D", status: "active" },
      { id: "mo-jelly2", reward: "$ 0.16", label: "Reach rank Bronze 1", time: "30D", status: "active" },
      { id: "mo-jelly3", reward: "$ 0.32", label: "Reach rank Silver 1", time: "30D", status: "active" },
    ],
    done: [{ id: "mo-jellyd", reward: "$ 0", label: "Install", status: "completed" }],
    details: { multiplier: 4, newUsersOnly: true, flexibleOrder: true, status: "Clicked", category: "Game", provider: { name: "MyChips", logo: "assets/partners/mychips.svg" }, description: "Merge cubes and climb the ranks to earn rewards.", steps: "Merge cubes and climb the ranks to earn rewards." }
  },
];

const completedOffers = [
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
      provider: { name: "MyChips", logo: "assets/partners/mychips.svg" },
      description: "Link Freecash account!",
      steps: "Complete the tasks to earn rewards in 30 days!",
    },
  },
];

// ===== cashout =====
/**
 * Static mock data for the Cashout screen. Withdrawal methods are grouped
 * into sections (Stake, PayPal, Visa Prepaid, Crypto). Each tier is either
 * a fixed amount (needs `required` balance) or a range (`required: null`,
 * always withdrawable). Brand visuals are rendered in CSS by `brand`.
 */




const cashoutSections = [
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

const cashoutDisclaimer = [
  "The merchants represented are not sponsors of the rewards or otherwise affiliated with Tango Card, Inc. The logos and other identifying marks attached are trademarks of and owned by each represented company and/or its affiliates. Please visit each company's website for additional terms and conditions.",
  "Before your first payout, an identity check (ID and selfie) is required due to anti-money-laundering laws.",
];

// ===== rewards =====
/**
 * Static mock data for the Rewards screen (Quests / Bonuses / Invite).
 */


const quests = [
  { id: "q1", reward: "$ 0.50", label: "Install 2 apps, use them for 2 minutes" },
  { id: "q2", reward: "$ 12.50", label: "Invite your first friend" },
  { id: "q3", reward: "$ 30", label: "Sign up to Stake and verify for free" },
];

const streak = {
  current: 3,
  total: 5,
  perStep: 5, // dollars per streak day
  claimAmount: 15, // current * perStep
};

const referral = {
  link: "freecash.com/r/",
  code: "YUM1M",
};

const lottery = {
  number: 62,
  // 3d 03h 21m 04s expressed in seconds, counted down live
  countdownSeconds: 3 * 86400 + 3 * 3600 + 21 * 60 + 4,
  pool: "$50,000",
  winners: 2500,
  tickets: 19,
};


const lotteryPrizes = [
  { id: "p4", place: "4th - 10th", prize: "$500" },
  { id: "p11", place: "11th - 100th", prize: "$100" },
  { id: "p101", place: "101st - 1000th", prize: "$10" },
  { id: "p1001", place: "1001st - 2500th", prize: "$5" },
];

const lotteryPodium = {
  first: "$15,000",
  second: "$4,000",
  third: "$2,000",
};


const howItWorks = [
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

// ===== withdrawals =====
const withdrawals = [
  { id: "np1", brand: "paypal", type: "Paypal", reward: "$ 92.40", email: "-", txId: "", date: "1 days ago", status: "Completed" },
  { id: "np2", brand: "paypal", type: "Paypal", reward: "$ 128.75", email: "-", txId: "", date: "2 days ago", status: "Completed" },
  { id: "np3", brand: "paypal", type: "Paypal", reward: "$ 165.20", email: "-", txId: "", date: "3 days ago", status: "Completed" },
  { id: "np4", brand: "paypal", type: "Paypal", reward: "$ 110.50", email: "-", txId: "", date: "4 days ago", status: "Completed" },
  { id: "np5", brand: "paypal", type: "Paypal", reward: "$ 187.30", email: "-", txId: "", date: "5 days ago", status: "Completed" },
  { id: "np6", brand: "paypal", type: "Paypal", reward: "$ 143.90", email: "-", txId: "", date: "6 days ago", status: "Completed" },
  {
    id: "w1",
    brand: "paypal",
    type: "Paypal",
    reward: "$ 23.50",
    email: "-",
    txId: "",
    date: "191 days ago",
    status: "Completed",
  },
  {
    id: "w2",
    brand: "visa",
    type: "Visa Prepaid",
    reward: "$ 84.30",
    email: "-",
    txId: "",
    date: "42 days ago",
    status: "Completed",
  },
  {
    id: "w3",
    brand: "paypal",
    type: "Paypal",
    reward: "$ 34.50",
    email: "-",
    txId: "",
    date: "12 days ago",
    status: "Completed",
  },
  {
    id: "w4",
    brand: "bitcoin",
    type: "Bitcoin",
    reward: "$ 52.40",
    email: "-",
    txId: "",
    date: "9 days ago",
    status: "Completed",
  },
  {
    id: "w5",
    brand: "litecoin",
    type: "Litecoin",
    reward: "$ 71.90",
    email: "-",
    txId: "",
    date: "7 days ago",
    status: "Completed",
  },
  {
    id: "w6",
    brand: "visa",
    type: "Visa Prepaid",
    reward: "$ 38.75",
    email: "-",
    txId: "",
    date: "5 days ago",
    status: "Completed",
  },
  {
    id: "w7",
    brand: "dogecoin",
    type: "Dogecoin",
    reward: "$ 95.30",
    email: "-",
    txId: "",
    date: "3 days ago",
    status: "Completed",
  },
  {
    id: "w8",
    brand: "paypal",
    type: "Paypal",
    reward: "$ 44.10",
    email: "-",
    txId: "",
    date: "1 day ago",
    status: "Completed",
  },
  { id: "w9", brand: "visa", type: "Visa Prepaid", reward: "$ 61.20", email: "-", txId: "", date: "205 days ago", status: "Completed" },
  { id: "w10", brand: "bitcoin", type: "Bitcoin", reward: "$ 88.40", email: "-", txId: "", date: "198 days ago", status: "Completed" },
  { id: "w11", brand: "paypal", type: "Paypal", reward: "$ 42.75", email: "-", txId: "", date: "180 days ago", status: "Completed" },
  { id: "w12", brand: "litecoin", type: "Litecoin", reward: "$ 77.10", email: "-", txId: "", date: "165 days ago", status: "Completed" },
  { id: "w13", brand: "dogecoin", type: "Dogecoin", reward: "$ 53.60", email: "-", txId: "", date: "150 days ago", status: "Completed" },
  { id: "w14", brand: "visa", type: "Visa Prepaid", reward: "$ 95.30", email: "-", txId: "", date: "142 days ago", status: "Completed" },
  { id: "w15", brand: "paypal", type: "Paypal", reward: "$ 39.90", email: "-", txId: "", date: "133 days ago", status: "Completed" },
  { id: "w16", brand: "bitcoin", type: "Bitcoin", reward: "$ 66.50", email: "-", txId: "", date: "120 days ago", status: "Completed" },
  { id: "w17", brand: "solana", type: "Solana", reward: "$ 84.15", email: "-", txId: "", date: "110 days ago", status: "Completed" },
  { id: "w18", brand: "paypal", type: "Paypal", reward: "$ 47.30", email: "-", txId: "", date: "98 days ago", status: "Completed" },
  { id: "w19", brand: "litecoin", type: "Litecoin", reward: "$ 72.80", email: "-", txId: "", date: "85 days ago", status: "Completed" },
  { id: "w20", brand: "visa", type: "Visa Prepaid", reward: "$ 58.25", email: "-", txId: "", date: "74 days ago", status: "Completed" },
  { id: "w21", brand: "dogecoin", type: "Dogecoin", reward: "$ 91.40", email: "-", txId: "", date: "60 days ago", status: "Completed" },
  { id: "w22", brand: "paypal", type: "Paypal", reward: "$ 36.70", email: "-", txId: "", date: "48 days ago", status: "Completed" },
  { id: "w23", brand: "bitcoin", type: "Bitcoin", reward: "$ 69.95", email: "-", txId: "", date: "33 days ago", status: "Completed" },
  { id: "w24", brand: "visa", type: "Visa Prepaid", reward: "$ 80.50", email: "-", txId: "", date: "20 days ago", status: "Completed" },
];

// ===== notifications =====
/** Static mock notifications shown from the top-bar bell. */

const notifications = [
  {
    id: "n1",
    title: "Leave a review",
    date: "01/07/2026",
    text: "Thank you for being a 5 stars member of FreeCash. Don't forget to leav...",
    readMore: true,
  },
  {
    id: "n2",
    title: "Offer earnings",
    date: "01/07/2026",
    text: "You have completed the 'Install' task of the 'Crypto Magnet' offer.",
    grad: "linear-gradient(160deg,#2aa8ff,#1666e0)",
    emoji: "🧲",
  },
  {
    id: "n3",
    title: "Offer earnings",
    date: "01/07/2026",
    text: "You have been credited for an offer worth $ 0.01 on Freecash.",
    img: "assets/games/coin-fantasy.png",
  },
  {
    id: "n4",
    title: "Leave a review",
    date: "08/04/2026",
    text: "Thank you for being a 5 stars member of FreeCash. Don't forget to leav...",
    readMore: true,
  },
];

// ===== profile =====
/** Static mock profile data. */
const profile = {
  name: "Emma",
  avatar: "assets/emma.jpg",
  country: "🇺🇦",
  totalEarnings: "$ 2319.83",
  offersCompleted: 48,
  level: 12,
  coinsToLevelUp: 980,
  levelProgress: 50, // % filled
  freecashId: "66520222",
  referrer: "-",
  referralEarnings: "0 coins",
  dateJoined: "December 18, 2025",
  email: "emmas2u@gmail.com",
  emailVerified: true,
  profilePublic: true,
  promoOffers: true,
  language: "English",
};

const freecashAbout =
  "Freecash is a platform where users can earn money and rewards by completing tasks, surveys, and offers, with quick payout options like gift cards, PayPal, and cryptocurrencies.";

const footerSections = ["Freecash", "Resources", "Business"];

const footerLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Affiliate Policy",
];

const footerSocials = [
  "𝕏",
  "f",
  "◉",
  "r",
  "D",
  "▶",
  "★",
];

// ===== offerDetails =====
/**
 * Main-reward lists for the Earn offer-detail sheet, keyed by offer title.
 * Titles that aren't listed fall back to `defaultRewards`.
 */
const offerRewards = {
  "Jelly Cube Run 2048 - Multi - 30 Days": [
    { id: "jc0", reward: "$ 0.02", label: "Reach rank Wooden 2", status: "completed" },
    { id: "jc1", reward: "$ 0.08", label: "Reach rank Steel 1", status: "completed" },
    { id: "jc2", reward: "$ 0.16", label: "Reach rank Bronze 1", status: "completed" },
    { id: "jc3", reward: "$ 0.32", label: "Reach rank Silver 1", status: "completed" },
    { id: "jc4", reward: "$ 0.64", label: "Reach rank Gold 1", status: "completed" },
    { id: "jc5", reward: "$ 1.29", label: "Reach rank Platinum 1", status: "completed" },
    { id: "jc6", reward: "$ 2.59", label: "Reach rank Diamond 1", status: "completed" },
    { id: "jc7", reward: "$ 5.26", label: "Reach rank Master 1", status: "completed" },
    { id: "jc8", reward: "$ 8.10", label: "Reach rank Supreme 1", status: "completed" },
    { id: "jc9", reward: "$ 12.15", label: "Reach rank Extra Supreme 1", status: "completed" },
    { id: "jc10", reward: "$ 20.25", label: "Reach rank Extra Supreme 3", status: "completed" },
  ],

  "Time Master": [
    { id: "tm0", reward: "$ 0.40", label: "Earn bonus rewards with each purchase in 30 days - Up to 5 times", status: "completed" },
    { id: "tm1", reward: "$ 0.08", label: "Complete Location 5", status: "completed" },
    { id: "tm2", reward: "$ 0.20", label: "Complete Location 10", status: "completed" },
    { id: "tm3", reward: "$ 1", label: "Complete Location 25", status: "completed" },
    { id: "tm4", reward: "$ 6", label: "Complete Location 50", status: "completed" },
    { id: "tm5", reward: "$ 8", label: "Complete Location 75", status: "completed" },
    { id: "tm6", reward: "$ 10", label: "Complete Location 100", time: "20D", status: "active" },
    { id: "tm7", reward: "$ 12", label: "Complete Location 150", time: "30D", status: "active" },
    { id: "tm8", reward: "$ 20", label: "Complete Location 250", time: "30D", status: "active" },
    { id: "tm9", reward: "$ 28", label: "Complete Location 350", time: "30D", status: "active" },
    { id: "tm10", reward: "$ 40", label: "Complete Location 500", time: "30D", status: "active" },
    { id: "tm11", reward: "$ 60", label: "Complete Location 750", time: "40D", status: "active" },
    { id: "tm12", reward: "$ 76", label: "Complete Location 1000", time: "40D", status: "active" },
  ],

  "Palmon: Survival": [
    { id: "pal0", reward: "$ 0", label: "Install", status: "completed" },
    { id: "pal1", reward: "$ 0.04", label: "Reach Camp Level 6. Complete within 1 day", status: "completed" },
    { id: "pal2", reward: "$ 0.13", label: "Reach Camp Level 13. Complete within 2 days", status: "completed" },
    { id: "pal3", reward: "$ 0.42", label: "Reach Camp Level 16. Complete within 4 days", status: "completed" },
    { id: "pal4", reward: "$ 0.50", label: "Reach Camp Level 18. Complete within 10 days", status: "completed" },
    { id: "pal5", reward: "$ 8.40", label: "Reach Camp Level 20. Complete within 3 days", status: "completed" },
    { id: "pal6", reward: "$ 0.67", label: "Reach Camp Level 21. Complete within 20 days", status: "completed" },
    { id: "pal7", reward: "$ 16.80", label: "Reach Camp Level 22. Complete within 5 days", status: "completed" },
    { id: "pal8", reward: "$ 2.52", label: "Reach Camp Level 23. Complete within 14 days", status: "completed" },
    { id: "pal9", reward: "$ 33.60", label: "Reach Camp Level 24. Complete within 7 days", status: "completed" },
    { id: "pal10", reward: "$ 8.40", label: "Reach Camp Level 25. Complete within 30 days", status: "completed" },
    { id: "pal11", reward: "$ 25.20", label: "Reach Camp Level 26. Complete within 30 days", status: "completed" },
    { id: "pal12", reward: "$ 252", label: "Reach Camp Level 30. Complete within 35 days", status: "completed" },
    { id: "pal13", reward: "$ 2.52", label: "Buy First Purchase (Lucidina) $4.99. Complete within 3 days", status: "completed" },
    { id: "pal14", reward: "$ 4.20", label: "Buy Third Build Queue Bundle $9.99. Complete within 6 days", status: "completed" },
    { id: "pal15", reward: "$ 6.72", label: "Buy Lifetime Privileges. Complete within 15 days", status: "completed" },
    { id: "pal16", reward: "$ 0.08", label: "Log in any 20 days. Complete within 30 days", status: "completed" },
  ],

  "HashKey Global": [
    { id: "h0", reward: "$ 0", label: "Install", time: "30D", status: "active" },
    { id: "h1", reward: "$ 3.36", label: "Complete Identity Verification", time: "30D", status: "active" },
    { id: "h2", reward: "$ 5.04", label: "First Time Deposit", time: "30D", status: "active" },
    { id: "h3", reward: "$ 6.30", label: "First Time Trade", time: "30D", status: "active" },
  ],
  "Merge Islanders": [
    { id: "m0", reward: "$ 0.02", label: "Install the game! 🌴🌺", time: "30D", status: "active" },
    { id: "m1", reward: "$ 0.14", label: "Complete day #3 🌷", time: "30D", status: "active" },
    { id: "m2", reward: "$ 0.28", label: "Complete day #5 🌸", time: "30D", status: "active" },
    { id: "m3", reward: "$ 0.40", label: "Complete day #8 🌼", time: "30D", status: "active" },
    { id: "m4", reward: "$ 1.20", label: "Complete day #12 🌻", time: "20D", status: "active" },
    { id: "m5", reward: "$ 4", label: "Complete day #15 🏆", time: "20D", status: "active" },
  ],
  "Water Sort Master 3D": [
    { id: "w0", reward: "$ 0.04", label: "Complete level 15", time: "30D", status: "active" },
    { id: "w1", reward: "$ 0.06", label: "Complete level 25", time: "30D", status: "active" },
    { id: "w2", reward: "$ 0.13", label: "Complete level 75", time: "30D", status: "active" },
    { id: "w3", reward: "$ 0.22", label: "Complete level 200", time: "30D", status: "active" },
    { id: "w4", reward: "$ 0.36", label: "Complete level 500", time: "30D", status: "active" },
    { id: "w5", reward: "$ 0.45", label: "Complete level 750", time: "30D", status: "active" },
  ],
  "Superheroes Idle RPG": [
    { id: "s0", reward: "$ 0.04", label: "Claim Mission #020", time: "20D", status: "active" },
    { id: "s1", reward: "$ 0.20", label: "Claim Mission #050", time: "20D", status: "active" },
    { id: "s2", reward: "$ 0.60", label: "Claim Mission #075", time: "20D", status: "active" },
    { id: "s3", reward: "$ 4", label: "Claim Mission #0100", time: "20D", status: "active" },
    { id: "s4", reward: "$ 8", label: "Claim Mission #150", time: "20D", status: "active" },
    { id: "s5", reward: "$ 20", label: "Claim Mission #250", time: "30D", status: "active" },
    { id: "s6", reward: "$ 60", label: "Claim Mission #340", time: "40D", status: "active" },
    { id: "s7", reward: "$ 1", label: 'Complete "Bosh Rush" Challenge Level #30', time: "30D", status: "active" },
    { id: "s8", reward: "$ 2", label: 'Complete "Bosh Rush" Challenge Level #60', time: "30D", status: "active" },
  ],
};

const defaultRewards = [
  { id: "d0", reward: "$ 0", label: "Install", time: "30D", status: "completed" },
  { id: "d1", reward: "$ 0.05", label: "Reach Level 10", time: "30D", status: "completed" },
  { id: "d2", reward: "$ 0.30", label: "Reach Level 30", time: "30D", status: "completed" },
  { id: "d3", reward: "$ 1.20", label: "Reach Level 60", time: "30D", status: "completed" },
];

function rewardsFor(title) {
  return offerRewards[title] ?? defaultRewards;
}


// ===== locales (language + currency by geo) =====
// rate = how much 1 USD is worth in this currency. Edit freely.
const locales = {
  us: { code: "us", name: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8", currency: "$", rate: 1 },
  uk: { code: "uk", name: "United Kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7", currency: "\u00A3", rate: 0.79 },
  de: { code: "de", name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA", currency: "\u20AC", rate: 0.92 }
};


// ===== gender profiles (avatar + name swap) =====
const genders = {
  female: { name: "Emma", avatar: "assets/emma.jpg" },
  male: { name: "Tom", avatar: "assets/tom.jpg" }
};

window.DATA = { featured, moreOffers, surveys, partners, wallet, startedOffers, completedOffers, offerFaqs, cashoutSections, cashoutDisclaimer, quests, streak, referral, howItWorks, lottery, lotteryPrizes, lotteryPodium, withdrawals, notifications, profile, freecashAbout, footerSections, footerLinks, footerSocials, locales, genders, offerRewards, defaultRewards, rewardsFor };
