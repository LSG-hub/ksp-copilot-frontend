import type { ReasoningStep } from '../lib/types';

export function AuditTrace({ reasoning, audit, grounded }: {
  reasoning?: ReasoningStep[];
  audit?: { executed_queries: string[]; source_fir_ids: string[] };
  grounded?: boolean;
}) {
  const firs = audit?.source_fir_ids || [];
  const shown = firs.slice(0, 5);
  const lines = reasoning?.length
    ? reasoning
    : (audit?.executed_queries || []).map((q) => ({ step: 'query', text: q }));
  return (
    <section className="block trace">
      <div className="bhead">
        <span className="t">Reasoning trace &amp; audit</span>
        <span className="badge">{grounded ? 'grounded' : ''} · {firs.length} source FIRs</span>
      </div>
      <div className="tbody">
        {lines.map((l, i) => (
          <div className="ln" key={i}>
            <span className={'mk' + (l.step === 'grounded' ? ' ok' : '')}>{l.step === 'grounded' ? '✓' : '⟳'}</span>
            <span className="q">{l.text}</span>
            {l.result && <span className="r">{l.result}</span>}
          </div>
        ))}
      </div>
      {shown.length > 0 && (
        <div className="audit">
          {shown.map((f) => <span className="fir" key={f}>{f}</span>)}
          {firs.length > shown.length && <span className="fir">+{firs.length - shown.length} more</span>}
        </div>
      )}
    </section>
  );
}
