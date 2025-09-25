import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { FiZap, FiTarget, FiTrendingUp, FiUsers, FiDollarSign, FiClock } from 'react-icons/fi';

export const PersonasSection: React.FC = () => {
  const personas = [
    {
      title: 'Performance Marketer',
      subtitle: 'مسوق الأداء',
      icon: FiTarget,
      benefits: [
        'خطط مدعومة ببيانات السوق الحقيقية',
        'توقعات دقيقة للـ ROI بناءً على الصناعة',
        'تحليل المنافسين والفرص المتاحة'
      ]
    },
    {
      title: 'Founder',
      subtitle: 'المؤسس',
      icon: FiUsers,
      benefits: [
        'وضوح في الميزانية المطلوبة للوصول للأهداف',
        'خطة واضحة قابلة للعرض على المستثمرين',
        'توفير الوقت والجهد في التخطيط'
      ]
    }
  ];

  return (
    <Section variant="alternate">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-rubik text-foreground mb-4">
            مين يستفيد من PrePilot؟
          </h2>
          <p className="text-lg text-foreground/70 font-montserrat">
            أداة مصممة خصيصاً لمسوقي الأداء والمؤسسين
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <persona.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-rubik text-foreground">
                    {persona.title}
                  </h3>
                  <p className="text-primary font-montserrat font-medium">
                    {persona.subtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {persona.benefits.map((benefit, benefitIndex) => (
                  <motion.li
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FiZap className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80 font-montserrat">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
