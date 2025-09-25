import { CampaignReport } from '../../types';

export type ExportFormat = "pdf" | "png" | "xls" | "csv" | "json";

export type ExportableSection = 
  | "strategic-summary"
  | "kpi-snippets" 
  | "media-plan"
  | "growth-funnel"
  | "full-report"
  | "beyond-kpis"
  | "beyond-budget"
  | "advanced-recommendations";

export interface ExportOptions {
  section: ExportableSection;
  format: ExportFormat;
  report: CampaignReport;
  element?: HTMLElement;
  filename?: string;
  includeWatermark?: boolean;
  includeTimestamp?: boolean;
}

export interface ExportResult {
  success: boolean;
  message: string;
  data?: any;
  filename?: string;
  url?: string;
}

export const SECTION_EXPORT_FORMATS: Record<ExportableSection, ExportFormat[]> = {
  "strategic-summary": ["pdf", "png", "json"],
  "kpi-snippets": ["png", "json"],
  "media-plan": ["xls", "csv", "pdf", "json"],
  "growth-funnel": ["png", "pdf", "json"],
  "full-report": ["pdf", "json"],
  "beyond-kpis": ["pdf", "json"],
  "beyond-budget": ["pdf", "json"],
  "advanced-recommendations": ["pdf", "json"],
};
