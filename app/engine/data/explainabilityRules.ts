export const explainabilityRules = {
  "algorithm": "explainability",
  "version": "1.0",
  "description": "Adds transparency layer: explains why a number or KPI was generated and what factors influenced it.",
  "rules": [
    {
      "field": "budget_allocation",
      "explanation": "تم توزيع الميزانية بناءً على Benchmarks للصناعة + أهدافك المختارة. على سبيل المثال، E-commerce يميل إلى Meta وTikTok بنسبة أعلى."
    },
    {
      "field": "CPM",
      "explanation": "تكلفة الألف ظهور (CPM) مأخوذة من متوسط السوق السعودي على المنصة المختارة، وتم تعديلها حسب الموسم (Ramadan +20%)."
    },
    {
      "field": "CTR",
      "explanation": "معدل النقر (CTR) مبني على متوسط الصناعة × المنصة × نوع المحتوى (فيديو/ستاتيك)."
    },
    {
      "field": "CPC",
      "explanation": "تكلفة النقرة (CPC) = CPM ÷ CTR × 1000، بعد التعديل الموسمي."
    },
    {
      "field": "Conversions",
      "explanation": "عدد التحويلات محسوب من عدد النقرات × CVR (Conversion Rate) حسب الصناعة."
    },
    {
      "field": "ROAS",
      "explanation": "العائد على الإنفاق (ROAS) = Revenue المتوقع ÷ الإنفاق، باستخدام Benchmarks لكل صناعة."
    }
  ],
  "outputs": {
    "explanations": {
      "per_metric": "string",
      "general_notes": "string"
    }
  },
  "example": {
    "input": {
      "industry": "E-commerce",
      "budget": 100000,
      "platform": "TikTok",
      "season": "Ramadan"
    },
    "output": {
      "CPM": "تم تقديره عند 4.5 ريال بناءً على متوسط TikTok في السعودية، مع تعديل +30% بسبب موسم رمضان",
      "CTR": "1.5% مأخوذ من Benchmarks E-commerce على TikTok",
      "Conversions": "300 Conversion محسوبة من 20,000 نقرة × 1.5% CVR",
      "ROAS": "متوقع 3.2x، لأن متوسط ROAS للـ E-commerce في السعودية ضمن هذا النطاق"
    }
  }
} as const;
