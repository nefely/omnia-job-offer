import type { RewardStep } from "./myOffers";

/**
 * Main-reward lists for the Earn offer-detail sheet, keyed by offer title.
 * Titles that aren't listed fall back to `defaultRewards`.
 */
export const offerRewards: Record<string, RewardStep[]> = {
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

export const defaultRewards: RewardStep[] = [
  { id: "d0", reward: "$ 0", label: "Install", time: "30D", status: "active" },
  { id: "d1", reward: "$ 0.05", label: "Reach Level 10", time: "30D", status: "active" },
  { id: "d2", reward: "$ 0.30", label: "Reach Level 30", time: "30D", status: "active" },
  { id: "d3", reward: "$ 1.20", label: "Reach Level 60", time: "30D", status: "active" },
];

export function rewardsFor(title: string): RewardStep[] {
  return offerRewards[title] ?? defaultRewards;
}
