export const sanityChecks = {
  "tests": [
    {
      "name": "Real Estate - Awareness Campaign",
      "input": {
        "industry": "عقارات",
        "goal": "Awareness",
        "platforms": ["Meta", "Snapchat"]
      },
      "expected_ranges": {
        "ctr": { "min": 0.8, "max": 1.5 },
        "cpm": { "min": 6, "max": 12 },
        "cpc": { "min": 1, "max": 5 },
        "cvr": { "min": 0.5, "max": 2.0 },
        "roas": { "min": 1, "max": 3 }
      }
    },
    {
      "name": "E-commerce - Sales Campaign",
      "input": {
        "industry": "تجارة إلكترونية",
        "goal": "Conversions",
        "platforms": ["Meta", "Google Ads", "TikTok"]
      },
      "expected_ranges": {
        "ctr": { "min": 1.0, "max": 2.5 },
        "cpm": { "min": 4, "max": 9 },
        "cpc": { "min": 0.5, "max": 1.5 },
        "cvr": { "min": 1.5, "max": 4.0 },
        "roas": { "min": 3, "max": 7 }
      }
    },
    {
      "name": "Healthcare - Lead Gen",
      "input": {
        "industry": "رعاية صحية",
        "goal": "Leads",
        "platforms": ["Google Ads", "LinkedIn"]
      },
      "expected_ranges": {
        "ctr": { "min": 1.2, "max": 3.0 },
        "cpm": { "min": 7, "max": 15 },
        "cpc": { "min": 1.5, "max": 4 },
        "cvr": { "min": 2.5, "max": 6.0 },
        "roas": { "min": 2, "max": 5 }
      }
    }
  ],
  "validation_rules": {
    "flag_threshold_percentage": 30,
    "actions": {
      "warn_user": true,
      "adjust_to_nearest_benchmark": false
    }
  }
} as const;