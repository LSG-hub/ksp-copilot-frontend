import { viewBox, districts, project } from '../../lib/map';

export function KarnatakaMap({ b }: { b: any }) {
  const points = (b.points || []).map((p: any) => ({ ...p, xy: project(p.lng, p.lat) }));
  const counts = b.district_counts || [];
  const max = Math.max(1, ...counts.map((d: any) => d.count));
  const svg = (
    <svg viewBox={viewBox} role="img" aria-label="Karnataka district map with crime hotspots">
      {districts.map((d, i) => <path key={i} className="region" d={d.d} />)}
      {points.map((p: any, i: number) => (
        <g key={i}>
          <circle className="hsp" cx={p.xy[0]} cy={p.xy[1]} r={3} />
          <circle className="hs" cx={p.xy[0]} cy={p.xy[1]} r={3.5} />
        </g>
      ))}
    </svg>
  );
  return (
    <section className="block">
      <div className="bhead"><span className="t">{b.title || 'Crime locations'}</span><span className="badge">Karnataka</span></div>
      {counts.length > 0 ? (
        <div className="mapgrid">
          <div className="mapbox">{svg}</div>
          <div className="maplist">
            {counts.slice(0, 6).map((d: any, i: number) => (
              <div className="mrow" key={i}>
                <span className="nm">{d.district}</span>
                <span style={{ width: 64 }}><span className="trk" style={{ width: Math.max(6, (d.count / max) * 64) }} /></span>
                <span className="ct">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      ) : <div className="mapbox" style={{ borderRight: 0 }}>{svg}</div>}
    </section>
  );
}
