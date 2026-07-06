import type { Block } from '../lib/types';
import { OffenderProfile } from './blocks/OffenderProfile';
import { FirDocuments } from './blocks/FirDocuments';
import { NetworkGraph } from './blocks/NetworkGraph';
import { KarnatakaMap } from './blocks/KarnatakaMap';
import { Timeline } from './blocks/Timeline';
import { StatCards } from './blocks/StatCards';
import { BarChart, LineChart, Donut } from './blocks/Charts';
import { CaseTable } from './blocks/CaseTable';
import { CaseCard } from './blocks/CaseCard';
import { Callout } from './blocks/Callout';

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'offender_profile': return <OffenderProfile b={block as any} />;
    case 'fir_documents': return <FirDocuments b={block as any} />;
    case 'network_graph': return <NetworkGraph b={block as any} />;
    case 'map': return <KarnatakaMap b={block as any} />;
    case 'timeline': return <Timeline b={block as any} />;
    case 'stat_cards': return <StatCards b={block as any} />;
    case 'bar_chart': return <BarChart b={block as any} />;
    case 'line_chart': return <LineChart b={block as any} />;
    case 'donut': return <Donut b={block as any} />;
    case 'case_table': return <CaseTable b={block as any} />;
    case 'case_card': return <CaseCard b={block as any} />;
    case 'callout': return <Callout b={block as any} />;
    default: return null;
  }
}
