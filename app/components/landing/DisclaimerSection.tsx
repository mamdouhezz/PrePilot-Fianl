import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { FiInfo } from 'react-icons/fi';

export const DisclaimerSection: React.FC = () => {
  return (
    <Section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiInfo className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-rubik text-foreground">
                PrePilot Plan ≠ Pilot Campaign
              </h3>
              <p className="text-lg text-foreground/80 font-montserrat leading-relaxed">
                الخطة مجرد أول إشارة ذكية تساعدك تتحرك بثقة… مو بديل التجربة الحقيقية.
              </p>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-sm text-foreground/70 font-montserrat">
                  <strong>ملاحظة مهمة:</strong> النتائج الفعلية قد تختلف حسب عوامل السوق، 
                  جودة التنفيذ، والظروف الاقتصادية. استخدم PrePilot كنقطة انطلاق ذكية، 
                  وليس كضمان للنتائج.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
