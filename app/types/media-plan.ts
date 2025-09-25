import { KpiSet, SocialPlatformId } from '../types';
import { IconType } from 'react-icons';

/** Defines the configuration for a single column in the table. */
export interface ColumnConfig {
  key: keyof KpiSet | 'platform' | 'budget' | 'percentage';
  label: string;
  type: 'text' | 'currency' | 'percentage' | 'roas' | 'number' | 'platform';
  sortable: boolean;
  isAdvanced?: boolean; // Flag to show/hide in basic view
}

/** Represents the complete, calculated data for a single row (platform). */
export interface PlatformKPIs {
  platform: SocialPlatformId;
  name: string;
  icon: IconType;
  color: string;
  budget: number;
  percentage: number;
  kpis: KpiSet; // The full set of calculated KPIs for this platform
}
