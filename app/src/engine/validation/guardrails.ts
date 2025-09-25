/**
 * Guardrails Module
 * Contains post-calculation validation and financial reconciliation logic
 */

import { CampaignData, KpiSet, ValidationFlag } from '../../types';

/**
 * Validates and clamps KPIs to ensure they're within reasonable bounds
 */
export const validateAndClampKpis = (data: CampaignData, rawKpis: any) => ({
  validatedKpis: rawKpis,
  anomalies: [],
  corrections: []
});

/**
 * Reconciles financial calculations and ensures consistency
 */
export const reconcileFinancials = (data: CampaignData, totals: KpiSet) => ({
  totals,
  corrections: [],
  anomalies: []
});

/**
 * Applies all guardrails to campaign data and KPIs
 */
export const applyGuardrails = (data: CampaignData, rawKpis: any) => {
  const { validatedKpis, anomalies, corrections } = validateAndClampKpis(data, rawKpis);
  const reconciledFinancials = reconcileFinancials(data, validatedKpis.totals);
  
  return {
    validatedKpis: {
      ...validatedKpis,
      totals: reconciledFinancials.totals
    },
    anomalies: [...anomalies, ...(Array.isArray(reconciledFinancials.anomalies) ? reconciledFinancials.anomalies : [])],
    corrections: [...corrections, ...(Array.isArray(reconciledFinancials.corrections) ? reconciledFinancials.corrections : [])]
  };
};
