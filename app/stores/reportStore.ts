import { create } from 'zustand';
import { CampaignReport } from '../types';

interface ReportStoreState {
  reports: Record<string, CampaignReport>;
  lastReportId: string | null;
  setReport: (id: string, report: CampaignReport) => void;
  getReportById: (id: string) => CampaignReport | null;
  clear: () => void;
}

export const useReportStore = create<ReportStoreState>((set, get) => ({
  reports: {},
  lastReportId: null,
  setReport: (id: string, report: CampaignReport) => set(state => ({ reports: { ...state.reports, [id]: report }, lastReportId: id })),
  getReportById: (id: string) => get().reports[id] || null,
  clear: () => set({ reports: {}, lastReportId: null })
}));


