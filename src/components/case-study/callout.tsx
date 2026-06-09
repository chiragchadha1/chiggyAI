/**
 * Bordered aside for a key takeaway or quote inside a case study.
 * Usage in MDX: <Callout label="Lesson">...</Callout>
 */
export function Callout({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <aside className="cs-callout">
      {label && <span className="cs-callout-label">{label}</span>}
      <div className="cs-callout-body">{children}</div>
    </aside>
  );
}
