// src/types/beyond-budget.ts
import { IconType } from 'react-icons';

// FIX: Define and export CampaignContext interface.
/** Represents the context of the campaign for generating reasoning. */
export interface CampaignContext {
  industry: string;
  budget: number;
  goals: string[];
  funnelStage: string;
  platforms: string[];
  targetAudience: {
    age: string[];
    gender: string;
    locations: string[];
  };
}

/** Represents the complete data packet for a single platform's budget reasoning. */
export interface BudgetReasoning {
  platform: string; // e.g., "Google Ads"
  icon: IconType; // The platform's icon component
  color: string; // Tailwind CSS color class for the icon background
  budget: number; // The allocated budget in Saudi Riyal (ريال)
  percentage: number; // The percentage of the total budget
  explanation: string; // The AI-generated reasoning
}

// Reusing ToastNotification from beyond-kpis for consistency
export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error';
}
