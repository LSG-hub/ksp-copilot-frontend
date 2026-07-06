import type { Briefing } from './types';

// Offline demo briefing (matches the real /query output for the hero query).
// Used only as a fallback when the live API is unreachable.
export const SAMPLE_BRIEFING: Briefing = {
  question: 'What other crimes and associates is Harish Shetty linked to?',
  narrative:
    'Harish Shetty is a repeat offender linked to 15 cases across 3 districts, operating with a stable crew of 6. His activity centres on vehicle theft, theft, and snatching around Bengaluru and Mysuru.',
  grounded: true,
  blocks: [
    {
      type: 'offender_profile', name: 'Harish Shetty', flags: ['Repeat offender'],
      base: 'Bengaluru Rural', first_seen: '2023-02-21',
      stats: [
        { label: 'Linked cases', value: 15 },
        { label: 'Districts', value: 3 },
        { label: 'Crime types', value: 3 },
      ],
    },
    {
      type: 'fir_documents', cases: [
        { crime_no: '143011003202600001', crime: 'Motor Vehicle Theft', date: '2026-04-04', station: 'Bengaluru Rural PS', district: 'Bengaluru Rural', status: 'Under Investigation', sections: ['BNS 303', 'BNS 112'] },
        { crime_no: '143011003202500001', crime: 'Robbery', date: '2025-02-14', station: 'Bengaluru Urban PS', district: 'Bengaluru Urban', status: 'Charge Sheeted', sections: ['BNS 309'] },
        { crime_no: '143031025202400001', crime: 'Snatching', date: '2024-03-26', station: 'Mysuru City PS', district: 'Mysuru', status: 'Charge Sheeted', sections: ['BNS 304'] },
        { crime_no: '143031026202300003', crime: 'Motor Vehicle Theft', date: '2023-02-21', station: 'Mysuru Rural PS', district: 'Mysuru', status: 'Closed - Undetected', sections: ['IPC 379'] },
      ],
    },
    {
      type: 'timeline', title: 'Offender history', events: [
        { date: '2023-02-21', label: 'Motor Vehicle Theft', crime_no: '143031026202300003' },
        { date: '2024-03-26', label: 'Snatching', crime_no: '143031025202400001' },
        { date: '2025-02-14', label: 'Robbery', crime_no: '143011003202500001', gravity: 'Heinous' },
        { date: '2026-04-04', label: 'Motor Vehicle Theft', crime_no: '143011003202600001' },
      ],
    },
    {
      type: 'map', title: 'Crime locations', points: [
        { lat: 12.97, lng: 77.59, label: 'Robbery', crime_no: '143011003202500001' },
        { lat: 13.15, lng: 77.60, label: 'MV Theft', crime_no: '143011003202600001' },
        { lat: 12.30, lng: 76.64, label: 'Snatching', crime_no: '143031025202400001' },
      ],
    },
    {
      type: 'network_graph', title: 'Harish Shetty — co-offender network',
      nodes: [
        { id: 'Harish Shetty', label: 'Harish Shetty', group: 'target', weight: 11 },
        { id: 'Riyaz Murthy', label: 'Riyaz Murthy', group: 'associate', weight: 11 },
        { id: 'Anil Swamy', label: 'Anil Swamy', group: 'associate', weight: 10 },
        { id: 'Suresh Murthy', label: 'Suresh Murthy', group: 'associate', weight: 7 },
        { id: 'Madhu Kadam', label: 'Madhu Kadam', group: 'associate', weight: 7 },
        { id: 'Srinivas Jain', label: 'Srinivas Jain', group: 'associate', weight: 7 },
        { id: 'Thomas Hebbar', label: 'Thomas Hebbar', group: 'associate', weight: 2 },
      ],
      edges: [
        { source: 'Harish Shetty', target: 'Riyaz Murthy', weight: 11 },
        { source: 'Harish Shetty', target: 'Anil Swamy', weight: 10 },
        { source: 'Harish Shetty', target: 'Suresh Murthy', weight: 7 },
        { source: 'Harish Shetty', target: 'Madhu Kadam', weight: 7 },
        { source: 'Harish Shetty', target: 'Srinivas Jain', weight: 7 },
        { source: 'Harish Shetty', target: 'Thomas Hebbar', weight: 2 },
      ],
    },
  ],
  reasoning_trace: [
    { step: 'query', text: "SELECT CaseMasterID FROM Accused WHERE AccusedName = 'Harish Shetty'", result: '→ 15' },
    { step: 'query', text: 'SELECT CrimeNo, CrimeRegisteredDate, CrimeMinorHeadID FROM CaseMaster WHERE CaseMasterID IN (…15…)', result: '→ 15' },
    { step: 'query', text: 'SELECT AccusedName, CaseMasterID FROM Accused WHERE CaseMasterID IN (…15…)', result: '→ 41' },
    { step: 'grounded', text: 'grounded — 15 source FIRs, 0 fabricated facts' },
  ],
  audit: {
    executed_queries: ['SELECT CaseMasterID FROM Accused WHERE AccusedName = ...'],
    source_fir_ids: ['143011003202600001', '143031025202400001', '143031026202300003'],
  },
};
