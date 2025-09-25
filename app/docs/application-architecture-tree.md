# 🌳 شجرة معمارية تطبيق PrePilot v3

## 📊 نظرة عامة
هذا الملف يحتوي على شجرة شاملة ومحدثة لمعمارية تطبيق PrePilot v3 وعلاقات المكونات ببعضها البعض، مما يعكس الحالة الحالية للتطبيق بدقة.

---

## 🏗️ الهيكل الأساسي للتطبيق

```
prepilot-v3/
├── 📁 app/                          # المجلد الرئيسي للتطبيق
│   ├── 🎯 App.tsx                   # نقطة الدخول الرئيسية للتطبيق ومنسق الصفحات
│   ├── 📄 index.tsx                 # نقطة التحميل الأساسية لـ React
│   │
│   ├── 📁 pages/                    # صفحات التطبيق الرئيسية (5 صفحات)
│   │   ├── 🏠 HomePage.tsx          # الصفحة الرئيسية والترحيبية
│   │   ├── 🎮 PlaygroundPage.tsx    # صفحة إنشاء وتعديل الحملات
│   │   ├── ⏳ ProcessingPage.tsx    # شاشة الانتظار أثناء معالجة الحملة
│   │   ├── 📊 ResultsDashboardPage.tsx # لوحة عرض النتائج والتقارير
│   │   └── 📤 ExportCenterPage.tsx  # مركز التصدير والنشر
│   │
│   ├── 📁 components/               # مكونات React القابلة لإعادة الاستخدام (20+ مكون رئيسي)
│   │   ├── 📁 ui/                   # مكونات واجهة المستخدم الأساسية (15+ مكون)
│   │   │   ├── 🎨 Button.tsx, Card.tsx, Icon.tsx, Tabs.tsx, etc.
│   │   ├── 📁 layout/               # مكونات التخطيط العام (3 مكونات)
│   │   │   ├── 🎨 DashboardLayout.tsx, Header.tsx, Sidebar.tsx
│   │   ├── 📁 results/               # مكونات خاصة بلوحة عرض النتائج (5 مكونات)
│   │   │   ├── 🎨 ResultsLayout.tsx, ResultsSidebar.tsx, ResultsToolbar.tsx, etc.
│   │   ├── 📁 report/               # مكونات عرض أقسام التقرير (15+ مكون)
│   │   │   ├── 📋 StrategicSummary.tsx, MediaPlan.tsx, KPISnippets.tsx, etc.
│   │   ├── 📁 export/               # مكونات مركز التصدير (4 مكونات)
│   │   │   ├── 📋 ReportList.tsx, PublishingHub.tsx, WorkflowQueuePanel.tsx, etc.
│   │   └── 📁 chat/                 # مكونات المحادثة مع الذكاء الاصطناعي
│   │       └── 🤖 Chatbot.tsx
│   │
│   ├── 📁 engine/                   # محرك التطبيق المعياري الجديد
│   │   ├── 🎯 index.ts              # نقطة الدخول العامة للمحرك
│   │   ├── 📁 core/                 # المحرك الأساسي
│   │   │   └── 🎯 prepilot.engine.ts # المنسق الرئيسي (runCampaign)
│   │   ├── 📁 modules/              # الوحدات المتخصصة
│   │   │   ├── 📊 kpiCalculator.ts  # حساب مؤشرات الأداء
│   │   │   ├── 💰 budgetAllocator.ts # توزيع الميزانية
│   │   │   └── 🏢 competitorAnalysis.ts # تحليل المنافسين
│   │   ├── 📁 validation/           # طبقة التحقق
│   │   │   ├── 📋 rules.ts          # قواعد التحقق الأساسية
│   │   │   ├── 🛡️ guardrails.ts     # حواجز التحقق المتقدمة
│   │   │   └── ✈️ preflight.ts      # التحقق المسبق
│   │   ├── 📁 ai/                   # وحدات الذكاء الاصطناعي المعيارية
│   │   │   ├── 📝 prompts.ts        # بناء النصوص
│   │   │   ├── 🤖 generators.ts     # مولدات المحتوى
│   │   │   └── 🧠 summaryGenerator.ts # مولد الملخصات (قديم)
│   │   ├── 📁 benchmarks/           # وحدات مقارنة الأداء
│   │   │   └── 📈 compareWithMarket.ts
│   │   ├── 📁 beyondBudget/         # منطق شرح الميزانية ومشاركته
│   │   │   ├── 💡 generateReasoning.ts, shareUtils.ts
│   │   ├── 📁 beyondKPIs/           # منطق شرح المؤشرات ومشاركته
│   │   │   ├── 💡 generateExplanation.ts, shareUtils.ts
│   │   ├── 📁 data/                 # البيانات المرجعية الثابتة
│   │   │   ├── 📊 *.ts (15+ ملف بيانات)
│   │   ├── 📁 explainability/       # وحدات شرح النتائج
│   │   │   ├── 💡 generateExplanation.ts, generateReasoning.ts, etc.
│   │   ├── 📁 growth/               # منطق قمع النمو وتكتيكاته
│   │   │   ├── 📈 funnelMath.ts, generateGrowthTactics.ts, etc.
│   │   ├── 📁 kpi/                  # منطق حساب وعرض المؤشرات (قديم)
│   │   │   └── 📊 kpiCalculator.ts
│   │   ├── 📁 mediaPlan/            # منطق الخطة الإعلامية
│   │   │   └── 📋 mediaPlanLogic.ts
│   │   └── 📁 recommendations/      # منطق توليد التوصيات
│   │       ├── 💡 generateRecommendations.ts, shareUtils.ts
│   │
│   ├── <h4>This folder is empty.</h4>
│   │
│   ├── 📁 services/                 # الخدمات المركزية
│   │   ├── 🤖 aiClient.ts           # إعداد عميل Gemini
│   │   ├── 🤖 geminiService.ts      # وظائف مساعدة للتفاعل مع Gemini
│   │   ├── ⚙️ runtimeConfig.ts      # إدارة متغيرات البيئة
│   │   └── 📁 export/               # وحدات التصدير حسب الصيغة
│   │       ├── 📄 exportManager.ts, exportToXLS.ts, etc. (6 ملفات)
│   │
│   ├── 📁 stores/                   # إدارة الحالة (Zustand)
│   │   ├── 🏪 reportStore.ts        # متجر بيانات التقرير الحالي
│   │   └── 🏪 exportStore.ts        # متجر التقارير المحفوظة وسير العمل
│   │
│   ├── 📁 types/                    # تعريفات TypeScript
│   │   ├── 📊 types.ts, export.ts, etc. (6 ملفات)
│   │
│   └── 📁 constants/                # الثوابت
│       ├── 📋 constants.ts          # الثوابت الرئيسية (منصات، صناعات، إلخ)
│       └── 📋 engagingMessages.ts   # رسائل شاشة المعالجة
│
├── 📄 package.json                  # تبعيات المشروع
├── 📄 tsconfig.json                 # إعدادات TypeScript
├── 📄 index.html                    # الصفحة الرئيسية HTML
└── 📁 node_modules/                 # التبعيات المثبتة
```

