import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Report, WorkflowTask, TaskStatus, TaskPriority, ExportableSection, TaskFormat, SocialPlatform, ReportExport } from '../types/export';
import { generateAiSocialPost } from '../services/geminiService';

const MAX_CONCURRENT_TASKS = 2;

interface ExportStoreState {
  reports: Report[];
  exportQueue: WorkflowTask[];
  publishingDrafts: ReportExport[];
  publishedPosts: ReportExport[];
  exportHistory: Array<{
    id: string;
    reportId: string;
    reportTitle: string;
    section: string;
    format: string;
    filename: string;
    downloadedAt: string;
    fileSize?: number;
  }>;
  initializeMockReports: () => void;
  getReportById: (id: string) => Report | undefined;
  togglePinReport: (reportId: string) => void;
  archiveReport: (reportId: string) => void;
  addReportFromResults: (reportData: any) => string;
  addToExportHistory: (exportData: any) => void;
  clearOldTasks: () => void;
  // Queue Management
  addToQueue: (taskOptions: Omit<WorkflowTask, 'id' | 'status' | 'progress' | 'createdAt' | 'attempts' | 'maxAttempts'>, priority?: TaskPriority) => string;
  processQueue: () => void;
  updateTask: (taskId: string, updates: Partial<WorkflowTask>) => void;
  retryTask: (taskId: string) => void;
  cancelTask: (taskId: string) => void;
  // Publishing Hub
  generateSocialPost: (draftId: string | null, reportId: string, section: ExportableSection, platform: SocialPlatform) => Promise<void>;
  publishPost: (draftId: string) => void;
}

