// src/types/export.ts

// FIX: Re-export SocialPlatformId so other modules can import it from here
import { SocialPlatformId, KPI, BudgetSplitItem } from '../types';
export type { SocialPlatformId };

export type ExportFormat = 'pdf' | 'png' | 'xls' | 'csv' | 'json';
export type SocialPlatform = 'linkedin' | 'facebook' | 'twitter';
export type TaskFormat = ExportFormat | SocialPlatform;

export type ExportableSection = 
  | 'strategic-summary' 
  | 'kpi-snippets' 
  | 'media-plan' 
  | 'growth-funnel' 
  | 'full-report'
  | 'beyond-kpis'
  | 'beyond-budget'
  | 'advanced-recommendations';

// FIX: Changed TaskStatus from a type to an enum
export enum TaskStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Draft = 'draft',
  Published = 'published',
}
// FIX: Changed TaskPriority from a type to an enum
export enum TaskPriority {
  Urgent = 'urgent',
  High = 'high',
  Normal = 'normal',
  Low = 'low',
}


/** Represents a saved campaign report that can be exported. */
export interface Report {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isPinned?: boolean;
  isArchived?: boolean;
  tags?: string[];
  description: string;
  budget?: number;
  platforms?: SocialPlatformId[];
  kpis?: KPI[];
  budgetSplit?: BudgetSplitItem[];
}

/** Represents a single, asynchronous task in the workflow queue. */
export interface WorkflowTask {
  id: string;
  reportId: string;
  reportTitle: string;
  section: ExportableSection;
  format: TaskFormat;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number; // 0-100
  createdAt: string;
  resultUrl?: string; // Link to the generated file or social post
  error?: string;
  attempts: number;
  maxAttempts: number;
}

export interface ReportExport {
    id: string;
    reportId: string;
    reportTitle: string;
    section: ExportableSection;
    format: SocialPlatform | ExportFormat;
    status: TaskStatus;
    priority: TaskPriority;
    timestamp: string;
    progress: number;
    content: string;
    error?: string;
}
