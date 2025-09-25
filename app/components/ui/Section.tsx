import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'alternate' | 'dark';
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  className = '',
  id,
}) => {
  const variantClasses = {
    default: 'bg-background',
    alternate: 'bg-foreground/5',
    dark: 'bg-foreground text-white',
  };
  
  const classes = `py-16 px-4 sm:px-6 lg:px-8 ${variantClasses[variant]} ${className}`;
  
  return (
    <motion.section
      id={id}
      className={classes}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
};
