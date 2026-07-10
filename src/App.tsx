import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Orb } from './components/Orb';
import { Composer } from './components/Composer';
import { BlockRenderer } from './components/BlockRenderer';
import { AuditTrace } from './components/AuditTrace';
import { CaseModal } from './components/CaseModal';
import { CaseContext } from './lib/caseContext';
import { useTypewriter } from './lib/useTypewriter';
import { askCopilot } from './lib/api';
import type { Briefing } from './lib/types';

const SAMPLES = [
  'What other crimes and associates is Harish Shetty linked to?',
  'Which districts are the biggest crime hotspots?',
  'How has cybercrime changed year over year?',
];

interface Turn { q: string; b: Briefing | null }

export function App() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [caseNo, setCaseNo] = useState<string | null>(null);

  async function ask(q: string) {
    if (!q.trim() || busy) return;
    const idx = turns.length;
    setTurns((t) => [...t, { q, b: null }]);
    setBusy(true);
    const b = await askCopilot(q);
    setTurns((t) => t.map((x, i) => (i === idx ? { ...x, b } : x)));
    setBusy(false);
  }

  return (
    <CaseContext.Provider value={setCaseNo}>
      <TopBar />
      <main className="stage">
        <Orb listening={listening || busy} onToggle={() => setListening((l) => !l)} />
        <p className="hint" style={{ textAlign: 'center' }}>
          {listening ? 'listening…' : <>Say <b>“Chanakya”</b> or type below · English · ಕನ್ನಡ</>}
        </p>
        {turns.length === 0 && (
          <div className="samples">
            {SAMPLES.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}
          </div>
        )}
        <div className="thread">
          {turns.map((t, i) => (
            <div key={i}>
              <div className="turn u"><div className="tag">Investigator</div>{t.q}</div>
              {t.b ? <AiTurn b={t.b} /> : <div className="thinking">⟳ querying the crime database…</div>}
            </div>
          ))}
        </div>
        <div className="foot">Synthetic, NCRB-grounded data · KSP Datathon 2026</div>
      </main>
      <Composer busy={busy} onSend={ask} onMic={() => setListening((l) => !l)} />
      {caseNo && <CaseModal crimeNo={caseNo} onClose={() => setCaseNo(null)} />}
    </CaseContext.Provider>
  );
}

function AiTurn({ b }: { b: Briefing }) {
  const { shown, done } = useTypewriter(b.narrative || '');
  return (
    <div>
      <div className="say">
        <span className="mini" aria-hidden="true" />
        <div><MarkdownLite text={shown} />{!done && <span className="typing-cur" />}</div>
      </div>
      {b.error && <div className="offline">offline demo — showing sample briefing ({b.error})</div>}
      {done && (
        <div className="blocks">
          {(b.blocks || []).map((bl, i) => <BlockRenderer key={i} block={bl} />)}
          {(b.reasoning_trace?.length || b.audit) && (
            <AuditTrace reasoning={b.reasoning_trace} audit={b.audit} grounded={b.grounded} />
          )}
        </div>
      )}
    </div>
  );
}

// Minimal markdown: strips heading/bullet markers, renders **bold** inline.
function MarkdownLite({ text }: { text: string }) {
  const clean = (text || '').replace(/^#{1,6}\s*/gm, '').replace(/^\s*[-*]\s+/gm, '• ');
  const parts = clean.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>,
      )}
    </>
  );
}
