import { create } from 'zustand';
import { CampaignReport } from '../types';

interface ReportStoreState {
  reports: Record<string, CampaignReport>;
  lastReportId: string | null;
  setReport: (id: string, report: CampaignReport) => void;
  getReportById: (id: string) => CampaignReport | null;
  clear: () => void;
  initializeMockReport: () => void;
}

export const useReportStore = create<ReportStoreState>((set, get) => ({
  reports: {},
  lastReportId: null,
  setReport: (id: string, report: CampaignReport) => set(state => ({ reports: { ...state.reports, [id]: report }, lastReportId: id })),
  getReportById: (id: string) => get().reports[id] || null,
  clear: () => set({ reports: {}, lastReportId: null }),
  // Add mock report for testing
  initializeMockReport: () => {
    const mockReport: CampaignReport = {
      industry: 'تجارة إلكترونية',
      narrative: 'تقرير تجريبي لاختبار عرض النتائج',
      kpis: {
        totals: {
          budget: 100000,
          impressions: 500000,
          clicks: 10000,
          ctr: 2.0,
          cpc: 10,
          conversions: 500,
          cvr: 5.0,
          revenue: 50000,
          roas: 0.5,
          arpu: 100,
          cac: 200,
          cpa: 200,
          breakEvenRoas: 1.0
        },
        perPlatform: {
          meta: {
            budget: 50000,
            impressions: 250000,
            clicks: 5000,
            ctr: 2.0,
            cpc: 10,
            conversions: 250,
            cvr: 5.0,
            revenue: 25000,
            roas: 0.5,
            cac: 200
          },
          google_ads: {
            budget: 30000,
            impressions: 150000,
            clicks: 3000,
            ctr: 2.0,
            cpc: 10,
            conversions: 150,
            cvr: 5.0,
            revenue: 15000,
            roas: 0.5,
            cac: 200
          },
          youtube: {
            budget: 20000,
            impressions: 100000,
            clicks: 2000,
            ctr: 2.0,
            cpc: 10,
            conversions: 100,
            cvr: 5.0,
            revenue: 10000,
            roas: 0.5,
            cac: 200
          }
        }
      },
      budgetAllocation: {
        meta: 50000,
        google_ads: 30000,
        youtube: 20000
      },
      recommendations: [
        'ركز على منصة ميتا لتحقيق أفضل عائد على الإنفاق',
        'استخدم المحتوى المرئي لجذب انتباه الجمهور المستهدف',
        'حسن من معدل التحويل عبر تحسين تجربة المستخدم'
      ],
      explainability: {
        'توزيع الميزانية': 'تم توزيع الميزانية بناءً على أداء المنصات السابقة',
        'تقدير العائد (ROAS)': 'العائد المتوقع 0.5 بناءً على متوسط الصناعة',
        'تكلفة اكتساب العميل (CAC)': 'التكلفة 200 ريال لكل عميل جديد'
      },
      confidence: 0.85
    };
    
    const mockId = 'mock-report-1';
    set(state => ({ 
      reports: { ...state.reports, [mockId]: mockReport }, 
      lastReportId: mockId 
    }));
  }
}));


