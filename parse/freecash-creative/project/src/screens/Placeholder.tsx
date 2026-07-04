import "./Placeholder.css";

/**
 * Placeholder — temporary screen body. Each real screen (Earn, Surveys,
 * Rewards, Cash Out, Profile) replaces this as we build from screenshots.
 */
export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="placeholder">
      <div className="placeholder-badge">{title}</div>
      <p className="placeholder-hint">
        Screen scaffold ready — awaiting design screenshot.
      </p>
    </div>
  );
}