---

## 🔗 العلاقات والتدفق

### 1. **التدفق الرئيسي للتطبيق**
`App.tsx` يعمل كمنسق رئيسي، حيث يعرض الصفحات بناءً على الحالة الحالية (`currentPage`).
```
HomePage → PlaygroundPage → onGeneratePlan() in App.tsx → ProcessingPage → ResultsDashboardPage
```
- **`App.tsx`** يستدعي **`engine.runCampaign()`** (من النقطة الجديدة `engine/index.ts`) ويتعامل مع الحالة بين الصفحات.

### 2. **محرك التطبيق المعياري الجديد (Modular Engine)**
- **`core/prepilot.engine.ts`** هو المنسق الرئيسي الجديد الذي يدير سير العمل المعياري.
- **`modules/`** يحتوي على الوحدات المتخصصة: `kpiCalculator`, `budgetAllocator`, `competitorAnalysis`.
- **`validation/`** طبقة التحقق المعيارية: `rules`, `guardrails`, `preflight`.
- **`ai/`** وحدات الذكاء الاصطناعي المعيارية: `prompts`, `generators`.
- **`index.ts`** نقطة الدخول العامة التي تصدر الواجهة البرمجية النظيفة.

### 3. **نظام التصدير والنشر**
- **لم يعد نظامًا منفصلاً** بملفات `queueManager` و`statusTracker`. تم دمجه بالكامل في **`exportStore.ts`**.
- **`ExportCenterPage`** و**`ResultsDashboardPage`** تتفاعل مع `exportStore` لإضافة مهام إلى قائمة الانتظار.
- **`exportStore`** يدير قائمة الانتظار، ويعالج المهام بشكل غير متزامن باستخدام `setInterval`، ويحدث الحالة التي تراقبها مكونات الواجهة.

### 4. **مكونات التقارير**
- **`ResultsDashboardPage.tsx`** يستقبل `reportId`، يجلب التقرير الكامل من `reportStore`، ويمرره إلى مكونات العرض الفرعية مثل `StrategicSummary`, `MediaPlan`, إلخ.

---

## 🎯 أنواع الملفات والوظائف

- **📱 الصفحات (Pages)**: نقاط الدخول الرئيسية للتطبيق (`HomePage`, `ResultsDashboardPage`).
- **🧩 المكونات (Components)**: عناصر واجهة المستخدم القابلة لإعادة الاستخدام (`Button`, `Card`, `MediaPlan`).
- **⚙️ المحرك (Engine)**: منطق العمل الأساسي (`prepilotEngine`, `kpiCalculator`).
- **🔧 الخدمات (Services)**: وظائف مساعدة ومركزية (`aiClient`, `exportManager`).
- **📊 الأنواع (Types)**: تعريفات TypeScript للبيانات (`CampaignData`, `CampaignReport`).
- **🏪 المتاجر (Stores)**: إدارة الحالة العامة باستخدام Zustand (`reportStore`, `exportStore`).

---

## 📈 إحصائيات المشروع المحدثة

- **📁 إجمالي المجلدات**: ~30 مجلد
- **📄 إجمالي الملفات**: ~150 ملف TypeScript/TSX
- **🧩 المكونات**: ~60 مكون React
- **⚙️ الوحدات**: ~25 وحدة منطق
- **🧪 الاختبارات**: 2 ملفات اختبار
- **📊 الأنواع**: 6 ملفات تعريف

---

*تم إنشاء هذه الشجرة في: ${new Date().toLocaleDateString('ar-SA')}*
*آخر تحديث: ${new Date().toLocaleString('ar-SA')}*
