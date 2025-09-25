export const kpiEstimation = {
  "algorithm": "kpi_estimation",
  "version": "1.0",
  "description": "Estimates campaign KPIs (CPM, CTR, CPC, CVR, ROAS) from benchmarks.",
  "inputs": {
    "industry": "string",
    "platform": "string",
    "budget": "number",
    "goal": "string"
  },
  "steps": [
    {
      "step": 1,
      "name": "Load platform benchmark",
      "description": "Get CPM, CTR, CVR averages for given industry-platform combo"
    },
    {
      "step": 2,
      "name": "Calculate impressions",
      "description": "Impressions = budget / CPM × 1000"
    },
    {
      "step": 3,
      "name": "Calculate clicks",
      "description": "Clicks = Impressions × CTR"
    },
    {
      "step": 4,
      "name": "Calculate conversions",
      "description": "Conversions = Clicks × CVR"
    },
    {
      "step": 5,
      "name": "Estimate ROAS",
      "description": "ROAS = Revenue ÷ Spend (revenue is modeled per industry defaults)"
    }
  ],
  "outputs": {
    "impressions": "number",
    "clicks": "number",
    "conversions": "number",
    "ROAS": "number"
  },
  "example": {
    "input": {
      "industry": "E-commerce",
      "platform": "Meta",
      "budget": 30000,
      "goal": "Sales"
    },
    "output": {
      "impressions": 600000,
      "clicks": 7200,
      "conversions": 360,
      "ROAS": 3.5
    }
  }
} as const;
