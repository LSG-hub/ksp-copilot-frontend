export function BarChart({ b }: { b: any }) {
  const items = b.items || [];
  const max = Math.max(1, ...items.map((x: any) => x.value));
  return (
    <section className="block">
      <div className="bhead"><span className="t">{b.title || 'Breakdown'}</span></div>
      <div className="chart">
        <div className="bars">
          {items.map((x: any, i: number) => (
            <div className="brow" key={i}>
              <span className="bl" title={x.label}>{x.label}</span>
              <span className="bt"><span className="bf" style={{ width: (x.value / max * 100) + '%' }} /></span>
              <span className="bv">{x.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LineChart({ b }: { b: any }) {
  const s: number[] = b.series?.[0]?.data || [];
  const x = b.x || [];
  const max = Math.max(1, ...s);
  const W = 560, H = 190, P = 26;
  const pts = s.map((v, i) => [P + (i / Math.max(1, s.length - 1)) * (W - 2 * P), H - P - (v / max) * (H - 2 * P)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <section className="block">
      <div className="bhead"><span className="t">{b.title || 'Trend'}</span></div>
      <div className="linewrap">
        <svg className="gsvg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Trend line chart">
          <path d={d} fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p[0]} cy={p[1]} r="3.5" fill="var(--cyan)" />
              <text x={p[0]} y={H - 8} textAnchor="middle" style={{ fill: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10 }}>{x[i]}</text>
              <text x={p[0]} y={p[1] - 9} textAnchor="middle" style={{ fill: 'var(--sub)', fontFamily: 'var(--mono)', fontSize: 10 }}>{s[i]}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

// Compact donut fallback — renders the same proportional bars as BarChart.
export function Donut({ b }: { b: any }) {
  return <BarChart b={{ ...b, items: b.items }} />;
}
