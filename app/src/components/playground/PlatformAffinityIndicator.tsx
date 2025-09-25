/**
 * @file src/components/playground/PlatformAffinityIndicator.tsx
 * @description A small indicator on each platform button showing its compatibility score with the selected audience.
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiXCircle, FiZap, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import Tooltip from '../ui/Tooltip';
import { CampaignData } from '../../types';
import { agePersonas, genderPersonas } from '../../data/personas/personaData';

interface PlatformAffinityIndicatorProps {
  platformId: string;
  audience: CampaignData['targetAudience'];
  industry: string;
}

const PlatformAffinityIndicator: React.FC<PlatformAffinityIndicatorProps> = ({
  platformId,
  audience,
  industry
}) => {
  // حساب درجة التوافق للمنصة
  const affinityScore = useMemo(() => {
    if (!audience || !audience.age || audience.age.length === 0 || !audience.gender) {
      return { score: 3, level: 'medium', description: 'توافق متوسط' };
    }

    let totalScore = 3; // نقطة البداية (متوسط)
    let factors = 0;

    // تحليل الفئات العمرية
    const selectedAgePersonas = audience.age.map(ageRange => agePersonas[ageRange]).filter(Boolean);
    if (selectedAgePersonas.length > 0) {
      factors++;
      // التحقق من كون المنصة مهيمنة للفئات العمرية
      const isDominant = selectedAgePersonas.some(p => p.dominantPlatforms.includes(platformId));
      if (isDominant) {
        totalScore += 1.5; // زيادة كبيرة إذا كانت المنصة مهيمنة
      } else {
        totalScore -= 0.5; // تقليل طفيف إذا لم تكن مهيمنة
      }

      // تحليل تفضيل المحتوى
      const hasShortVideoPreference = selectedAgePersonas.some(p => p.contentPreference === 'short_video');
      const isVideoPlatform = ['tiktok', 'snapchat', 'instagram'].includes(platformId);
      if (hasShortVideoPreference && isVideoPlatform) {
        totalScore += 1; // زيادة إذا كان المحتوى القصير مناسب للمنصة
      }

      // تحليل سلوك التحويل
      const avgConversionBehavior = selectedAgePersonas.reduce((sum, p) => {
        const behaviorMap = { impulse_buy: 1.2, researched_purchase: 1.0, comparison_shopping: 0.8 };
        return sum + (behaviorMap[p.conversionBehavior] || 1.0);
      }, 0) / selectedAgePersonas.length;
      
      totalScore += (avgConversionBehavior - 1) * 0.5; // تأثير سلوك التحويل
    }

    // تحليل الجنس
    const genderData = genderPersonas[audience.gender];
    if (genderData) {
      factors++;
      const platformAffinity = genderData.platformAffinity?.[platformId] || 1.0;
      totalScore += (platformAffinity - 1) * 2; // تأثير ميول الجنس للمنصة

      // تحليل ميول الصناعة
      if (genderData.categoryAffinity?.includes(industry)) {
        totalScore += 0.5; // زيادة طفيفة إذا كان الجنس يهتم بالصناعة
      }

      // تحليل حساسية الإعلان
      const sensitivityImpact = genderData.adSensitivity === 'high' ? -0.5 : 
                               genderData.adSensitivity === 'low' ? 0.5 : 0;
      totalScore += sensitivityImpact;
    }

    // تحديد مستوى التوافق
    const finalScore = Math.max(1, Math.min(5, Math.round(totalScore)));
    
    let level: 'low' | 'medium' | 'high' | 'excellent';
    let description: string;
    let color: string;
    let icon: React.ReactNode;

    if (finalScore >= 4.5) {
      level = 'excellent';
      description = 'توافق ممتاز';
      color = 'text-green-400';
      icon = <FiCheckCircle className="w-3 h-3" />;
    } else if (finalScore >= 3.5) {
      level = 'high';
      description = 'توافق عالي';
      color = 'text-blue-400';
      icon = <FiZap className="w-3 h-3" />;
    } else if (finalScore >= 2.5) {
      level = 'medium';
      description = 'توافق متوسط';
      color = 'text-yellow-400';
      icon = <FiAlertCircle className="w-3 h-3" />;
    } else {
      level = 'low';
      description = 'توافق منخفض';
      color = 'text-red-400';
      icon = <FiXCircle className="w-3 h-3" />;
    }

    return {
      score: finalScore,
      level,
      description,
      color,
      icon,
      rawScore: totalScore
    };
  }, [platformId, audience, industry]);

  // إنشاء نص التلميح التفصيلي
  const tooltipContent = useMemo(() => {
    if (!audience || !audience.age || audience.age.length === 0 || !audience.gender) {
      return 'اختر الجمهور المستهدف لرؤية درجة التوافق';
    }

    const { score, level, description } = affinityScore;
    const platformNames: { [key: string]: string } = {
      'meta': 'ميتا (فيسبوك/إنستغرام)',
      'google_ads': 'جوجل',
      'tiktok': 'تيك توك',
      'snapchat': 'سناب شات',
      'youtube': 'يوتيوب',
      'x': 'إكس (تويتر)',
      'linkedin': 'لينكد إن'
    };

    const platformName = platformNames[platformId] || platformId;

    let detailedMessage = '';
    if (level === 'excellent') {
      detailedMessage = `توافق ممتاز (${score}/5) مع جمهورك المختار. أداء استثنائي متوقع على ${platformName}.`;
    } else if (level === 'high') {
      detailedMessage = `توافق عالي (${score}/5) مع جمهورك المختار. أداء ممتاز متوقع على ${platformName}.`;
    } else if (level === 'medium') {
      detailedMessage = `توافق متوسط (${score}/5) مع جمهورك المختار. أداء جيد متوقع على ${platformName}.`;
    } else {
      detailedMessage = `تحذير: توافق منخفض (${score}/5) مع جمهورك المختار. قد تكون التكاليف مرتفعة والنتائج ضعيفة على ${platformName}.`;
    }

    return detailedMessage;
  }, [platformId, audience, affinityScore]);

  return (
    <Tooltip content={tooltipContent} delayDuration={300}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className={`absolute top-1 right-1 w-6 h-6 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-600 flex items-center justify-center ${affinityScore.color}`}
      >
        {affinityScore.icon}
      </motion.div>
    </Tooltip>
  );
};

export default PlatformAffinityIndicator;
