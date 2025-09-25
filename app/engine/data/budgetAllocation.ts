export const budgetAllocation = {
  "algorithm": "budget_allocation",
  "version": "1.0",
  "description": "Distributes campaign budget across selected platforms based on industry defaults and goal weights.",
  "inputs": {
    "industry": "string",
    "budget": "number",
    "goals": ["Awareness", "Traffic", "Leads", "Sales", "Engagement"],
    "selectedPlatforms": ["string (optional)"]
  },
  "steps": [
    {
      "step": 1,
      "name": "Load default split",
      "description": "Fetch defaultPlatformSplit from industry benchmarks JSON"
    },
    {
      "step": 2,
      "name": "Apply goal weights",
      "description": "Multiply split values with weights from goalWeights matrix"
    },
    {
      "step": 3,
      "name": "Filter selected platforms",
      "description": "If user specified platforms, filter to those only"
    },
    {
      "step": 4,
      "name": "Normalize",
      "description": "Ensure sum of splits = 100%"
    },
    {
      "step": 5,
      "name": "Allocate budget",
      "description": "Budget per platform = budget × ratio"
    },
    {
      "step": 6,
      "name": "Sanity check",
      "description": "If rounding mismatch, adjust first platform to match total"
    }
  ],
  "outputs": {
    "allocation": {
      "platform": "budget_value_in_ريال"
    },
    "total": "sum must equal input budget"
  },
  "example": {
    "input": {
      "industry": "تجارة إلكترونية",
      "budget": 100000,
      "goals": ["Sales", "Traffic"],
      "selectedPlatforms": ["Meta", "Google Search", "TikTok"]
    },
    "output": {
      "Meta": 40000,
      "Google Search": 35000,
      "TikTok": 25000
    }
  }
} as const;
