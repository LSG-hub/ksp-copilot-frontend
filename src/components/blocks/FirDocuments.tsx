import { useOpenCase } from '../../lib/caseContext';

function stampFor(status: string = ''): [string, string] {
  const s = status.toLowerCase();
  if (s.includes('charge')) return ['cs', 'charge sheeted'];
  if (s.includes('false')) return ['ud', 'false case'];
  if (s.includes('undetected')) return ['ud', 'undetected'];
  if (s.includes('convict')) return ['cs', 'convicted'];
  return ['ui', 'under invn'];
}

export function FirDocuments({ b }: { b: any }) {
  const openCase = useOpenCase();
  return (
    <section className="block">
      <div className="bhead"><span className="t">Prior cases</span><span className="badge">{b.cases.length} FIRs · tap to open</span></div>
      <div className="docs">
        {b.cases.map((c: any, i: number) => {
          const [cls, txt] = stampFor(c.status);
          return (
            <article className="doc" key={i} role="button" tabIndex={0}
              onClick={() => openCase(c.crime_no)}
              onKeyDown={(e) => { if (e.key === 'Enter') openCase(c.crime_no); }}>
              <div className="dh"><span>FIR</span><span>{(c.date || '').slice(0, 4)}</span></div>
              <div className="cn">{c.crime_no}</div>
              <div className="ct">{c.crime}</div>
              <div className="meta">{[c.station || c.district, c.date].filter(Boolean).join(' · ')}</div>
              {c.sections?.length > 0 && <div className="sec">{c.sections.join(' · ')}</div>}
              <span className={'stamp ' + cls}>{txt}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
