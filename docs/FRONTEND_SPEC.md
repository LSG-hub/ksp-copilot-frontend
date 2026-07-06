# Frontend spec — KSP Investigator Copilot (generative-UI console)

The frontend is **generative UI**: the AI doesn't return plain text, it returns a **briefing document**
= narrative + an ordered list of typed **blocks**. The React app renders each block with a rich
component. Visual data is ALWAYS bound from real query results (never invented by the LLM) — so the
cinematic experience is also zero-hallucination and fully auditable.

**Approved mockup (v2, voice concept):** https://claude.ai/code/artifact/0a6a633f-5f48-401f-8d78-3a7bebafec64
(Palette, orb, inline layout, FIR-document cards, real KA map, audit trace all shown there — build to match.)

---

## 1. Locked design decisions
- **Aesthetic:** hybrid — cinematic dark + official polish. Palette: ink-navy `#0A101E`, panels
  `#111A2C`; steel-blue neutrals (`#E7ECF6` / `#9AA8C2` / `#64728E`); **KSP gold** `#D9A441` (identity +
  the "target" node, used sparingly); **data-cyan** `#48C7DF` (network/live/AI); parchment `#F1EADB` for
  FIR document cards; semantic green/amber/red for case status only. NOT neon/acid — restrained, authoritative.
- **Type:** letter-spaced serif for the official wordmark; system sans for UI; **monospace for CrimeNos +
  the live query trace** (the ops-room tell).
- **Layout:** INLINE chat is the hero (full-width thread, ~940px). Blocks render inside the AI's answer.
  A voice **orb** sits at the top as the presence. No separate dashboard/canvas — chat is never sidelined.
- **Voice:** a living orb (breathing glow + gold KSP ring + reactive waveform), **"Hey Jarvis" wake-word**.
  Ship **tap-to-talk (Web Speech API)** first; true wake-word (Porcupine-style) later. Kannada STT/TTS/
  translate runs on **Catalyst Zia** server-side; browser only captures audio. Bilingual EN/ಕನ್ನಡ.
- **Map:** real Karnataka district GeoJSON (30 districts) rendered as SVG/D3 — self-contained, no external
  tiles. Source used in mockup: `github.com/udit-001/india-maps-data` `geojson/states/karnataka.geojson`;
  hotspot centroids computed (Bengaluru Urban, Mysuru). Bundle the GeoJSON in the repo.

## 2. The response document contract (`POST /query` returns)
```jsonc
{
  "question": "…",
  "narrative": "markdown answer text",
  "blocks": [ { "type": "...", /* typed payload */ }, ... ],
  "grounded": true,
  "audit": { "executed_queries": ["SELECT ..."], "source_fir_ids": ["143..."] },
  "tool_trace": [ { "tool": "co_offenders", "args": {...} } ],
  "reasoning_trace": [ { "step":"query", "text":"SELECT ...", "result":"→ 15 rows" }, ... ]  // for the live console strip
}
```

## 3. Block vocabulary (v1)
Each block is `{ type, ...fields }`. Renderer switches on `type`. Blocks may carry `sources` (CrimeNos)
for click-through and a `title`.

| type | payload (shape) | rendered as |
|---|---|---|
| `text` | `{ markdown }` | narrative prose |
| `stat_cards` | `{ items:[{label,value,hint?}] }` | KPI tile row |
| `offender_profile` | `{ name, photo_url?, age?, gender?, base?, first_seen?, flags:[], stats:[{label,value}] }` | profile card w/ **photo slot** (empty → "No photograph on file") |
| `fir_documents` | `{ cases:[{crime_no, crime, date, station, district, sections:[], status}] }` | **parchment FIR cards**, horizontal scroll, status stamp |
| `network_graph` | `{ nodes:[{id,label,group,weight}], edges:[{source,target,weight}] }` | force-directed graph; `group:"target"` = gold node |
| `map` | `{ points:[{lat,lng,label,weight,crime_no?}], focus?, district_counts?:[{district,count}] }` | real KA SVG map + hotspot list |
| `timeline` | `{ events:[{date,label,detail?,crime_no,gravity?}] }` | offender history rail |
| `line_chart` | `{ title, x:[], series:[{name,data:[]}] }` | trends (e.g. cyber by year) |
| `bar_chart` | `{ title, items:[{label,value}] }` | comparisons (crime types, districts) |
| `donut` | `{ items:[{label,value}] }` | distributions (case status) |
| `case_table` | `{ columns:[], rows:[{...,crime_no}] }` | tabular case list |
| `case_card` | full dossier `{ crime_no, crime, gravity, status, district, station, location, brief_facts, victims:[], accused:[], sections:[] }` | expanded FIR |
| `callout` | `{ tone:"insight|warning", text }` | AI insight/alert |
| `audit` | `{ executed_queries:[], source_fir_ids:[] }` | trust panel |

