import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';

export const PainPromiseSection: React.FC = () => {
  return (
    <Section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-8 rounded-r-lg">
          <h2 className="text-2xl md:text-3xl font-bold font-rubik text-foreground mb-6">
            العميل سأل: لو صرفنا 100 ألف، وش نحقق؟ 🤔
          </h2>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-foreground/10 border-l-4 border-primary p-8 rounded-r-lg">
          <h3 className="text-2xl md:text-3xl font-bold font-rubik text-primary">
            بدل التخمينات، PrePilot يعطيك أرقام واقعية مبنية على السوق الفعلي.
          </h3>
        </div>
      </motion.div>
    </Section>
  );
};
