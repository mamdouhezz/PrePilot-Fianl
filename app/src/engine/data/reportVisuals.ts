export const reportVisuals = {
  "algorithm": "report_visuals",
  "version": "1.0",
  "description": "Defines visualization layer for campaign reports: charts, graphs, tables, and highlights.",
  "charts": [
    {
      "type": "bar",
      "title": "توزيع الميزانية على المنصات",
      "x_axis": "Platforms",
      "y_axis": "Budget %",
      "explanation": "يوضح النسبة المخصصة لكل منصة مختارة."
    },
    {
      "type": "line",
      "title": "تكلفة الظهور (CPM) عبر المنصات",
      "x_axis": "Platforms",
      "y_axis": "CPM (ريال)",
      "explanation": "يعرض كيف تتغير تكلفة الألف ظهور من منصة لمنصة."
    },
    {
      "type": "line",
      "title": "CTR & CPC Trends",
      "x_axis": "Platforms",
      "y_axis": "CTR % / CPC (ريال)",
      "dual_axis": true,
      "explanation": "يبين العلاقة بين معدل النقر (CTR) وتكلفة النقرة (CPC) حسب المنصة."
    },
    {
      "type": "pie",
      "title": "توزيع الأهداف",
      "slices": "Objective %",
      "explanation": "يعكس توزيع الميزانية بين الأهداف (Leads, Awareness, Views...)."
    },
    {
      "type": "funnel",
      "title": "رحلة التحويل",
      "stages": ["Impressions", "Clicks", "Leads", "Conversions"],
      "explanation": "يبين كيف ينخفض العدد عبر كل مرحلة من مراحل الفانيل."
    },
    {
      "type": "kpi_cards",
      "title": "أهم النتائج",
      "metrics": ["CPM", "CTR", "CPC", "Conversions", "ROAS"],
      "explanation": "بطاقات KPIs سريعة تبين أهم الأرقام."
    }
  ],
  "visual_highlights": {
    "best_platform": "منصة الأداء الأعلى تعرض بلون مميز",
    "worst_platform": "المنصة الأقل كفاءة تظهر بتحذير خفيف",
    "benchmarks_line": "يظهر خط Benchmarks لمقارنة النتائج الفعلية مع المتوسط السوقي"
  },
  "example": {
    "input": {
      "budget": 100000,
      "platforms": ["Meta", "TikTok", "Snapchat"],
      "objectives": ["Leads", "Awareness"]
    },
    "output": {
      "charts": [
        "Bar chart يوضح Meta 50% - TikTok 30% - Snapchat 20%",
        "Line chart للـ CPM (Meta: 6.5 ريال, TikTok: 4.5 ريال, Snapchat: 5.2 ريال)",
        "Funnel من 10M Impressions → 150k Clicks → 3k Leads → 900 Conversions",
        "KPI Cards تبين ROAS المتوقع = 3.5x"
      ]
    }
  }
} as const;
