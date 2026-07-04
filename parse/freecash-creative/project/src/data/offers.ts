/**
 * Static mock data for the Earn screen. No backend — these arrays feed
 * the UI directly. Image paths point at real assets in /public/assets
 * (sourced from the saved Freecash page).
 */

export type Platform = "ios" | "android";

export interface Offer {
  id: string;
  title: string;
  reward: number; // dollars
  platform: Platform;
  img: string; // thumbnail asset
}

export interface Survey {
  id: string;
  label: string;
  minutes: number;
  reward: number;
  rating: number;
  grad: string;
  icon: string; // decorative glyph on the tile
}

export interface Partner {
  id: string;
  name: string;
  rating: number;
  bonus?: number; // "+50%" style boost badge
  logo: string; // logo asset
}

export const featured: Offer[] = [
  { id: "zombie-waves", title: "Zombie Waves", reward: 146, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/zombie-waves.jpg` },
  { id: "hashkey", title: "HashKey Global", reward: 15, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/hashkey.jpg` },
  { id: "idle-soap-feat", title: "Idle Soap ASMR", reward: 57, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/idle-soap.png` },
];

export const moreOffers: Offer[] = [
  { id: "zombie-2", title: "Zombie Waves", reward: 146, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/zombie-waves.jpg` },
  { id: "hashkey-2", title: "HashKey Global", reward: 15, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/hashkey.jpg` },
  { id: "idle-soap", title: "Idle Soap ASMR", reward: 57, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/idle-soap.png` },
  { id: "water-sort", title: "Water Sort Master 3D", reward: 7, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/water-sort.jpg` },
  { id: "merge-island", title: "Merge Islanders", reward: 47, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/merge-islanders.png` },
  { id: "superheroes", title: "Superheroes Idle RPG", reward: 126, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/superheroes.png` },
  { id: "time-master", title: "Time Master", reward: 63, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/time-master.png` },
  { id: "berry-factory", title: "Berry Factory Tycoon", reward: 41, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/berry-factory.jpg` },
  { id: "rock-n-cash", title: "Rock N Cash", reward: 391, platform: "ios", img: `${import.meta.env.BASE_URL}assets/games/rock-n-cash.jpg` },
];

export const surveys: Survey[] = [
  { id: "burning", label: "Burning", minutes: 5, reward: 0.42, rating: 4.0, grad: "linear-gradient(160deg,#ffb03a,#f5741a)", icon: "🔥" },
  { id: "short-1", label: "Short", minutes: 3, reward: 0.08, rating: 2.5, grad: "linear-gradient(160deg,#22c1ff,#1666e0)", icon: "🚀" },
  { id: "medium", label: "Medium", minutes: 8, reward: 0.55, rating: 3.5, grad: "linear-gradient(160deg,#8b5cf6,#5b21b6)", icon: "🎯" },
];

export const partners: Partner[] = [
  { id: "mychips", name: "MyChips", rating: 5, logo: `${import.meta.env.BASE_URL}assets/partners/mychips.svg` },
  { id: "revu", name: "Revenue Universe", rating: 5, bonus: 50, logo: `${import.meta.env.BASE_URL}assets/partners/revu.svg` },
  { id: "mmwall", name: "MM Wall", rating: 5, bonus: 50, logo: `${import.meta.env.BASE_URL}assets/partners/mmwall.svg` },
  { id: "adgate", name: "AdGate", rating: 5, bonus: 50, logo: `${import.meta.env.BASE_URL}assets/partners/adgate.png` },
  { id: "timewall", name: "TimeWall", rating: 3, bonus: 20, logo: `${import.meta.env.BASE_URL}assets/partners/timewall.png` },
  { id: "ayet", name: "Ayet Studios", rating: 3, bonus: 50, logo: `${import.meta.env.BASE_URL}assets/partners/ayet.jpeg` },
];

export const wallet = {
  streak: 22,
  balance: 792.12,
  tickets: 19,
  // "Next cashout" progress bar (independent of the displayed balance)
  cashoutCurrent: 274,
  cashoutGoal: 500,
};
