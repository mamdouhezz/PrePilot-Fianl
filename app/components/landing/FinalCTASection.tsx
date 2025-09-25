import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { Page } from '../../types';

interface FinalCTASectionProps {
  navigateTo?: (page: Page) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ navigateTo }) => {
  return (
    <Section variant="dark" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-rubik text-white">
            اليوم ما تحتاج تخمّن… خطتك جاهزة الآن
          </h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            انضم إلى مئات المسوقين والمؤسسين الذين يثقون في PrePilot لإنشاء خططهم الإعلانية
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="glow"
            size="lg"
            onClick={() => navigateTo ? navigateTo('playground') : window.location.href = '/playground'}
            className="group bg-white text-foreground hover:bg-white/90"
          >
            جرّب الخطة المجانية
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            href="mailto:hello@prepilot.cloud"
            className="border-white text-white hover:bg-white hover:text-foreground"
          >
            <FiMail className="mr-2" />
            كلمنا مباشرة
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 border-t border-white/20"
        >
          <p className="text-white/60 font-montserrat text-sm">
            لا توجد رسوم خفية • لا توجد التزامات • ابدأ مجاناً اليوم
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
};
