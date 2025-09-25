import React, { useEffect, useState } from 'react';
import { engagingMessages } from '../constants/engagingMessages';

const ProcessingPage: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setIdx(prev => (prev + 1) % engagingMessages.length);
    }, 2000);
    return () => {
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
      <svg className="animate-spin h-16 w-16 text-prepilot-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h1 className="text-3xl font-bold text-white mt-8">الذكاء الاصطناعي يبدع الآن...</h1>
      <p className="max-w-2xl mt-4 text-lg text-gray-400 min-h-[28px] transition-opacity">{engagingMessages[idx]}</p>
    </div>
  );
};

export default ProcessingPage;
