/**
 * @file index.ts
 * @description Barrel export for all API hooks
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

// Export all campaign plan hooks
export {
  useCampaignPlans,
  useCreateCampaignPlan,
  useUpdateCampaignPlan,
  useDeleteCampaignPlan,
  useCampaignPlan,
} from './useCampaignPlans';

// Export all export history hooks
export {
  useExportHistory,
  useCreateExportRecord,
  useUpdateExportStatus,
  useDeleteExportRecord,
  useExportStats,
  type ExportHistoryItem,
} from './useExportHistory';

// Export all user profile hooks
export {
  useUserProfile,
  useUpdateUserProfile,
  useUpdateUserPreferences,
  useUserPreferences,
  useSubscriptionStatus,
  type UserProfile,
} from './useUserProfile';

// Export all IndexedDB hooks
export {
  useExportHistoryDB,
  useExportStatsDB,
  useCreateExportRecordDB,
  useUpdateExportStatusDB,
  useDeleteExportRecordDB,
  useExportRecordDB,
  useSearchExportHistoryDB,
  useExportHistoryByFormatDB,
  useExportHistoryByStatusDB,
} from './useExportHistoryDB';

export {
  useCampaignPlansDB,
  useCampaignTemplatesDB,
  usePersonalCampaignPlansDB,
  useCampaignPlanDB,
  useCreateCampaignPlanDB,
  useUpdateCampaignPlanDB,
  useDeleteCampaignPlanDB,
  useUpdateLastUsedDB,
  useSearchCampaignPlansDB,
  useMostUsedCampaignPlansDB,
  useRecentCampaignPlansDB,
  useCampaignPlansStatsDB,
} from './useCampaignPlansDB';
