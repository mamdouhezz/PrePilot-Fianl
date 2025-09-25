import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { FiCheckCircle, FiUsers, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      icon: FiUsers,
      number: '500+',
      label: 'مسوق استفاد من PrePilot',
      description: 'مسوقي أداء ومؤسسين'
    },
    {
      icon: FiTrendingUp,
      number: '95%',
      label: 'دقة التوقعات',
      description: 'مقارنة بالنتائج الفعلية'
    },
    {
      icon: FiClock,
      number: '2 دقيقة',
      label: 'متوسط وقت إنشاء الخطة',
      description: 'بدلاً من ساعات التخطيط'
    },
    {
      icon: FiAward,
      number: '4.9/5',
      label: 'تقييم المستخدمين',
      description: 'بناءً على 200+ تقييم'
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
            لماذا تثق في PrePilot؟
          </h2>
          <p className="text-lg text-foreground/70 font-montserrat">
            أرقام حقيقية من مستخدمين حقيقيين
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold font-rubik text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold font-montserrat text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-foreground/60 font-montserrat">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
