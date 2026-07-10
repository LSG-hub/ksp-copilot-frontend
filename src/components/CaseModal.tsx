import { useEffect, useState } from 'react';
import { fetchCase } from '../lib/api';
import { CaseCard } from './blocks/CaseCard';

export function CaseModal({ crimeNo, onClose }: { crimeNo: string; onClose: () => void }) {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    let ok = true;
    setData(null); setErr('');
    fetchCase(crimeNo).then((d) => ok && setData(d)).catch((e) => ok && setErr(String(e.message || e)));
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { ok = false; window.removeEventListener('keydown', onKey); };
  }, [crimeNo]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close case">✕</button>
        {!data && !err && <div className="modal-load">⟳ opening case {crimeNo}…</div>}
        {err && <div className="modal-load">Couldn't open case {crimeNo}. {err}</div>}
        {data && (data.block
          ? <CaseCard b={data.block} />
          : <div className="modal-load">No case found for {crimeNo}.</div>)}
      </div>
    </div>
  );
}
