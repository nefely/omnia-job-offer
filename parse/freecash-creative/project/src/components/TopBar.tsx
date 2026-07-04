import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { wallet } from "../data/offers";
import { profile } from "../data/profile";
import StreakSheet from "./StreakSheet";
import LotterySheet from "./LotterySheet";
import NotificationsSheet from "./NotificationsSheet";
import "./TopBar.css";

/**
 * TopBar — fixed header inside the viewport: avatar, three stat pills
 * (streak / balance / tickets) and a notification bell. Static mock values.
 * Avatar → Profile, streak pill → streak sheet, balance pill → Cashout,
 * tickets pill → lottery sheet, bell → notifications sheet.
 */
export default function TopBar() {
  const navigate = useNavigate();
  const [streakOpen, setStreakOpen] = useState(false);
  const [lotteryOpen, setLotteryOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        <button
          className="tb-avatar"
          type="button"
          aria-label="Profile"
          onClick={() => navigate("/profile")}
        >
          <img src={profile.avatar} alt="" width={44} height={44} />
        </button>

        <div className="tb-pills">
          <button
            className="tb-pill tb-pill--streak"
            type="button"
            onClick={() => setStreakOpen(true)}
          >
            <span className="tb-ico">🔥</span>
            {wallet.streak}
          </button>
          <button
            className="tb-pill tb-pill--balance"
            type="button"
            onClick={() => navigate("/cashout")}
          >
            <span className="tb-dollar">$</span>
            {wallet.balance.toFixed(2)}
          </button>
          <button
            className="tb-pill tb-pill--tickets"
            type="button"
            onClick={() => setLotteryOpen(true)}
          >
            <span className="tb-ico">🎟️</span>
            {wallet.tickets}
          </button>
        </div>

        <button
          className="tb-bell"
          type="button"
          aria-label="Notifications"
          onClick={() => setNotifsOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9a6 6 0 1112 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M10 20a2 2 0 004 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="tb-bell-dot" />
        </button>
      </header>

      {streakOpen && <StreakSheet onClose={() => setStreakOpen(false)} />}
      {lotteryOpen && <LotterySheet onClose={() => setLotteryOpen(false)} />}
      {notifsOpen && <NotificationsSheet onClose={() => setNotifsOpen(false)} />}
    </>
  );
}
