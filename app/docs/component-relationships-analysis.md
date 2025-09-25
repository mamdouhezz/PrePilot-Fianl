# 🔍 تحليل علاقات مكونات تطبيق PrePilot v3

## 📋 نظرة عامة على التحليل

تم إجراء فحص شامل وعميق لجميع مكونات التطبيق وعلاقاتها ببعضها البعض. هذا التحليل يوضح كيفية تفاعل المكونات المختلفة وتدفق البيانات بينها، مع تحديثات لتعكس البنية الحالية للتطبيق.

---

## 🎯 نقاط الدخول الرئيسية

### **1. `App.tsx` - المنسق الرئيسي للتطبيق**
`App.tsx` هو المكون الجذري الذي يدير حالة التنقل بين الصفحات الرئيسية ويحتفظ بحالة التقرير الأخير الذي تم إنشاؤه.

```typescript
// app/App.tsx - الاستيرادات والعلاقات الرئيسية
import PlaygroundPage from './pages/PlaygroundPage.tsx';
import ResultsDashboardPage from './pages/ResultsDashboardPage.tsx';
import ExportCenterPage from './pages/ExportCenterPage.tsx';
import { useReportStore } from './stores/reportStore.ts';
import { useExportStore } from './stores/exportStore.ts';
import { runCampaign } from './engine/prepilotEngine.ts';

// ...

const handleGeneratePlan = async (formData: CampaignData) => {
  navigateTo('processing');
  const report = await runCampaign(formData);
  // ...
  useReportStore.getState().setReport(id, report as CampaignReport);
  setLatestReportId(id);
  navigateTo('results-dashboard');
};
```

**العلاقات:**
- **يدير**: حالة التنقل بين جميع الصفحات (`HomePage`, `PlaygroundPage`, `ProcessingPage`, `ResultsDashboardPage`, `ExportCenterPage`).
- **يستدعي**: `prepilotEngine.runCampaign()` عند تقديم نموذج `PlaygroundPage`.
- **يستخدم**: `reportStore` لتخزين نتيجة الحملة و `exportStore` لتهيئة المهام.
- **يمرر الخصائص (Props)**: يمرر دوال التنقل (`onNewPlan`, `onNavigateToExportCenter`) إلى `ResultsDashboardPage`.

---

## ⚙️ محرك التطبيق (Engine Layer)

### **1. المحرك المعياري الجديد - `engine/`**
المحرك الجديد مقسم إلى وحدات متخصصة مع نقطة دخول نظيفة.

```typescript
// app/engine/index.ts - نقطة الدخول العامة
export { runCampaign } from './core/prepilot.engine';
export { preflightValidation } from './validation/preflight';
export { parsePromptWithAI, enhanceBrandDetails } from './ai/generators';

// app/engine/core/prepilot.engine.ts - المنسق الرئيسي
import { allocateBudget } from '../modules/budgetAllocator';
import { calculateKpisForBudgetAllocation } from '../modules/kpiCalculator';
import { applyGuardrails } from '../validation/guardrails';
import { generateAIContent } from '../ai/generators';
```

**العلاقات الجديدة:**
- **`engine/index.ts`**: نقطة الدخول العامة التي تصدر واجهة برمجية نظيفة.
- **`engine/core/prepilot.engine.ts`**: المنسق الرئيسي الذي يدير سير العمل المعياري.
- **`engine/modules/`**: وحدات متخصصة للحسابات والتحليل.
- **`engine/validation/`**: طبقة تحقق معيارية مع قواعد واضحة.
- **`engine/ai/`**: وحدات الذكاء الاصطناعي المعيارية.
- **لا يعتمد على**: أي مكونات واجهة مستخدم أو صفحات (Unidirectional Dependency).

---

## 📱 طبقة الصفحات (Pages Layer)

### **1. `ResultsDashboardPage.tsx` - لوحة عرض النتائج**
هذه الصفحة هي المسؤولة عن عرض التقرير الكامل وتنسيق مكوناته الفرعية.

```typescript
// app/pages/ResultsDashboardPage.tsx
import { useReportStore } from '../stores/reportStore';
import ResultsLayout from '../components/results/ResultsLayout';
import { StrategicSummary, MediaPlan, ... } from '../components/report';

// ...
<ResultsLayout 
  onNewPlan={onNewPlan}
  onSave={handleSavePlan}
  onOpen={onNavigateToExportCenter}
  onExportCenter={onNavigateToExportCenter}
  activeSection={activeSection}
  onItemClick={handleNavClick}
>
  <SectionAnchor id="strategic-summary">
      <StrategicSummary report={report} />
  </SectionAnchor>
  {/* ... more sections ... */}
</ResultsLayout>
```

