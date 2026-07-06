import { useState } from 'react';

export function Composer({ busy, onSend, onMic }: { busy: boolean; onSend: (q: string) => void; onMic: () => void }) {
  const [v, setV] = useState('');
  function submit() { const q = v.trim(); if (!q) return; setV(''); onSend(q); }
  return (
    <div className="composer">
      <button className="btn mic" onClick={onMic} aria-label="Voice input">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
        </svg>
      </button>
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        placeholder="Ask about a case, offender, network, or trend…"
        aria-label="Ask the Copilot"
      />
      <button className="btn" onClick={submit} disabled={busy} aria-label="Send">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 12l16-8-6 8 6 8-16-8z" />
        </svg>
      </button>
    </div>
  );
}
