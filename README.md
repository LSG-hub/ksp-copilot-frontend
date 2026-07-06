<div align="center">

# 🛡️ KSP Investigator Copilot — Frontend

**A voice-first, generative-UI intelligence console for the Karnataka State Police.**
Datathon 2026 · Challenge 1

`React 18` · `TypeScript` · `Vite` · `Catalyst Slate`

</div>

---

## The idea

Not a chat box. The investigator asks a question — by voice (*"Hey Jarvis…"*) or text — and the AI
answers with a **living intelligence briefing**: a short narrative plus rich, inline blocks the model
assembles on the fly — an offender profile, prior cases as FIR **documents**, a co-offender **network
graph**, a real **Karnataka hotspot map**, trend charts — every fact backed by the exact query that
produced it (the live **reasoning trace & audit**).

The backend returns a **briefing document** (`{ narrative, blocks[], reasoning_trace, audit }`); this
app renders each typed block with a dedicated component. **Block data is always real query output** —
so the cinematic console is also zero-hallucination and fully auditable.

## What it looks like
Hybrid cinematic-dark + official: ink-navy ground, KSP-gold identity, data-cyan for the AI/network, a
breathing voice **orb**, and parchment FIR document cards. See the design spec in
[`docs/FRONTEND_SPEC.md`](docs/FRONTEND_SPEC.md).

## Architecture

```
App ─ TopBar · Orb · Thread ─ Turn ─ AiTurn
                                     ├─ narrative (MarkdownLite)
                                     ├─ BlockRenderer ─ switch(block.type)
                                     │    OffenderProfile · FirDocuments · NetworkGraph
                                     │    KarnatakaMap · Timeline · StatCards · Charts
                                     │    CaseTable · CaseCard · Callout
                                     └─ AuditTrace (reasoning trace + source FIRs)
             Composer (text + mic)
```

| Path | Responsibility |
|---|---|
| `src/lib/types.ts` | The briefing-document + block schema (typed). |
| `src/lib/api.ts` | `askCopilot(question)` → `POST /server/api/query` (graceful offline demo fallback). |
| `src/lib/map.ts` + `src/assets/karnataka.json` | Bundled 30-district Karnataka geometry + point projection (no external tiles). |
| `src/components/` | Shell — `TopBar`, `Orb`, `Composer`, `BlockRenderer`, `AuditTrace`. |
| `src/components/blocks/` | One component per block type — fully modular. |
| `src/theme.css` | The design system (palette, orb, cards, graph/map styling). |

## Run it

```bash
npm install
npm run dev      # http://localhost:5173  (vite proxies /server → live Catalyst backend, no CORS)
npm run build    # production bundle → dist/
```

The dev server proxies `/server/*` to the live Catalyst function, so you get **real grounded
briefings** locally. Try: *"What other crimes and associates is Harish Shetty linked to?"*

## Deploy (Catalyst Slate)
Build and deploy `dist/` to Slate in the same `KSP-Crime-DB` project. Whitelist the Slate origin in
`CloudScale → Authentication → Whitelisting` so browser calls to `/query` are allowed.

## Roadmap
- [x] Console shell, orb, inline chat, `BlockRenderer` + all v1 blocks
- [x] Live-wired to the grounded `/query` briefing document
- [ ] Voice: tap-to-talk (Web Speech API) → then "Hey Jarvis" wake-word (Porcupine)
- [ ] Kannada round-trip via Catalyst Zia (STT → translate → LLM → translate → TTS)
- [ ] Case-dossier slide-over, richer charts, PDF export
- [ ] Deploy to Slate

## License
MIT
