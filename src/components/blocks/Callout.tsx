export function Callout({ b }: { b: any }) {
  return (
    <section className="block">
      <div className="callout">
        <span className="ic" style={{ color: b.tone === 'warning' ? 'var(--amber)' : 'var(--cyan)' }} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
        </span>
        <span>{b.text}</span>
      </div>
    </section>
  );
}
