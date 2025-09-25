import React, { useState, useRef, useEffect } from 'react';
import { CampaignData } from '../../types';
import { parsePromptWithAI, generateGreeting } from '../../engine';
import { PLATFORMS } from '../../constants';
import { Button } from '../ui/Button';

type ChatMessage = { role: 'assistant' | 'user' | 'system'; content: React.ReactNode };

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
  </div>
);

const Chatbot: React.FC<{ onSubmit: (data: CampaignData) => void; }> = ({ onSubmit }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGreetingLoading, setIsGreetingLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const streamGreeting = async () => {
      setIsGreetingLoading(true);
      setMessages([{ role: 'assistant', content: <LoadingIndicator /> }]);
      try {
        const stream = await generateGreeting();
        let fullGreeting = '';
        setMessages([{ role: 'assistant', content: '' }]);
        for await (const chunk of stream) {
          fullGreeting += chunk.text;
          setMessages([{ role: 'assistant', content: fullGreeting }]);
        }
      } catch {
        const fallback = 'أهلاً بك! أوصف لي حملتك الإعلانية بالعامي...';
        setMessages([{ role: 'assistant', content: fallback }]);
      } finally { setIsGreetingLoading(false); }
    };
    streamGreeting();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || isGreetingLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    setIsLoading(true);
    try {
      const parsedData = await parsePromptWithAI(inputValue);
      const fullData: CampaignData = {
        brandContext: { brandName: '', website: '', usp: '', brandTone: '', extraDetails: '' },
        industry: parsedData.industry || '',
        subIndustry: parsedData.subIndustry || '',
        budget: parsedData.budget || 5000,
        duration: parsedData.duration || 'medium',
        targetAudience: {
          age: parsedData.targetAudience?.age || ['25-34'],
          gender: parsedData.targetAudience?.gender || 'الكل',
          locations: parsedData.targetAudience?.locations || ['كل المدن الرئيسية'],
          interests: parsedData.targetAudience?.interests || [],
          behaviors: parsedData.targetAudience?.behaviors || [],
        },
        competitorAnalysis: parsedData.competitorAnalysis || { mainCompetitors: [], estimatedSpend: '' },
        goals: parsedData.goals || [],
        subGoals: parsedData.subGoals || {},
        expectedRoas: parsedData.expectedRoas || '',
        platforms: parsedData.platforms || [],
        seasons: parsedData.seasons || [],
        profitMargin: parsedData.profitMargin || 30,
        conversionDefinition: parsedData.conversionDefinition || 'purchase',
        funnelStage: parsedData.funnelStage || 'conversion',
        creativeType: parsedData.creativeType || 'video',
        aov: parsedData.aov || 150,
        competitorContext: parsedData.competitorContext || 'high',
      };
      setMessages(prev => [...prev, { role: 'assistant', content: (
        <div className="bg-gray-800 border border-purple-700 rounded-xl p-4 mt-2">
          <p className="font-bold text-lg mb-3 text-purple-300">فهمت منك أن خطتك كالتالي:</p>
          <ul className="space-y-2 text-sm">
            <li><strong>المجال:</strong> {fullData.industry || 'لم يحدد'}</li>
            <li><strong>الميزانية:</strong> {fullData.budget.toLocaleString('en-US')} ريال</li>
            <li><strong>الجمهور:</strong> {`${fullData.targetAudience.gender}، ${fullData.targetAudience.age.join(', ')}، في ${fullData.targetAudience.locations.join(' و ')}`}</li>
            <li><strong>الأهداف:</strong> {fullData.goals.join(', ') || 'لم تحدد'}</li>
            <li><strong>المنصات:</strong> {fullData.platforms.map(p => PLATFORMS.find(pf => pf.id === p)?.name || p).join(', ') || 'لم تحدد'}</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <Button onClick={() => onSubmit(fullData)} className="flex-1 bg-green-600 hover:bg-green-700">✅ تأكيد وإنشاء الخطة</Button>
            <Button onClick={() => setMessages(prev => [...prev, { role: 'system', content: 'تم المسح. اكتب وصف جديد لحملتك.' }])} variant="secondary" className="flex-1">🔄 مسح والبدء من جديد</Button>
          </div>
        </div>
      ) }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: (error as Error).message }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 max-w-4xl mx-auto flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'system' ? (
              <div className="text-center w-full text-sm text-gray-500 italic py-2">{msg.content}</div>
            ) : (
              <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-lg' : 'bg-gray-800 text-gray-200 rounded-bl-lg'}`}>{msg.content}</div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-md p-3 rounded-2xl bg-gray-800 text-gray-200 rounded-bl-lg">
            <LoadingIndicator />
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-3">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="اكتب وصف حملتك هنا..." disabled={isLoading || isGreetingLoading} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none disabled:opacity-60" />
        <Button type="submit" disabled={isLoading || !inputValue.trim() || isGreetingLoading}>إرسال</Button>
      </form>
    </div>
  );
};

export default Chatbot;