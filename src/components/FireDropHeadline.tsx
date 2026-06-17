const HEADLINE = "250,000+ girls raped, trafficked & tortured";

export function FireDropHeadline() {
  return (
    <div className="fire-drop-wrap">
      <div className="fire-drop-scene">
        <div className="fire-drop-embers">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{ "--f": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="fire-drop-smoke">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ "--s": i } as React.CSSProperties} />
          ))}
        </div>
        <p className="fire-drop-text">
          <span className="fire-drop-3d">{HEADLINE}</span>
        </p>
      </div>
    </div>
  );
}
