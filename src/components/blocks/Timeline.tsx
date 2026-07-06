export function Timeline({ b }: { b: any }) {
  return (
    <section className="block">
      <div className="bhead"><span className="t">{b.title || 'Timeline'}</span></div>
      <div className="tl">
        {b.events.map((e: any, i: number) => (
          <div className="tevt" key={i}>
            <span className="d">{e.date}</span>
            <span><span className="lab">{e.label}</span>{e.crime_no && <><br /><span className="cn">{e.crime_no}</span></>}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
