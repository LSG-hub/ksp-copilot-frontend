export function NetworkGraph({ b }: { b: any }) {
  const W = 600, H = 340, cx = 300, cy = 170, R = 135;
  const target = b.nodes.find((n: any) => n.group === 'target') || b.nodes[0];
  const assoc = b.nodes.filter((n: any) => n !== target);
  const maxW = Math.max(1, ...assoc.map((a: any) => a.weight || 1));
  const pos: Record<string, [number, number]> = { [target.id]: [cx, cy] };
  assoc.forEach((a: any, i: number) => {
    const ang = (-90 + i * (360 / Math.max(1, assoc.length))) * Math.PI / 180;
    pos[a.id] = [cx + R * Math.cos(ang), cy + R * Math.sin(ang)];
  });
  return (
    <section className="block">
      <div className="bhead"><span className="t">{b.title || 'Co-offender network'}</span><span className="badge">shared cases</span></div>
      <svg className="gsvg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Co-offender network graph">
        {b.edges.map((e: any, i: number) => {
          const s = pos[e.source], t = pos[e.target];
          if (!s || !t) return null;
          return <path key={i} className="edge" style={{ strokeWidth: 1.5 + (e.weight || 1) / maxW * 5 }} d={`M${s[0]} ${s[1]} L${t[0]} ${t[1]}`} />;
        })}
        {assoc.map((a: any, i: number) => {
          const [x, y] = pos[a.id]; const r = 11 + (a.weight || 1) / maxW * 10;
          return (
            <g key={i}>
              <circle className="node-a" cx={x} cy={y} r={r} />
              <text className="nsub" x={x} y={y + 4} textAnchor="middle">{a.weight}</text>
              <text className="nlabel" x={x} y={y + r + 15} textAnchor="middle">{a.label}</text>
            </g>
          );
        })}
        <circle className="node-t" cx={cx} cy={cy} r={32} />
        <text className="nlabel" x={cx} y={cy - 1} textAnchor="middle" style={{ fontSize: 12 }}>{target.label}</text>
        <text className="nsub" x={cx} y={cy + 14} textAnchor="middle" style={{ fill: 'var(--gold)' }}>{target.weight}</text>
      </svg>
    </section>
  );
}
