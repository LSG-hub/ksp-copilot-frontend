export function TopBar() {
  return (
    <header className="bar">
      <div className="crest" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
          <path d="M9.5 12l1.8 1.8L15 10" />
        </svg>
      </div>
      <div className="word">
        <div className="k">Karnataka State Police · SCRB</div>
        <div className="n">Investigator Copilot</div>
      </div>
      <div className="spacer" />
      <span className="pill wake" title="Voice wake-word: say &quot;Chanakya&quot;">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
        </svg>
        Chanakya
      </span>
      <span className="pill"><span className="dotlive" />Live</span>
      <div className="who" aria-hidden="true">SG</div>
    </header>
  );
}
