# 📊 مخطط معمارية تطبيق PrePilot v3

## 🏗️ المخطط المعماري الرئيسي

```
                    📱 PrePilot v3 Application (App.tsx)
                                │
        ┌───────────────────────┴───────────────────────┐
        │                       │                       │
    pages/ (5)          components/ (60+)          engine/ (25+)
        │                       │                       │
┌───────┴───────┐       ┌───────┴───────┐       ┌───────┴───────┐
│  Playground   │       │   ui/ (15+)   │       │ prepilotEngine│
│  ResultsDash  │       │ report/ (15+) │       │ kpi/          │
│  ExportCenter │       │ results/ (5+) │       │ ai/           │
└───────────────┘       └───────────────┘       └───────────────┘
```

## ⚙️ محرك التطبيق المعياري الجديد (Modular Engine Architecture)

```
                    🎯 engine/index.ts (Public API)
                           │
        ┌──────────────────┼──────────────────────────────┐
        │                  │                              │
    📁 core/           📁 modules/                    📁 validation/
        │                  │                              │
   ┌────┴────┐        ┌────┴────┐                  ┌──────┴──────┐
   │prepilot.│        │ kpiCalc │                  │   rules     │
   │ engine  │        │ budget  │                  │ guardrails  │
   │(orchestrator)│   │competitor│                │ preflight   │
   └─────────┘        └─────────┘                  └─────────────┘
                           │                              │
                           └──────────────┬───────────────┘
                                          │
                                    📁 ai/
                                    ┌────┴────┐
                                    │ prompts │
                                    │generators│
                                    └─────────┘
```

## 🔄 نظام سير العمل (Workflow System) - (Zustand-based)

```
                     🔄 Asynchronous Workflow System
                                │
              ┌─────────────────┴─────────────────┐
              │         🏪 exportStore.ts         │
              │   (Zustand State Management)      │
              └─────────────────┬─────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
    Actions (UI)        State & Logic (Store)     Async Processor
        │                       │                       │
┌───────┴───────┐       ┌───────┴───────┐       ┌───────┴───────┐
│ addToQueue()  │       │ exportQueue[] │       │ processQueue()│
│ retryTask()   │       │ drafts[]      │       │ (setInterval) │
│ publishPost() │       │ published[]   │       │ AI Call       │
└───────────────┘       └───────────────┘       └───────────────┘
                                │
                                ▼
                        UI Components (Real-time updates)
```

## 🧩 هيكل المكونات (Component Hierarchy)

```
                    🎯 App.tsx (State: currentPage)
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
 
   🎨 DashboardLayout                📊 ResultsDashboardPage
        │                                     │ (Receives reportId, nav functions)
┌───────┴───────┐                       ┌───────┴────────┐
│    Header     │                       │ 🎨 ResultsLayout │
│    Sidebar    │                       │     (Layout)     │
└───────────────┘                       └────────┬────────┘
                                                 │
                                ┌────────────────┴────────────────┐
                                │                                 │
                         🔧 ResultsToolbar              📄 Report Sections
                                │                                 │ (e.g., MediaPlan)
                           (Receives onClick          (Receives report data)
                             handlers)
```

## 🔗 تدفق البيانات (Data Flow)

```
1. User Input → PlaygroundPage → onGeneratePlan(data) → App.tsx
                                                         │
                                                         ▼
2. App.tsx → engine.runCampaign(data) → returns CampaignReport
                                                         │
                                                         ▼
3. App.tsx → reportStore.setReport(id, report) → navigateTo('results-dashboard')
                                                         │
                                                         ▼
4. ResultsDashboardPage → reads report from reportStore → Renders Report Components
                                                         │
                                                         ▼
5. Export Button Click → exportStore.addToQueue(task) → UI updates from store state
```

## 🎨 طبقات التطبيق (Application Layers)

```
                    🎨 Presentation Layer (React Components)
                    ┌──────────────────────────────────────────┐
                    │ pages/, components/                      │
                    │ (Handles UI, layout, and user events)    │
                    └──────────────────┬───────────────────────┘
                                       │
                    🏪 State Management Layer (Zustand)
                    ┌──────────────────────────────────────────┐
                    │ stores/ (reportStore, exportStore)       │
                    │ (Central source of truth, async logic)   │
                    └──────────────────┬───────────────────────┘
                                       │
                    ⚙️ Business Logic Layer (Engine & Services)
                    ┌──────────────────────────────────────────┐
                    │ engine/, services/                       │
                    │ (Calculations, AI calls, validations)    │
                    └──────────────────┬───────────────────────┘
                                       │
                    💾 Data Layer (Constants & Types)
                    ┌──────────────────────────────────────────┐
                    │ constants/, types/                       │
                    │ (Static data, benchmarks, TypeScript definitions)│
                    └──────────────────────────────────────────┘
```

---

*تم إنشاء هذا المخطط في: ${new Date().toLocaleDateString('ar-SA')}*
*آخر تحديث: ${new Date().toLocaleString('ar-SA')}*
