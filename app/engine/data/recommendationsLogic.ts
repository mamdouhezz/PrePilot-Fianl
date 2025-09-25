export const recommendationsLogic = {
  "algorithm": "recommendations",
  "version": "1.0",
  "description": "Suggests extra platforms, budget shifts, or strategy tips based on input data.",
  "inputs": {
    "industry": "string",
    "budget": "number",
    "goals": ["string"],
    "selectedPlatforms": ["string"]
  },
  "rules": [
    {
      "if": "industry = B2B && budget > 20000",
      "then": "Suggest LinkedIn"
    },
    {
      "if": "goal includes Awareness && not includes TikTok",
      "then": "Suggest TikTok for reach"
    },
    {
      "if": "budget < 10000",
      "then": "Suggest focusing on only 1-2 platforms"
    }
  ],
  "outputs": {
    "recommendations": ["string"]
  },
  "example": {
    "input": {
      "industry": "B2B",
      "budget": 30000,
      "goals": ["Leads"],
      "selectedPlatforms": ["Google Search", "Meta"]
    },
    "output": {
      "recommendations": [
        "فكر تستخدم LinkedIn لأنه فعال جدًا مع الـ B2B",
        "حافظ على وجودك في Google Search لأنه مباشر لجلب leads"
      ]
    }
  }
} as const;
