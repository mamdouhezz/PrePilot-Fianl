/** Represents the complete data packet for a single KPI explanation. */
export interface KPIExplanation {
  kpiName: string; // e.g., "العائد على الإنفاق (ROAS)"
  kpiValue: string; // Formatted value, e.g., "3.5x"
  explanation: string; // The AI-generated explanation
  formula?: string; // Optional mathematical formula, e.g., "(Revenue / Budget)"
  context: {
    industry: string;
    budget: number;
    funnelStage: 'awareness' | 'consideration' | 'conversion';
  };
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error';
}
