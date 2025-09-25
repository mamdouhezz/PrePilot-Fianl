/**
 * Plan Lab Scenarios Data
 * Interactive scenarios for the Plan Lab section
 */

export interface PlanResults {
  roas: number;
  conversions: number;
  cac: number;
}

export interface Scenario {
  title: string;
  budget: number;
  guessworkPlan: PlanResults;
  prepilotPlan: PlanResults;
  description: string;
}

export const scenarios: Record<string, Scenario> = {
  'ecommerce_launch': {
    title: 'إطلاق متجر أزياء',
    budget: 50000,
    description: 'متجر أزياء جديد يريد الوصول للعملاء في السعودية',
    guessworkPlan: { 
      roas: 1.8, 
      conversions: 150, 
      cac: 333 
    },
    prepilotPlan: { 
      roas: 4.2, 
      conversions: 350, 
      cac: 142 
    }
  },
  'real_estate_leads': {
    title: 'حملة لعقار جديد',
    budget: 100000,
    description: 'مشروع عقاري فاخر في الرياض يبحث عن عملاء محتملين',
    guessworkPlan: { 
      roas: 3.1, 
      conversions: 80, 
      cac: 1250 
    },
    prepilotPlan: { 
      roas: 6.5, 
      conversions: 150, 
      cac: 666 
    }
  },
  'saas_startup': {
    title: 'تطبيق تقني ناشئ',
    budget: 25000,
    description: 'تطبيق SaaS جديد يريد اكتساب عملاء في السوق السعودي',
    guessworkPlan: { 
      roas: 2.2, 
      conversions: 45, 
      cac: 555 
    },
    prepilotPlan: { 
      roas: 5.8, 
      conversions: 120, 
      cac: 208 
    }
  },
  'restaurant_chain': {
    title: 'سلسلة مطاعم',
    budget: 75000,
    description: 'سلسلة مطاعم تريد التوسع في مدن جديدة',
    guessworkPlan: { 
      roas: 2.5, 
      conversions: 200, 
      cac: 375 
    },
    prepilotPlan: { 
      roas: 4.8, 
      conversions: 380, 
      cac: 197 
    }
  }
};

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios[id];
};

export const getAllScenarios = (): Scenario[] => {
  return Object.values(scenarios);
};

export const getScenarioKeys = (): string[] => {
  return Object.keys(scenarios);
};
