import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { 
  FiCpu, 
  FiAlertTriangle, 
  FiUsers, 
  FiStar, 
  FiMessageSquare,
  FiBarChart,
  FiTarget,
  FiZap
} from 'react-icons/fi';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FiCpu,
      title: 'نصائح AI فورية',
      description: 'ذكاء اصطناعي يحلل بياناتك ويعطيك توصيات مخصصة'
    },
    {
      icon: FiAlertTriangle,
      title: 'نظام تحذيرات ذكي',
      description: 'تنبيهات فورية عند وجود مشاكل في الخطة أو فرص للتحسين'
    },
    {
      icon: FiUsers,
      title: 'محاكاة المنافسين',
      description: 'تحليل شامل لمنافسيك واستراتيجياتهم الإعلانية'
    },
    {
      icon: FiStar,
      title: 'تحسين تفاصيل البراند',
      description: 'اقتراحات لتحسين هويتك البصرية ورسائلك التسويقية'
    },
    {
      icon: FiMessageSquare,
      title: 'مساعد PrePilot الذكي',
      description: 'مساعد ذكي يجيب على أسئلتك ويساعدك في التخطيط'
    },
    {
      icon: FiBarChart,
      title: 'تقارير تفصيلية',
      description: 'تقارير شاملة مع الرسوم البيانية والتحليلات المتقدمة'
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
            مميزات PrePilot
          </h2>
          <p className="text-lg text-foreground/70 font-montserrat">
            كل ما تحتاجه لإنشاء خطة إعلانية ناجحة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-rubik text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/70 font-montserrat leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
