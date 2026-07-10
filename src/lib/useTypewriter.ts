import { useEffect, useRef, useState } from 'react';

// Reveals `text` at ~cps characters/second (snappy). Animates once per distinct
// string; re-renders with the same text don't restart it.
export function useTypewriter(text: string, cps = 110): { shown: string; done: boolean } {
  const [n, setN] = useState(0);
  const prev = useRef('');
  useEffect(() => {
    prev.current = text;
    setN(0);
    if (!text) return;
    let raf = 0;
    let start: number | undefined;
    const tick = (t: number) => {
      if (start === undefined) start = t;
      const chars = Math.floor(((t - start) / 1000) * cps);
      setN(Math.min(text.length, chars));
      if (chars < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, cps]);
  return { shown: text.slice(0, n), done: n >= text.length };
}
