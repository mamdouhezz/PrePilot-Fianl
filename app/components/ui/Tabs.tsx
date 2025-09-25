
/**
 * @file Tabs.tsx
 * @description مكون نظام التبويبات المتقدم مع دعم كامل للخصائص المخصصة
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { useState, createContext, useContext, ReactNode } from 'react';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

/**
 * @component Tabs
 * @description مكون التبويبات الرئيسي مع إدارة الحالة والتبديل
 * @param {TabsProps} props - خصائص المكون
 * @returns {JSX.Element} مكون التبويبات مع السياق
 */
export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

/**
 * @component TabsList
 * @description مكون قائمة التبويبات مع تخطيط مرن
 * @param {Object} props - خصائص المكون
 * @param {ReactNode} props.children - محتوى التبويبات
 * @param {string} [props.className] - فئات CSS مخصصة
 * @returns {JSX.Element} قائمة التبويبات
 */
export const TabsList: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`flex items-center border-b border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

/**
 * @component TabsTrigger
 * @description مكون محفز التبويب مع تفاعل ورسوم متحركة
 * @param {TabsTriggerProps} props - خصائص المكون
 * @returns {JSX.Element} زر التبويب التفاعلي
 */
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-lg font-bold transition-colors duration-200 border-b-2
        ${isActive
          ? 'text-prepilot-purple-400 border-prepilot-purple-400'
          : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
        } ${className || ''}`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

/**
 * @component TabsContent
 * @description مكون محتوى التبويب مع عرض شرطي
 * @param {TabsContentProps} props - خصائص المكون
 * @returns {JSX.Element} محتوى التبويب النشط
 */
export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const { activeTab } = useTabs();
  return activeTab === value ? <div className={`py-6 ${className || ''}`}>{children}</div> : null;
};
