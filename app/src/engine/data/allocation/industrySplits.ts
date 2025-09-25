/**
 * Industry Splits - Single Source of Truth
 * Contains default budget allocation splits for different industries and platform compatibility
 */

export const industrySplits = {
  // Default platform splits by industry
  industries: {
    'default': { 
      defaultPlatformSplit: { 
        meta: 0.40, 
        google_ads: 0.30, 
        tiktok: 0.10, 
        snapchat: 0.10, 
        youtube: 0.10 
      },
      minPlatforms: 2,
      maxPlatforms: 5,
      recommendedPlatforms: ['meta', 'google_ads']
    },
    
    'تجارة إلكترونية': { 
      defaultPlatformSplit: { 
        meta: 0.32, 
        google_ads: 0.28, 
        tiktok: 0.22, 
        snapchat: 0.12, 
        youtube: 0.06 
      },
      minPlatforms: 3,
      maxPlatforms: 6,
      recommendedPlatforms: ['meta', 'google_ads', 'tiktok']
    },
    
    'عقارات': { 
      defaultPlatformSplit: { 
        google_ads: 0.45, 
        meta: 0.30, 
        snapchat: 0.15, 
        x: 0.10 
      },
      minPlatforms: 2,
      maxPlatforms: 4,
      recommendedPlatforms: ['google_ads', 'meta']
    },
    
    'خدمات مالية': { 
      defaultPlatformSplit: { 
        linkedin: 0.42, 
        google_ads: 0.35, 
        x: 0.15, 
        meta: 0.08 
      },
      minPlatforms: 2,
      maxPlatforms: 4,
      recommendedPlatforms: ['linkedin', 'google_ads']
    },
    
    'تقنية/ساس': { 
      defaultPlatformSplit: { 
        linkedin: 0.38, 
        google_ads: 0.32, 
        x: 0.15, 
        meta: 0.10, 
        youtube: 0.05 
      },
      minPlatforms: 2,
      maxPlatforms: 5,
      recommendedPlatforms: ['linkedin', 'google_ads']
    },
    
    'تعليم': { 
      defaultPlatformSplit: { 
        google_ads: 0.35, 
        meta: 0.30, 
        linkedin: 0.25, 
        youtube: 0.10 
      },
      minPlatforms: 2,
      maxPlatforms: 4,
      recommendedPlatforms: ['google_ads', 'meta', 'linkedin']
    },
    
    'سياحة وضيافة': { 
      defaultPlatformSplit: { 
        meta: 0.32, 
        google_ads: 0.28, 
        youtube: 0.20, 
        tiktok: 0.12, 
        snapchat: 0.08 
      },
      minPlatforms: 3,
      maxPlatforms: 5,
      recommendedPlatforms: ['meta', 'google_ads', 'youtube']
    },
    
    'سيارات': { 
      defaultPlatformSplit: { 
        youtube: 0.35, 
        google_ads: 0.32, 
        meta: 0.28, 
        snapchat: 0.05 
      },
      minPlatforms: 2,
      maxPlatforms: 4,
      recommendedPlatforms: ['youtube', 'google_ads', 'meta']
    },
    
    'مطاعم وكافيهات': { 
      defaultPlatformSplit: { 
        tiktok: 0.30, 
        snapchat: 0.25, 
        meta: 0.30, 
        google_ads: 0.15 
      },
      minPlatforms: 3,
      maxPlatforms: 4,
      recommendedPlatforms: ['tiktok', 'snapchat', 'meta']
    },
    
    'رعاية صحية': { 
      defaultPlatformSplit: { 
        google_ads: 0.45, 
        meta: 0.35, 
        snapchat: 0.10, 
        youtube: 0.10 
      },
      minPlatforms: 2,
      maxPlatforms: 4,
      recommendedPlatforms: ['google_ads', 'meta']
    },
    
    'تجزئة': { 
      defaultPlatformSplit: { 
        meta: 0.38, 
        snapchat: 0.22, 
        tiktok: 0.18, 
        google_ads: 0.15, 
        programmatic: 0.07 
      },
      minPlatforms: 3,
      maxPlatforms: 5,
      recommendedPlatforms: ['meta', 'snapchat', 'tiktok']
    },
    
    'فعاليات ومؤتمرات ومعارض': { 
      defaultPlatformSplit: { 
        linkedin: 0.38, 
        meta: 0.28, 
        google_ads: 0.20, 
        x: 0.10, 
        youtube: 0.04 
      },
      minPlatforms: 2,
      maxPlatforms: 5,
      recommendedPlatforms: ['linkedin', 'meta', 'google_ads']
    },
    
    // New industries
    'تطبيقات وتقنية': { 
      defaultPlatformSplit: { 
        meta: 0.35, 
        google_ads: 0.30, 
        tiktok: 0.20, 
        linkedin: 0.10, 
        youtube: 0.05 
      },
      minPlatforms: 3,
      maxPlatforms: 5,
      recommendedPlatforms: ['meta', 'google_ads', 'tiktok']
    },
    
    'أزياء وموضة': { 
      defaultPlatformSplit: { 
        tiktok: 0.35, 
        meta: 0.30, 
        snapchat: 0.20, 
        google_ads: 0.15 
      },
      minPlatforms: 3,
      maxPlatforms: 4,
      recommendedPlatforms: ['tiktok', 'meta', 'snapchat']
    },
    
    'رياضة ولياقة': { 
      defaultPlatformSplit: { 
        tiktok: 0.40, 
        meta: 0.30, 
        google_ads: 0.20, 
        youtube: 0.10 
      },
      minPlatforms: 3,
      maxPlatforms: 4,
      recommendedPlatforms: ['tiktok', 'meta']
    }
  },
  
  // Platform compatibility by industry
  platformCompatibility: {
    'تجارة إلكترونية': { 
      allow: ['meta', 'google_ads', 'tiktok', 'snapchat', 'youtube'], 
      discourage: ['linkedin'],
      optimal: ['meta', 'google_ads', 'tiktok']
    },
    'عقارات': { 
      allow: ['google_ads', 'meta', 'snapchat', 'x'], 
      discourage: ['tiktok'],
      optimal: ['google_ads', 'meta']
    },
    'سيارات': { 
      allow: ['youtube', 'google_ads', 'meta', 'snapchat'], 
      discourage: ['linkedin', 'x', 'programmatic'],
      optimal: ['youtube', 'google_ads', 'meta']
    },
    'مطاعم وكافيهات': { 
      allow: ['tiktok', 'snapchat', 'meta', 'google_ads', 'youtube'], 
      discourage: ['linkedin', 'x', 'programmatic'],
      optimal: ['tiktok', 'snapchat', 'meta']
    },
    'رعاية صحية': { 
      allow: ['google_ads', 'meta', 'snapchat', 'youtube'], 
      discourage: ['tiktok', 'x', 'programmatic'],
      optimal: ['google_ads', 'meta']
    },
    'تعليم': { 
      allow: ['google_ads', 'meta', 'linkedin', 'youtube'], 
      discourage: ['tiktok', 'snapchat', 'x'],
      optimal: ['google_ads', 'meta', 'linkedin']
    },
    'سياحة وضيافة': { 
      allow: ['youtube', 'meta', 'google_ads', 'tiktok', 'snapchat'], 
      discourage: ['linkedin', 'x', 'programmatic'],
      optimal: ['meta', 'google_ads', 'youtube']
    },
    'خدمات مالية': { 
      allow: ['linkedin', 'google_ads', 'x', 'meta'], 
      discourage: ['tiktok', 'snapchat'],
      optimal: ['linkedin', 'google_ads']
    },
    'تقنية/ساس': { 
      allow: ['linkedin', 'google_ads', 'x', 'meta', 'youtube'], 
      discourage: ['snapchat'],
      optimal: ['linkedin', 'google_ads']
    },
    'تجزئة': { 
      allow: ['meta', 'snapchat', 'tiktok', 'google_ads', 'programmatic', 'youtube'], 
      discourage: ['linkedin', 'x'],
      optimal: ['meta', 'snapchat', 'tiktok']
    },
    'فعاليات ومؤتمرات ومعارض': { 
      allow: ['linkedin', 'meta', 'google_ads', 'x', 'youtube'], 
      discourage: ['snapchat', 'tiktok'],
      optimal: ['linkedin', 'meta', 'google_ads']
    },
    'default': { 
      allow: ['meta', 'google_ads', 'tiktok', 'snapchat', 'youtube', 'x', 'linkedin', 'programmatic'],
      discourage: [],
      optimal: ['meta', 'google_ads']
    }
  },
  
  // Budget tier recommendations
  budgetTiers: {
    low: { // 5K - 15K
      recommendedPlatforms: 2,
      maxPlatforms: 3,
      focusOn: 'quality_over_quantity',
      recommendedSplits: {
        primary: 0.70,
        secondary: 0.30
      }
    },
    medium: { // 15K - 50K
      recommendedPlatforms: 3,
      maxPlatforms: 4,
      focusOn: 'balanced_approach',
      recommendedSplits: {
        primary: 0.50,
        secondary: 0.30,
        tertiary: 0.20
      }
    },
    high: { // 50K - 150K
      recommendedPlatforms: 4,
      maxPlatforms: 6,
      focusOn: 'comprehensive_coverage',
      recommendedSplits: {
        primary: 0.40,
        secondary: 0.25,
        tertiary: 0.20,
        quaternary: 0.15
      }
    },
    enterprise: { // 150K+
      recommendedPlatforms: 5,
      maxPlatforms: 8,
      focusOn: 'full_ecosystem',
      recommendedSplits: {
        primary: 0.30,
        secondary: 0.20,
        tertiary: 0.15,
        quaternary: 0.15,
        others: 0.20
      }
    }
  }
} as const;

export type IndustrySplits = typeof industrySplits;
