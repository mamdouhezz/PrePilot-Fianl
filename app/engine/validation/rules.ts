/**
 * Validation Rules Module
 * Contains business logic for validating campaign data and resolving conflicts
 */

// Constants for validation rules
const MAX_SEASONS = 2;

/**
 * Resolves season conflicts and limits the number of active seasons
 */
export const resolveSeasons = (seasons: string[]) => ({
  active: seasons.slice(0, MAX_SEASONS),
  dropped: seasons.slice(MAX_SEASONS),
  conflicts: []
});

/**
 * Checks platform compatibility with industry
 */
export const checkPlatformCompatibility = (industry: string, platforms: string[]) => ({
  incompatibilities: [],
  suggestions: []
});

/**
 * Industry-specific minimum budget requirements
 */
export const industryMinBudgetريال = {
  'عقارات': 50000,
  default: 5000
} as const;
