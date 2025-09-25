
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

export const Tabs: React.FC<{ defaultValue: string; children: ReactNode }> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`flex items-center border-b border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<{ value: string; children: ReactNode }> = ({ value, children }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-lg font-bold transition-colors duration-200 border-b-2
        ${isActive
          ? 'text-prepilot-purple-400 border-prepilot-purple-400'
          : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
        }`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string; children: ReactNode }> = ({ value, children }) => {
  const { activeTab } = useTabs();
  return activeTab === value ? <div className="py-6">{children}</div> : null;
};