**العلاقات:**
- **يقرأ**: بيانات التقرير من `reportStore` باستخدام `reportId`.
- **يستخدم**: `ResultsLayout` كهيكل أساسي للصفحة.
- **يمرر الخصائص**: يمرر دوال التحكم (`onNewPlan`, etc.) إلى `ResultsLayout`.
- **ينسق**: عرض جميع مكونات التقرير الفرعية (`StrategicSummary`, `MediaPlan`, etc.).
- **يدير**: منطق "Scroll-Spy" و "Smooth Scroll" للتنقل عبر الشريط الجانبي.

### **2. `ExportCenterPage.tsx` - مركز التصدير والنشر**
هذه الصفحة هي الواجهة الرئيسية لإدارة جميع عمليات التصدير والنشر.

```typescript
// app/pages/ExportCenterPage.tsx
import { Tabs, TabsContent, ... } from '../components/ui/Tabs';
import ReportList from '../components/export/ReportList';
import PublishingHub from '../components/export/PublishingHub';
import WorkflowQueuePanel from '../components/export/WorkflowQueuePanel';
import { useExportStore } from '../stores/exportStore';
```

**العلاقات:**
- **يستخدم**: نظام التبويبات (`Tabs`) لعرض الأقسام المختلفة.
- **يعرض**: مكونات متخصصة مثل `ReportList` و `PublishingHub`.
- **يعتمد على**: `exportStore` لجلب بيانات التقارير وقائمة المهام والمسودات.

---

## 🔄 نظام سير العمل (Zustand-based Workflow System)

### **1. `exportStore.ts` - مركز العمليات غير المتزامنة**
هذا المتجر هو البديل المعماري الجديد للملفات المنفصلة `queueManager` و `statusTracker`. إنه يدير حالة جميع التقارير المحفوظة والمهام غير المتزامنة.

```typescript
// app/stores/exportStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateAiSocialPost } from '../services/geminiService';

// ...
export const useExportStore = create<ExportStoreState>()(
  persist(
    (set, get) => ({
      reports: [],
      exportQueue: [],
      // ... state ...

      addToQueue: (taskOptions) => { /* ... */ },
      processQueue: () => { /* ... (uses setInterval for async simulation) ... */ },
      generateSocialPost: async (...) => { /* ... (calls geminiService) ... */ },
      // ... more actions ...
    }),
    { name: 'prepilot-export-store' }
  )
);
```

**العلاقات:**
- **يدير**: حالة `reports`, `exportQueue`, `publishingDrafts`, `publishedPosts`.
- **ينفذ**: منطق قائمة الانتظار (`processQueue`) بشكل غير متزامن.
- **يستدعي**: خدمات الذكاء الاصطناعي (`geminiService`) لتوليد المحتوى.
- **يستخدم**: `persist` middleware للحفظ في `localStorage`.
- **يعتبر**: المصدر الوحيد للحقيقة (Single Source of Truth) لجميع عمليات التصدير والنشر.

---

## 📈 إحصائيات العلاقات المحدثة

### **أكثر المكونات استخداماً:**
1.  **`Button.tsx`**: +20 استخدام
2.  **`Card.tsx`**: +15 استخدام
3.  **`Icon.tsx`**: +25 استخدام
4.  **`Tooltip.tsx`**: +5 استخدام

### **أكثر الخدمات والوظائف استيراداً:**
1.  **`engine/index.ts`**: (من `App.tsx`, `PlaygroundPage.tsx`, `Chatbot.tsx`, `usePlaygroundForm.ts`)
2.  **`geminiService.ts`**: (من `exportStore.ts`, `beyondKPIs`, `beyondBudget`)
3.  **`exportManager.ts`**: (من `ResultsDashboardPage` عبر `ExportToolbar`)
4.  **`PLATFORM_INFO` from `constants.ts`**: مستخدم في جميع أنحاء التطبيق تقريبًا.

### **أكثر الأنواع استخداماً:**
1.  **`CampaignReport`**: +10 ملفات
2.  **`CampaignData`**: +8 ملفات
3.  **`KpiSet`**: +8 ملفات
4.  **`WorkflowTask`, `ReportExport`**: +5 ملفات

---

## 🎯 الخلاصة
المعمارية الحالية تتبع بصرامة قاعدة التبعية أحادية الاتجاه (Unidirectional Dependency).
- **الصفحات** تعتمد على **المكونات** و**المتاجر** و**المحرك**.
- **المكونات** تعتمد على **المكونات الفرعية** و**المتاجر** و**الخدمات**.
- **المتاجر** و**المحرك** و**الخدمات** تعتمد فقط على **الأنواع** و**الثوابت**.
- تم تبسيط نظام سير العمل بشكل كبير بدمجه في `exportStore`، مما يقلل من تعقيد الكود ويزيل احتمالية التبعيات الدائرية التي كانت موجودة في التصاميم السابقة.

*تم إنشاء هذا التحليل في: ${new Date().toLocaleDateString('ar-SA')}*
*آخر تحديث: ${new Date().toLocaleString('ar-SA')}*
