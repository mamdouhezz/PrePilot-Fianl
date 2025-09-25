/**
 * @file src/components/playground/AudiencePersonaCard.tsx
 * @description A live card that displays a summary of the selected audience's digital persona.
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSmartphone, FiShoppingBag, FiZap, FiUsers, FiTrendingUp, FiTarget } from 'react-icons/fi';
import { CampaignData } from '../../types';
import { agePersonas, genderPersonas } from '../../data/personas/personaData';

interface AudiencePersonaCardProps {
  audience: CampaignData['targetAudience'];
}

const AudiencePersonaCard: React.FC<AudiencePersonaCardProps> = ({ audience }) => {
  // تحليل الشخصية بناءً على الجمهور المختار
  const personaAnalysis = useMemo(() => {
    if (!audience || !audience.age || audience.age.length === 0 || !audience.gender) {
      return null;
    }

    // الحصول على بيانات الفئات العمرية المختارة
    const selectedAgePersonas = audience.age.map(ageRange => agePersonas[ageRange]).filter(Boolean);
    const genderData = genderPersonas[audience.gender];

    if (selectedAgePersonas.length === 0 || !genderData) {
      return null;
    }

    // حساب المتوسطات للفئات العمرية المتعددة
    const avgSpendingPower = selectedAgePersonas.reduce((sum, p) => {
      const powerMap = { low: 1, medium: 2, high: 3, very_high: 4 };
      return sum + powerMap[p.spendingPower];
    }, 0) / selectedAgePersonas.length;

    const spendingPowerText = avgSpendingPower <= 1.5 ? 'منخفضة' : 
                             avgSpendingPower <= 2.5 ? 'متوسطة' : 
                             avgSpendingPower <= 3.5 ? 'عالية' : 'عالية جداً';

    // تجميع المنصات المهيمنة
    const allDominantPlatforms = selectedAgePersonas.flatMap(p => p.dominantPlatforms);
    const uniquePlatforms = [...new Set(allDominantPlatforms)];
    const platformNames = uniquePlatforms.map(p => {
      const platformMap: { [key: string]: string } = {
        'meta': 'ميتا',
        'google_ads': 'جوجل',
        'tiktok': 'تيك توك',
        'snapchat': 'سناب شات',
        'youtube': 'يوتيوب',
        'x': 'إكس',
        'linkedin': 'لينكد إن'
      };
      return platformMap[p] || p;
    });

    // تحليل سلوك الشراء
    const conversionBehaviors = selectedAgePersonas.map(p => p.conversionBehavior);
    const primaryBehavior = conversionBehaviors[0]; // استخدام السلوك الأول كسلوك أساسي
    const behaviorText = primaryBehavior === 'impulse_buy' ? 'شراء اندفاعي' :
                        primaryBehavior === 'comparison_shopping' ? 'مقارنة الأسعار' :
                        'شراء مدروس';

    // تحليل تفضيل المحتوى
    const contentPreferences = selectedAgePersonas.map(p => p.contentPreference);
    const primaryContent = contentPreferences[0];
    const contentText = primaryContent === 'short_video' ? 'محتوى قصير' :
                       primaryContent === 'detailed_content' ? 'محتوى مفصل' :
                       primaryContent === 'visual_story' ? 'قصص بصرية' :
                       'محتوى نصي';

    // تحليل الدوافع النفسية
    const allDecisionDrivers = selectedAgePersonas.flatMap(p => p.decisionDrivers);
    const uniqueDrivers = [...new Set(allDecisionDrivers)];
    const topDrivers = uniqueDrivers.slice(0, 3);

    // نصيحة ذكية بناءً على التحليل
    let smartTip = '';
    if (topDrivers.includes('trust') && topDrivers.includes('quality')) {
      smartTip = 'هذا الجمهور يهتم بالثقة والجودة. ركز على الشهادات والتقييمات.';
    } else if (topDrivers.includes('price') && topDrivers.includes('trends')) {
      smartTip = 'جمهور حساس للسعر ومتابع للاتجاهات. استخدم العروض والاتجاهات الحديثة.';
    } else if (topDrivers.includes('social_proof')) {
      smartTip = 'التأثير الاجتماعي مهم لهذا الجمهور. استخدم تجارب المستخدمين والشهادات.';
    } else {
      smartTip = 'ركز على بناء الثقة وتوضيح القيمة المضافة لمنتجك.';
    }

    // تأثير الجنس على الصناعات المفضلة
    const industryAffinity = genderData.categoryAffinity || [];
    const industryTip = industryAffinity.length > 0 ? 
      `يُظهر اهتماماً خاصاً بـ: ${industryAffinity.slice(0, 2).join('، ')}` : '';

    return {
      ageRange: audience.age.join('، '),
      gender: audience.gender,
      spendingPower: spendingPowerText,
      dominantPlatforms: platformNames.slice(0, 3),
      conversionBehavior: behaviorText,
      contentPreference: contentText,
      decisionDrivers: topDrivers,
      smartTip,
      industryTip,
      platformAffinity: genderData.platformAffinity || {}
    };
  }, [audience]);

  // إخفاء البطاقة إذا لم يكن هناك جمهور محدد
  if (!personaAnalysis) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-prepilot-purple-500/10 to-prepilot-blue-500/10 border border-prepilot-purple-500/20 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <FiUsers className="w-5 h-5 text-prepilot-purple-400" />
          <h3 className="text-lg font-semibold text-white">
            شخصية الجمهور: {personaAnalysis.ageRange}
          </h3>
        </div>

        <div className="space-y-3">
          {/* المنصات المفضلة */}
          <div className="flex items-center gap-3">
            <FiSmartphone className="w-4 h-4 text-prepilot-blue-400 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-300">المنصات المفضلة:</span>
              <span className="text-sm text-white ml-2">{personaAnalysis.dominantPlatforms.join('، ')}</span>
            </div>
          </div>

          {/* سلوك الشراء */}
          <div className="flex items-center gap-3">
            <FiShoppingBag className="w-4 h-4 text-prepilot-blue-400 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-300">سلوك الشراء:</span>
              <span className="text-sm text-white ml-2">{personaAnalysis.conversionBehavior}</span>
            </div>
          </div>

          {/* قوة الإنفاق */}
          <div className="flex items-center gap-3">
            <FiTrendingUp className="w-4 h-4 text-prepilot-blue-400 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-300">قوة الإنفاق:</span>
              <span className="text-sm text-white ml-2">{personaAnalysis.spendingPower}</span>
            </div>
          </div>

          {/* تفضيل المحتوى */}
          <div className="flex items-center gap-3">
            <FiTarget className="w-4 h-4 text-prepilot-blue-400 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-300">نوع المحتوى المفضل:</span>
              <span className="text-sm text-white ml-2">{personaAnalysis.contentPreference}</span>
            </div>
          </div>

          {/* النصيحة الذكية */}
          <div className="bg-prepilot-purple-500/20 border border-prepilot-purple-500/30 rounded-lg p-3 mt-4">
            <div className="flex items-start gap-2">
              <FiZap className="w-4 h-4 text-prepilot-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-prepilot-purple-300 block mb-1">نصيحة ذكية:</span>
                <p className="text-sm text-white leading-relaxed">{personaAnalysis.smartTip}</p>
                {personaAnalysis.industryTip && (
                  <p className="text-xs text-prepilot-purple-200 mt-1">{personaAnalysis.industryTip}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudiencePersonaCard;