export const useExportStore = create<ExportStoreState>()(
  persist(
    (set, get) => ({
      reports: [],
      exportQueue: [],
      publishingDrafts: [],
      publishedPosts: [],
      exportHistory: [],

      initializeMockReports: () => {
        if (get().reports.length > 0) return;
        const mockReports: Report[] = [
          {
            id: 'report-1',
            title: 'خطة تسويق لمتجر تجارة إلكترونية - الربع الرابع 2024',
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            updatedAt: new Date().toISOString(),
            isPinned: true,
            isArchived: false,
            tags: ['تجارة إلكترونية', 'موسم الأعياد'],
            description: 'خطة شاملة تستهدف زيادة المبيعات خلال موسم نهاية العام.',
            budget: 150000,
            platforms: ['meta', 'x'],
          },
          {
            id: 'report-2',
            title: 'حملة إطلاق تطبيق عقاري جديد',
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
            isPinned: false,
            isArchived: false,
            tags: ['عقارات', 'إطلاق منتج'],
            description: 'حملة تركز على الوعي بالعلامة التجارية وزيادة عدد التنزيلات.',
            budget: 250000,
            platforms: ['linkedin'],
          },
        ];
        set({ reports: mockReports });
      },

      getReportById: (id) => get().reports.find(r => r.id === id),

      togglePinReport: (reportId: string) => {
        set((state) => ({
          reports: state.reports.map(r => 
            r.id === reportId ? { ...r, isPinned: !r.isPinned } : r
          ).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }));
      },

      archiveReport: (reportId: string) => {
        set((state) => ({
          reports: state.reports.map(r => 
            r.id === reportId ? { ...r, isArchived: true } : r
          )
        }));
      },

      addReportFromResults: (reportData: any) => {
        const newReport: Report = {
          id: uuidv4(),
          title: reportData.narrative || reportData.title || 'تقرير جديد',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPinned: false,
          isArchived: false,
          tags: [reportData.industry || 'عام'],
          description: reportData.narrative?.substring(0, 100) || 'تقرير مولد من النتائج',
          budget: reportData.kpis?.totals?.budget || 0,
          platforms: Object.keys(reportData.budgetAllocation || {}),
        };
        
        set((state) => ({
          reports: [newReport, ...state.reports]
        }));
        
        return newReport.id;
      },

      addToExportHistory: (exportData: any) => {
        const historyEntry = {
          id: uuidv4(),
          reportId: exportData.reportId,
          reportTitle: exportData.reportTitle,
          section: exportData.section,
          format: exportData.format,
          filename: exportData.filename,
          downloadedAt: new Date().toISOString(),
          fileSize: exportData.fileSize,
        };
        
        set((state) => ({
          exportHistory: [historyEntry, ...state.exportHistory].slice(0, 100) // Keep last 100 exports
        }));
      },

      clearOldTasks: () => {
        set((state) => ({
          exportQueue: state.exportQueue.filter(task => 
            task.status === 'pending' || 
            task.status === 'processing' || 
            task.status === 'failed' ||
            (task.status === 'completed' && new Date(task.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)) // Keep completed tasks from last 24 hours
          )
        }));
      },
      
      addToQueue: (taskOptions, priority = TaskPriority.Normal) => {
        const newTask: WorkflowTask = {
          ...taskOptions,
          id: uuidv4(),
          status: TaskStatus.Pending,
          priority,
          progress: 0,
          createdAt: new Date().toISOString(),
          attempts: 0,
          maxAttempts: 3,
        };
        set((state) => ({ exportQueue: [...state.exportQueue, newTask] }));
        setTimeout(() => get().processQueue(), 100); 
        return newTask.id;
      },
      
      updateTask: (taskId, updates) => {
        set((state) => ({
          exportQueue: state.exportQueue.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        }));
      },

      processQueue: async () => {
        const state = get();
        const processingTasks = state.exportQueue.filter(t => t.status === TaskStatus.Processing).length;
        if (processingTasks >= MAX_CONCURRENT_TASKS) return;

        const pendingTasks = state.exportQueue
          .filter(t => t.status === TaskStatus.Pending)
          .sort((a, b) => {
            const priorityOrder = { [TaskPriority.Urgent]: 0, [TaskPriority.High]: 1, [TaskPriority.Normal]: 2, [TaskPriority.Low]: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
        
        const taskToProcess = pendingTasks[0];

        if (taskToProcess) {
          state.updateTask(taskToProcess.id, { status: TaskStatus.Processing, progress: 10, attempts: taskToProcess.attempts + 1 });
          
          try {
            // Import and call the actual export function
            const { exportSection } = await import('../services/export/exportManager');
            
            // Create a mock report object for export
            const mockReport = {
              industry: 'تجارة إلكترونية',
              narrative: taskToProcess.reportTitle,
              kpis: {
                totals: {
                  budget: 100000,
                  impressions: 500000,
                  clicks: 10000,
                  ctr: 2.0,
                  cpc: 10,
                  conversions: 500,
                  cvr: 5.0,
                  revenue: 50000,
                  roas: 0.5,
                  arpu: 100,
                  cac: 20,
                  cpa: 20,
                  breakEvenRoas: 1.0,
                },
                perPlatform: {}
              },
              budgetAllocation: {
                meta: 50000,
                google_ads: 30000,
                youtube: 20000
              },
              recommendations: ['توصية 1', 'توصية 2', 'توصية 3']
            };

            // Update progress
            state.updateTask(taskToProcess.id, { progress: 30 });
            
            // Call actual export function
            const result = await exportSection({
              section: taskToProcess.section,
              format: taskToProcess.format,
              report: mockReport as any,
              includeTimestamp: true,
            });

            state.updateTask(taskToProcess.id, { progress: 80 });

            if (result.success) {
              const filename = result.filename || `export-${taskToProcess.id}.${taskToProcess.format}`;
              
              // Add to export history
              state.addToExportHistory({
                reportId: taskToProcess.reportId,
                reportTitle: taskToProcess.reportTitle,
                section: taskToProcess.section,
                format: taskToProcess.format,
                filename: filename,
              });
              
              state.updateTask(taskToProcess.id, { 
                status: TaskStatus.Completed, 
                progress: 100, 
                resultUrl: filename,
                resultMessage: result.message
              });
            } else {
              state.updateTask(taskToProcess.id, { 
                status: TaskStatus.Failed, 
                progress: 0, 
                error: result.message || 'فشل التصدير'
              });
            }
          } catch (error) {
            state.updateTask(taskToProcess.id, { 
              status: TaskStatus.Failed, 
              progress: 0, 
              error: error instanceof Error ? error.message : 'خطأ غير معروف'
            });
          }
          
          // Process next task
          setTimeout(() => get().processQueue(), 1000);
        }
      },
      
      retryTask: (taskId) => {
        const task = get().exportQueue.find(t => t.id === taskId);
        if (task && task.status === TaskStatus.Failed && task.attempts < task.maxAttempts) {
            get().updateTask(taskId, { status: TaskStatus.Pending, progress: 0, error: undefined });
            setTimeout(() => get().processQueue(), 100);
        }
      },

      cancelTask: (taskId) => {
         const task = get().exportQueue.find(t => t.id === taskId);
         if (task && (task.status === TaskStatus.Pending || task.status === TaskStatus.Processing)) {
            get().updateTask(taskId, { status: TaskStatus.Cancelled, progress: 0 });
         }
      },
      
      generateSocialPost: async (draftId, reportId, section, platform) => {
          const report = get().getReportById(reportId);
          if (!report) return;

          let currentDraftId = draftId;
          const loadingContent = 'الذكاء الاصطناعي يبدع الآن...';

          if (!currentDraftId) {
             const newDraft: ReportExport = {
                id: uuidv4(),
                reportId,
                reportTitle: report.title,
                section,
                format: platform,
                status: TaskStatus.Processing,
                priority: TaskPriority.Normal,
                timestamp: new Date().toISOString(),
                progress: 0,
                content: loadingContent,
             };
             set(state => ({ publishingDrafts: [newDraft, ...state.publishingDrafts] }));
             currentDraftId = newDraft.id;
          } else {
             set(state => ({
                 publishingDrafts: state.publishingDrafts.map(d => 
                     d.id === currentDraftId 
                     ? { ...d, status: TaskStatus.Processing, content: loadingContent, error: undefined } 
                     : d
                 )
             }));
          }

          try {
              const generatedContent = await generateAiSocialPost({
                  platform,
                  reportTitle: report.title,
                  section,
              });
              set(state => ({
                  publishingDrafts: state.publishingDrafts.map(d =>
                      d.id === currentDraftId
                          ? { ...d, content: generatedContent, status: TaskStatus.Draft }
                          : d
                  ),
              }));
          } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
              set(state => ({
                  publishingDrafts: state.publishingDrafts.map(d =>
                      d.id === currentDraftId
                          ? { ...d, status: TaskStatus.Failed, error: errorMessage }
                          : d
                  ),
              }));
          }
      },
      
      publishPost: (draftId: string) => {
        set(state => {
            const draftToPublish = state.publishingDrafts.find(d => d.id === draftId);
            if (!draftToPublish) return state;

            const publishedPost: ReportExport = {
                ...draftToPublish,
                status: TaskStatus.Published,
                timestamp: new Date().toISOString(),
            };

            return {
                publishingDrafts: state.publishingDrafts.filter(d => d.id !== draftId),
                publishedPosts: [publishedPost, ...state.publishedPosts]
            }
        });
      },
    }),
    {
      name: 'prepilot-export-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);