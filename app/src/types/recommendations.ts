// src/types/recommendations.ts

export type RecommendationCategory = 'Creative' | 'Targeting' | 'Budget' | 'Channel' | 'Risk';
export type RecommendationImpact = 'High' | 'Medium' | 'Low';

/** Represents the complete, structured data for a single technical recommendation. */
export interface TechnicalRecommendation {
  id: string; // Unique identifier (e.g., 'ctr-tiktok-low')
  category: RecommendationCategory;
  impact: RecommendationImpact;
  title: string; // Short, descriptive title (e.g., "Low CTR on TikTok")
  icon: string; // A string key for a react-icons component (e.g., 'FiVideo')
  snippet: string; // The short, simple recommendation in Saudi Arabic (for Basic view)
  details: string; // The detailed, technical reasoning (for Advanced view)
  relatedPlatforms: string[]; // e.g., ['tiktok', 'meta']
  priority: number; // A score from 1-10 for sorting
}

// Reusing ToastNotification from other modules for consistency
export interface ToastNotification {
    id: string;
    message: string;
    type: 'success' | 'error';
}
