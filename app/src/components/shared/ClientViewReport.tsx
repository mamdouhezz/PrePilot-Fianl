import React from 'react';
import { CampaignReport } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import KPIHighlights from './KPIHighlights';
import BudgetChart from './BudgetChart';
import RecommendationsGrid from './RecommendationsGrid';
import TrustSignals from '../ui/TrustSignals';
import SummaryKpiCard from './SummaryKpiCard';

interface ClientViewReportProps { report: CampaignReport; }

const ClientViewReport: React.FC<ClientViewReportProps> = ({ report }) => {
    const isPrint = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('print').matches;
    
    return (
        <div className="space-y-8">
            <SummaryKpiCard report={report} />

            <Card title="ملخص سريع (لغة العميل)">
                <p className="text-lg text-center text-gray-300 print:text-gray-700">{report.narrative}</p>
            </Card>
            
            <Card title="وش ممكن نتوقع من نتائج؟ (الأرقام الكبيرة)">
                <KPIHighlights kpis={report.kpis.totals as any} printMode={isPrint} />
            </Card>

            <Card title="كيف راح نوزع الميزانية؟">
                <BudgetChart allocation={report.budgetAllocation} totalBudget={report.kpis.totals.budget} />
            </Card>

            <Card title="توصيات سريعة للتنفيذ">
                <RecommendationsGrid recommendations={report.recommendations} />
            </Card>

            <Card title="ليه تثق في PrePilot؟">
                <TrustSignals />
            </Card>
        </div>
    );
};

export default ClientViewReport;