export const validationRules = {
  "algorithm": "validation",
  "version": "1.0",
  "description": "Validates user campaign inputs before running allocation, KPI, or seasonality algorithms.",
  "inputs": {
    "industry": "string",
    "budget": "number",
    "goals": ["string"],
    "selectedPlatforms": ["string"],
    "season": "string (optional)"
  },
  "rules": [
    {
      "field": "industry",
      "check": "must exist in industries list",
      "errorMessage": "⚠️ الصناعة غير مدعومة حالياً. اختر صناعة من القائمة."
    },
    {
      "field": "budget",
      "check": "must be >= 5000",
      "errorMessage": "⚠️ الميزانية يجب أن تكون على الأقل 5,000 ريال."
    },
    {
      "field": "goals",
      "check": "at least one goal selected",
      "errorMessage": "⚠️ لازم تختار هدف واحد على الأقل للحملة."
    },
    {
      "field": "selectedPlatforms",
      "check": "platforms must be from supported list",
      "errorMessage": "⚠️ اختر منصات مدعومة فقط (Meta, Google, TikTok, Snapchat, ...)."
    },
    {
      "field": "season",
      "check": "if provided, must exist in seasons list",
      "errorMessage": "⚠️ الموسم غير مدعوم. اختر من القائمة."
    }
  ],
  "outputs": {
    "isValid": "boolean",
    "errors": ["string"]
  },
  "example": {
    "input": {
      "industry": "Healthcare",
      "budget": 500,
      "goals": [],
      "selectedPlatforms": ["UnknownPlatform"],
      "season": "Ramadan"
    },
    "output": {
      "isValid": false,
      "errors": [
        "⚠️ الميزانية يجب أن تكون على الأقل 1000 ريال.",
        "⚠️ لازم تختار هدف واحد على الأقل للحملة.",
        "⚠️ اختر منصات مدعومة فقط (Meta, Google, TikTok, Snapchat, ...)."
      ]
    }
  }
} as const;