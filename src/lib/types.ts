// The briefing-document contract returned by POST /query.
// See docs/FRONTEND_SPEC.md §2–3 for the full schema.

export interface StatItem { label: string; value: string | number; hint?: string }
export interface MapPoint { lat: number; lng: number; label?: string; crime_no?: string; weight?: number }
export interface DistrictCount { district: string; count: number }
export interface GraphNode { id: string; label: string; group?: 'target' | 'associate'; weight?: number }
export interface GraphEdge { source: string; target: string; weight?: number }
export interface FirCase {
  crime_no: string; crime: string; date?: string; station?: string;
  district?: string; status?: string; sections?: string[];
}
export interface TimelineEvent { date?: string; label: string; detail?: string; crime_no?: string; gravity?: string }

export type Block =
  | { type: 'text'; markdown: string }
  | { type: 'stat_cards'; items: StatItem[] }
  | { type: 'offender_profile'; name: string; photo_url?: string; age?: number; gender?: string; base?: string; first_seen?: string; flags?: string[]; stats: StatItem[] }
  | { type: 'fir_documents'; cases: FirCase[] }
  | { type: 'network_graph'; title?: string; nodes: GraphNode[]; edges: GraphEdge[] }
  | { type: 'map'; title?: string; points?: MapPoint[]; district_counts?: DistrictCount[] }
  | { type: 'timeline'; title?: string; events: TimelineEvent[] }
  | { type: 'line_chart'; title?: string; x: (string | number)[]; series: { name: string; data: number[] }[] }
  | { type: 'bar_chart'; title?: string; items: { label: string; value: number }[] }
  | { type: 'donut'; title?: string; items: { label: string; value: number }[] }
  | { type: 'case_table'; title?: string; columns: string[]; rows: Record<string, unknown>[] }
  | { type: 'case_card'; [k: string]: unknown }
  | { type: 'callout'; tone?: 'insight' | 'warning'; text: string }
  | { type: 'audit'; executed_queries: string[]; source_fir_ids: string[] }
  | { type: string; [k: string]: unknown };

export interface ReasoningStep { step: string; text: string; result?: string }

export interface Briefing {
  question: string;
  narrative: string;
  answer?: string;
  blocks: Block[];
  grounded?: boolean;
  reasoning_trace?: ReasoningStep[];
  audit?: { executed_queries: string[]; source_fir_ids: string[] };
  tool_trace?: { tool: string; args: Record<string, unknown> }[];
  error?: string;
}
