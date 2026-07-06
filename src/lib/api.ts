import type { Briefing } from './types';
import { SAMPLE_BRIEFING } from './fixtures';

// In dev, vite proxies /server to the live Catalyst function (see vite.config.ts).
// In prod (Slate, same project) the function is reachable at the same origin.
const QUERY_URL = '/server/api/query';

export async function askCopilot(question: string): Promise<Briefing> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 120_000);
  try {
    const res = await fetch(QUERY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = (await res.json()) as Briefing;
    data.narrative = data.narrative || data.answer || '';
    return data;
  } catch (err) {
    // Graceful demo fallback so the console always renders (e.g. before CORS is
    // whitelisted). Clearly flagged so it's never mistaken for live data.
    return { ...SAMPLE_BRIEFING, question, error: `offline demo (${String((err as Error).message)})` };
  } finally {
    clearTimeout(t);
  }
}
