/**
 * @file Chatbot.tsx
 * @description Simplified chatbot component for lazy loading
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React from 'react';

interface ChatbotProps {
  onSubmit: (data: any) => void;
}

/**
 * @component Chatbot
 * @description مكون chatbot مبسط للاستخدام مع lazy loading
 * @param {ChatbotProps} props - خصائص المكون
 * @returns {JSX.Element} مكون chatbot مع واجهة أساسية
 */
const Chatbot: React.FC<ChatbotProps> = ({ onSubmit }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg text-center">
      <h3 className="text-xl font-bold mb-4">AI Chat</h3>
      <p className="text-gray-400 mb-4">
        ميزة الدردشة مع الذكاء الاصطناعي ستكون متاحة قريباً
      </p>
      <div className="bg-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          يمكنك الآن استخدام النموذج التفاعلي لإنشاء خططك الإعلانية
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
