import { useOpenCase } from '../../lib/caseContext';

export function CaseTable({ b }: { b: any }) {
  const openCase = useOpenCase();
  return (
    <section className="block">
      <div className="bhead"><span className="t">{b.title || 'Cases'}</span><span className="badge">{b.rows.length}</span></div>
      <div style={{ overflowX: 'auto' }}>
        <table className="tbl">
          <thead><tr>{b.columns.map((c: string) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {b.rows.map((r: any, i: number) => (
              <tr key={i} onClick={() => r.crime_no && openCase(r.crime_no)}>
                <td className="cn">{r.crime_no}</td>
                <td>{r.crime}</td>
                <td>{r.district}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
