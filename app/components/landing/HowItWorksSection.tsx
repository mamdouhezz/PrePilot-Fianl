import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FiEdit3, FiCpu, FiBarChart, FiArrowRight } from 'react-icons/fi';
import { Page } from '../../types';

interface HowItWorksSectionProps {
  navigateTo?: (page: Page) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ navigateTo }) => {
  const steps = [
    {
      icon: FiEdit3,
      title: 'اكتب هدفك',
      description: 'اكتب هدفك الإعلاني ببساطة: "أريد أصل لـ 1000 عميل جديد"'
    },
    {
      icon: FiCpu,
      title: 'PrePilot يحلل',
      description: 'نحلل السوق، المنافسين، والبيانات التاريخية لصناعتك'
    },
    {
      icon: FiBarChart,
      title: 'احصل على خطتك',
      description: 'خطة كاملة مع الميزانية، المنصات، والتوقعات الواقعية'
    }
  ];

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-rubik text-foreground mb-4">
            كيف تشتغل؟
          </h2>
          <p className="text-lg text-foreground/70 font-montserrat">
            ثلاث خطوات بسيطة للحصول على خطتك الإعلانية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center space-y-4"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold font-rubik text-foreground">
                {step.title}
              </h3>
              <p className="text-foreground/70 font-montserrat leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            variant="glow"
            size="lg"
            onClick={() => navigateTo ? navigateTo('playground') : window.location.href = '/playground'}
            className="group"
          >
            يلا ڤايب خطتك الآن
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
};
