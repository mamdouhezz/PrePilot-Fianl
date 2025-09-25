/**
 * Device Performance Modifiers
 * Contains performance modifiers based on device type (mobile vs desktop)
 * Data sourced from device-specific campaign performance analysis in Saudi Arabia
 */

type DeviceModifier = { 
  ctr_mod: number; 
  cvr_mod: number; 
};

export const devicePerformance: { [device: string]: DeviceModifier } = {
  'mobile': { 
    ctr_mod: 1.2, 
    cvr_mod: 0.9 
  },
  'desktop': { 
    ctr_mod: 0.8, 
    cvr_mod: 1.2 
  },
  'tablet': { 
    ctr_mod: 1.0, 
    cvr_mod: 1.0 
  },
  'all': { 
    ctr_mod: 1.05, 
    cvr_mod: 1.05 
  }
};
