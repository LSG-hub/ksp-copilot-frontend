export function OffenderProfile({ b }: { b: any }) {
  return (
    <section className="block">
      <div className="profile">
        <div className="photo">
          {b.photo_url ? <img src={b.photo_url} alt={b.name} /> : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.2-4 5-5.5 7.5-5.5S18.3 16 19.5 20" />
              </svg>
              <span>No photograph on file</span>
            </>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="pname">{b.name}{b.flags?.[0] && <span className="flag">{b.flags[0]}</span>}</div>
          <div className="pmeta">
            {b.age && <span>Est. age <b>~{b.age}</b></span>}
            {b.gender && <span>Gender <b>{b.gender}</b></span>}
            {b.base && <span>Base <b>{b.base}</b></span>}
            {b.first_seen && <span>First seen <b>{b.first_seen}</b></span>}
          </div>
          <div className="pchips">
            {(b.stats || []).map((s: any, i: number) => (
              <span className="pchip" key={i}>{s.label} <b>{s.value}</b></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
