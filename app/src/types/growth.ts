// src/types/growth.ts

export type TacticCategory = 'Creative' | 'Budget' | 'Targeting' | 'Retention' | 'Algorithm';
export type TacticImpact = 'High' | 'Medium' | 'Low';
export type TacticDifficulty = 'Easy' | 'Medium' | 'Hard';
export type FunnelStageName = 'Awareness' | 'Engagement' | 'Conversion' | 'Retention' | 'Growth Loop';

/** Represents a single stage in the visual funnel diagram. */
export interface FunnelStage {
  name: FunnelStageName;
  kpi: string; // e.g., "CTR" or "Retention Rate"
  value: number;
  benchmark: number;
  performance: 'above' | 'at' | 'below';
  delta: number; // Percentage change vs. benchmark
  tactic: string; // A micro-tactic summary from the AI
  color: 'indigo' | 'blue' | 'green' | 'teal' | 'purple';
}

/** Represents a single, detailed insider growth tactic. */
export interface GrowthTactic {
  id: string; // Unique identifier, e.g., 'creative-tiktok-hook-rate'
  category: TacticCategory;
  impact: TacticImpact;
  difficulty: TacticDifficulty;
  title: string; // e.g., "Secret Tactic: Boost CTR with Short-Form Story Hooks"
  icon: string; // Key for a react-icons component, e.g., 'FiZap'
  snippet: string; // The short, shareable tip in Saudi Arabic
  details: string; // The detailed playbook explanation
  caseStudy?: string; // An optional example of success
  relatedStage: FunnelStageName;
}

// Reusing ToastNotification from other modules for consistency
export interface ToastNotification {
    id: string;
    message: string;
    type: 'success' | 'error';
}
