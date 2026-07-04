/** Static mock notifications shown from the top-bar bell. */
export interface AppNotification {
  id: string;
  title: string;
  date: string;
  text: string;
  readMore?: boolean;
  img?: string; // offer thumbnail
  grad?: string; // placeholder background when no img
  emoji?: string;
}

export const notifications: AppNotification[] = [
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
    img: `${import.meta.env.BASE_URL}assets/games/coin-fantasy.png`,
  },
  {
    id: "n4",
    title: "Leave a review",
    date: "08/04/2026",
    text: "Thank you for being a 5 stars member of FreeCash. Don't forget to leav...",
    readMore: true,
  },
];
