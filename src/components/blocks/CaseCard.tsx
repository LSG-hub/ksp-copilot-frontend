export function CaseCard({ b }: { b: any }) {
  return (
    <section className="block">
      <div className="bhead"><span className="t">Case {b.crime_no}</span><span className="badge">{b.status}</span></div>
      <div style={{ padding: '14px 16px', fontSize: 13.5, color: 'var(--sub)', lineHeight: 1.6 }}>
        <div style={{ color: 'var(--text)', fontSize: 15, fontWeight: 500, marginBottom: 6 }}>
          {b.crime_type}{b.district ? ` · ${b.district}` : ''}{b.gravity ? ` · ${b.gravity}` : ''}
        </div>
        {b.brief_facts && <p style={{ marginTop: 0 }}>{b.brief_facts}</p>}
        {b.sections?.length > 0 && <div style={{ fontFamily: 'var(--mono)', fontSize: 11, marginTop: 8 }}>Sections: {b.sections.join(' · ')}</div>}
        {b.accused?.length > 0 && <div style={{ marginTop: 8 }}>Accused: {b.accused.map((a: any) => a.AccusedName || a.name).join(', ')}</div>}
        {b.victims?.length > 0 && <div style={{ marginTop: 4 }}>Victims: {b.victims.map((v: any) => v.VictimName || v.name).join(', ')}</div>}
      </div>
    </section>
  );
}
