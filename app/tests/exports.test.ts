import { describe, it, expect } from 'vitest';
import { exportSection } from '../services/export/exportManager';

const fakeReport: any = {
  title: 'Test Report', description: 'desc', budget: 10000,
  kpis: { totals: { budget: 10000, impressions: 1000, clicks: 100, conversions: 10, ctr: 10, cpm: 0, cpc: 0, cvr: 0, roas: 0, arpu: 0, revenue: 0, cac: 0, cpa: 0, breakEvenRoas: 0 }, perPlatform: {} }
};

describe('exportManager', () => {
  it('exports JSON for full-report', async () => {
    const res = await exportSection({ section: 'full-report', format: 'json', report: fakeReport });
    expect(res.success).toBe(true);
  });

  it('handles PNG without element gracefully', async () => {
    const res = await exportSection({ section: 'strategic-summary', format: 'png', report: fakeReport, element: undefined as any });
    expect(typeof res.success).toBe('boolean');
  });
});


