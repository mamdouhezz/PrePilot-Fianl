export const campaignContext = {
  "campaignContext": {
    "seasons": [
      "Default",
      "Ramadan",
      "Hajj",
      "BackToSchool",
      "WhiteFriday",
      "Summer"
    ],
    "durations": {
      "short": {
        "label": "قصيرة",
        "range_days": "7-14",
        "note": "مناسبة للتجارب السريعة أو المناسبات القصيرة"
      },
      "medium": {
        "label": "متوسطة",
        "range_days": "15-45",
        "note": "الأكثر شيوعًا لحملات المبيعات أو اكتساب العملاء"
      },
      "long": {
        "label": "طويلة",
        "range_days": "45-90",
        "note": "مناسبة للـ awareness وبناء العلامة"
      }
    },
    "contentFormats": {
      "video": {
        "strength": "أقوى أداء في السعودية (Meta, TikTok, YouTube)",
        "recommendedFor": ["Awareness", "Engagement"]
      },
      "static": {
        "strength": "مناسب لحملات الـ retargeting والعروض",
        "recommendedFor": ["Sales", "Traffic"]
      },
      "UGC": {
        "strength": "يثق فيه المستخدمون أكثر خصوصًا في الـ E-commerce",
        "recommendedFor": ["Conversions", "Engagement"]
      },
      "stories": {
        "strength": "فعالة جدًا على Snapchat وInstagram",
        "recommendedFor": ["Awareness", "Quick Offers"]
      }
    }
  },
  "usage": {
    "algorithms": [
      "seasonality_adjustment.json",
      "kpi_estimation.json",
      "recommendations.json"
    ],
    "reportPlacement": [
      "يظهر في بداية التقرير كـ Context Box",
      "يؤثر على توصيات المحتوى"
    ]
  }
} as const;
