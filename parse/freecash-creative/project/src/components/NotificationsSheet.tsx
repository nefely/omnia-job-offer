import { notifications } from "../data/notifications";
import "./NotificationsSheet.css";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * NotificationsSheet — panel opened by the top-bar bell. Header with a
 * "Mark all as read" action and a scrollable list of notification cards
 * (some with an offer thumbnail). Static mock data.
 */
export default function NotificationsSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="nt-backdrop" onClick={onClose}>
      <div className="nt-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nt-head">
          <h2>Notifications</h2>
          <button className="nt-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <button className="nt-markall">Mark all as read</button>

        <div className="nt-list">
          {notifications.map((n) => (
            <div key={n.id} className="nt-card">
              {(n.img || n.emoji) && (
                <div className="nt-thumb" style={{ background: n.grad }}>
                  {n.img ? <img src={n.img} alt="" /> : <span>{n.emoji}</span>}
                </div>
              )}
              <div className="nt-body">
                <div className="nt-title">{n.title}</div>
                <div className="nt-date">{n.date}</div>
                <div className="nt-text">
                  {n.text}
                  {n.readMore && <a className="nt-more">Read More</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