Future blocks: `risk_score` (predictive), `arrest_status`/court tracker.

## 4. How the backend produces blocks (planned change)
Grounding rule holds: **block data = tool output**, never LLM-fabricated. Approach:
- Each tool in `lib/tools.js` returns (already) `{result, queries, firIds}`; ADD a `blocks` field mapping
  its result to one or more blocks:
  - `offender_cases` → `offender_profile` + `fir_documents` + `timeline` + `map`(points)
  - `co_offenders` → `network_graph`
  - `hotspots` → `map`(district_counts) + `bar_chart`
  - `crime_stats(year)` → `line_chart`; `(crime_type/district)` → `bar_chart`; `(status)` → `donut`
  - `case_details` → `case_card`
  - `list_cases` → `case_table` (+ `map`)
  - `search_offenders` → `stat_cards`/table
- `lib/agent.js` collects blocks from executed tools (in call order), prepends the LLM `narrative`, appends
  `audit`. Optionally a light final LLM pass sets ordering/"hero" spotlight (data stays bound; LLM only
  picks layout/titles). Also emit `reasoning_trace` from the tool loop for the live console strip.

## 5. Frontend tech + structure (`frontend/`, new)
- **Vite + React** (TypeScript). Deploy to **Catalyst Slate** (same KSP-Crime-DB project). CORS: whitelist
  the Slate origin in CloudScale → Auth → Whitelisting, or `/query` calls fail.
- Libraries (Slate hosting allows CDNs/npm bundling, unlike Artifacts): a graph lib (react-force-graph /
  cytoscape / d3-force), D3 for the KA map, a chart lib (Recharts/Chart.js). Bundle the KA GeoJSON.
- Components:
  - `<Console>` shell — top command bar (crest, wordmark, "Hey Jarvis", Live), thread, composer.
  - `<Orb>` — CSS/Canvas animated voice orb; states idle/listening; waveform; wake-word hook.
  - `<Thread>` / `<Turn>` — inline chat; user + AI turns.
  - `<BlockRenderer>` — switch on `block.type` → component below.
  - `<StatCards> <OffenderProfile> <FirDocuments> <NetworkGraph> <KarnatakaMap> <Timeline> <TrendChart>
    <BarChart> <Donut> <CaseTable> <CaseCard> <Callout> <ReasoningTrace> <AuditPanel>`
  - `<Composer>` — text input + mic (Web Speech API) + send.
- State: call `POST /query`; render `narrative` then map `blocks[]`; animate blocks in; show
  `reasoning_trace` live in the console strip.
- Auth/RBAC: Catalyst Authentication (light for prototype); role chip shown in bar.

## 6. Build order
1. Backend: add `blocks` to each tool + assemble in agent + return document (+`reasoning_trace`). Redeploy, verify `/query` returns blocks.
2. Frontend: `catalyst init` client (or standalone Vite) linked to KSP-Crime-DB; build `<Console>` + `<BlockRenderer>` + core blocks (profile, fir_documents, network_graph, map, audit) against live `/query`.
3. Polish: orb + tap-to-talk voice; charts/timeline; FIR-document styling; animations; deploy to Slate.
4. Voice/Kannada (Zia), PDF export (SmartBrowz), then deck + demo video.

## 7. Verified reference data (for wiring/tests)
Hero offender **Harish Shetty** → 15 cases (Theft/MV-Theft/Snatching), network: Riyaz Murthy 11, Anil
Swamy 10, Suresh Murthy 7, Madhu Kadam 7, Srinivas Jain 7, Thomas Hebbar 2; districts Bengaluru
Urban/Rural + Mysuru. Hotspots: Bengaluru Urban ~554 total cases (dominant). Cyber trend 2022→2026:
34→57→63→84→100. (Regenerating data re-rolls exact names — check `output/manifest.json` `hero`.)
