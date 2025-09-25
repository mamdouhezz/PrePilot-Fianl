/**
 * PrePilot Engine - Main Entry Point
 * Public API for the modular engine system
 */

// Core Engine Functions
export { runCampaign } from './core/prepilot.engine';

// Validation Functions
export { preflightValidation } from './validation/preflight';

// AI Functions
export { 
  parsePromptWithAI, 
  enhanceBrandDetails, 
  generateBrandBriefFromText,
  generateRealtimeValidationTips,
  generateGreeting 
} from './ai/generators';

// Prediction Engine (bridge export)
export { predictInitialSettings } from '../src/engine/modules/prediction.engine';

// Export types for external use
export type { 
  CampaignReport, 
  ValidationFlag as ValidationResult, 
  KpiSet,
  CampaignData,
  AdvancedInsightsSet,
  BrandContext,
  UIWarning
} from '../types';
