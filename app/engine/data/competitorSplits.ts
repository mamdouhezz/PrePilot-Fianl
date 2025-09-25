export const competitorSplits = [
    {
        industry: 'تجارة إلكترونية',
        competitor_split: { meta: 0.35, google_ads: 0.3, tiktok: 0.2, snapchat: 0.15 }
    },
    {
        industry: 'عقارات',
        competitor_split: { google_ads: 0.5, meta: 0.3, snapchat: 0.2 }
    },
    {
        industry: 'خدمات مالية',
        competitor_split: { linkedin: 0.5, google_ads: 0.4, x: 0.1 }
    },
    {
        industry: 'فعاليات ومؤتمرات ومعارض',
        competitor_split: { linkedin: 0.4, meta: 0.3, google_ads: 0.2, x: 0.1 }
    },
] as const;
