import "./SectionHeader.css";

/**
 * SectionHeader — "🏆 Best for You  ...  View all >" row used across
 * the Earn screen. Pass an emoji glyph, title, and an optional link.
 */
export default function SectionHeader({
  icon,
  title,
  onViewAll,
}: {
  icon: string;
  title: string;
  onViewAll?: () => void;
}) {
  return (
    <div className="section-header">
      <h2 className="section-title">
        <span className="section-icon">{icon}</span>
        {title}
      </h2>
      {onViewAll && (
        <button className="section-viewall" type="button" onClick={onViewAll}>
          View all
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
