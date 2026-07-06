export function StatCards({ b }: { b: any }) {
  return (
    <section className="block">
      <div className="stats">
        {b.items.map((s: any, i: number) => (
          <div className="stat" key={i}>
            <div className="l">{s.label}</div>
            <div className="v">{s.value}</div>
            {s.hint && <div className="h">{s.hint}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
