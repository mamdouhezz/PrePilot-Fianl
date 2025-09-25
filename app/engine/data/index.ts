/**
 * Central Data Layer - Single Source of Truth
 * This is the main barrel file for all engine data imports
 * 
 * All engine modules should import from this file to ensure consistency
 * and avoid data duplication across the application.
 */

// Benchmark data exports
export { platformBenchmarks, type PlatformBenchmarks, type PlatformKey } from './benchmarks/platformBenchmarks';
export { industryBenchmarks, type IndustryBenchmarks, type IndustryKey } from './benchmarks/industryBenchmarks';
export { seasonalBenchmarks, type SeasonalBenchmarks, type SeasonKey } from './benchmarks/seasonalBenchmarks';
export { validationBenchmarks, type ValidationBenchmarks } from './benchmarks/validationBenchmarks';

// Modifier data exports
export { creativeModifiers, type CreativeModifiers } from './modifiers/creativeModifiers';
export { competitionModifiers, type CompetitionModifiers } from './modifiers/competitionModifiers';
export { targetingModifiers, type TargetingModifiers } from './modifiers/targetingModifiers';
export { demographicPerformance } from './modifiers/demographicPerformance';
export { locationPerformance } from './modifiers/locationPerformance';
export { devicePerformance } from './modifiers/devicePerformance';

// Allocation data exports
export { industrySplits, type IndustrySplits } from './allocation/industrySplits';
export { goalWeights, type GoalWeights } from './allocation/goalWeights';

// Re-export all data types for convenience
export type {
  PlatformBenchmarks,
  PlatformKey,
  IndustryBenchmarks,
  IndustryKey,
  SeasonalBenchmarks,
  SeasonKey,
  ValidationBenchmarks,
  CreativeModifiers,
  CompetitionModifiers,
  TargetingModifiers,
  IndustrySplits,
  GoalWeights
} from './benchmarks/platformBenchmarks';

// Utility types for data access
export type DataAccessor<T> = {
  get: (key: string) => T | undefined;
  getAll: () => Record<string, T>;
  keys: () => string[];
  has: (key: string) => boolean;
};

// Helper function to create data accessors
export const createDataAccessor = <T extends Record<string, any>>(data: T): DataAccessor<T[keyof T]> => ({
  get: (key: string) => data[key as keyof T],
  getAll: () => data,
  keys: () => Object.keys(data),
  has: (key: string) => key in data
});

// Version information for data layer
export const DATA_LAYER_VERSION = '2.0.0';
export const LAST_UPDATED = '2024-01-15';

// Data layer metadata
export const dataLayerMetadata = {
  version: DATA_LAYER_VERSION,
  lastUpdated: LAST_UPDATED,
  description: 'Centralized data layer for PrePilot engine',
  modules: {
    benchmarks: ['platformBenchmarks', 'industryBenchmarks', 'seasonalBenchmarks', 'validationBenchmarks'],
    modifiers: ['creativeModifiers', 'competitionModifiers', 'targetingModifiers', 'demographicPerformance', 'locationPerformance', 'devicePerformance'],
    allocation: ['industrySplits', 'goalWeights']
  },
  totalDataPoints: {
    platforms: 8,
    industries: 15,
    seasons: 12,
    creativeTypes: 12,
    competitionLevels: 4,
    targetingCategories: 8
  }
} as const;
