import React from 'react';
import { IconType } from 'react-icons';
import { CampaignReport, KpiSet } from '../../types';
import {
  FiMousePointer, FiDollarSign, FiTrendingUp, FiUsers, FiEye,
  FiCheckCircle, FiTarget, FiActivity
} from 'react-icons/fi';

export interface DisplayKpi {
  id: keyof KpiSet;
  icon: IconType;
  label: string;
  value: string;
  tooltip: string;
  delta?: number;
}

type KpiFormatter = (value: number) => string;

const formatters: { [key: string]: KpiFormatter } = {
  percent: (val) => `${val.toFixed(2)}%`,
  currency: (val) => `${val.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ريال`,
  ratio: (val) => `${val.toFixed(1)}x`,
  integer: (val) => val.toLocaleString('ar-SA'),
};

const MASTER_KPI_LIST: { [key in keyof KpiSet]?: { label: string; icon: IconType; tooltip: string; formatter: KpiFormatter } } = {
  ctr: { label: 'معدل النقر', icon: FiMousePointer, tooltip: 'النسبة المئوية لعدد المستخدمين الذين نقروا على إعلانك بعد مشاهدته.', formatter: formatters.percent },
  cpa: { label: 'تكلفة الاكتساب', icon: FiDollarSign, tooltip: 'المبلغ الذي تدفعه مقابل كل عملية تحويل (مثل بيع أو تسجيل). المعادلة: إجمالي الإنفاق ÷ عدد التحويلات.', formatter: formatters.currency },
  roas: { label: 'العائد على الإنفاق', icon: FiTrendingUp, tooltip: 'العائد على الإنفاق الإعلاني. يقيس مدى ربحية حملتك. المعادلة: إجمالي الإيرادات من الإعلانات ÷ إجمالي تكلفة الإعلانات.', formatter: formatters.ratio },
  arpu: { label: 'متوسط العائد لكل مستخدم', icon: FiUsers, tooltip: 'متوسط الإيرادات التي تحققها من كل مستخدم قام بالتحويل.', formatter: formatters.currency },
  impressions: { label: 'عدد مرات الظهور', icon: FiEye, tooltip: 'إجمالي عدد مرات ظهور إعلاناتك للمستخدمين.', formatter: formatters.integer },
  conversions: { label: 'عدد التحويلات', icon: FiCheckCircle, tooltip: 'إجمالي عدد الإجراءات القيّمة التي أكملها المستخدمون (مثل الشراء أو التسجيل).', formatter: formatters.integer },
  cac: { label: 'تكلفة العميل', icon: FiTarget, tooltip: 'التكلفة الإجمالية لاكتساب عميل جديد، بما في ذلك جميع تكاليف التسويق والمبيعات.', formatter: formatters.currency },
  breakEvenRoas: { label: 'نقطة التعادل', icon: FiActivity, tooltip: 'الحد الأدنى للعائد على الإنفاق الذي تحتاجه لتغطية تكاليف إعلاناتك دون تحقيق خسارة.', formatter: formatters.ratio },
};

export const selectKpisForDisplay = (report: CampaignReport): DisplayKpi[] => {
  const { kpis, goals, funnelStage } = report;
  const totals = kpis.totals;

  const coreKpis: (keyof KpiSet)[] = ['ctr', 'cpa', 'roas', 'arpu'];
  const dynamicKpis: (keyof KpiSet)[] = [];

  if (goals.includes('Awareness / Brand Recognition')) {
    dynamicKpis.push('impressions');
  }
  if (goals.includes('Sales / Conversions') || goals.includes('Leads Generation')) {
    dynamicKpis.push('conversions', 'cac');
  }
  if (funnelStage === 'conversion') {
     dynamicKpis.push('breakEvenRoas');
  }
  
  const allKeys = [...coreKpis, ...dynamicKpis];
  // Remove duplicates and limit to 8
  const uniqueKeys = [...new Set(allKeys)].slice(0, 8);

  return uniqueKeys
    .map((key) => {
      const kpiInfo = MASTER_KPI_LIST[key];
      const value = totals[key];
      if (kpiInfo && typeof value === 'number') {
        return {
          id: key,
          icon: kpiInfo.icon,
          label: kpiInfo.label,
          value: kpiInfo.formatter(value),
          tooltip: kpiInfo.tooltip,
        };
      }
      return null;
    })
    .filter((kpi): kpi is DisplayKpi => kpi !== null);
};
