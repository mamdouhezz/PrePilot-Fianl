import React from 'react';
import { Button } from './Button';
import PlatformIcon from './PlatformIcon';

interface PresetData {
  icon?: string;
  name: string;
  data: {
    budget?: number;
    goals?: string[];
    platforms?: string[];
  };
}

interface PresetCardProps {
  preset: PresetData;
  onSelect: (data: PresetData['data']) => void;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, onSelect }) => {
  const { icon = '✨', name, data } = preset;
  const budget = data.budget || 0;
  const budgetInfo = budget < 40000 ? { icon: '💰', label: 'صغيرة' } : budget <= 100000 ? { icon: '💰💰', label: 'متوسطة' } : { icon: '💰💰💰', label: 'كبيرة' };
  const primaryGoal = data.goals?.[0]?.split(' / ')[0] || 'متنوع';

  return (
    <div className="w-72 shrink-0 bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h4 className="text-lg font-bold text-white mb-2">{name}</h4>
      <div className="space-y-3 text-sm mb-6 text-start border-t border-gray-700/50 pt-4">
        <div className="flex items-center gap-3">
          <span className="w-5 text-center">{budgetInfo.icon}</span>
          <span className="text-gray-300">ميزانية {budgetInfo.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 text-center">🎯</span>
          <span className="text-gray-300">الهدف: {primaryGoal}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 text-center">📱</span>
          <div className="flex items-center gap-1.5">
            {data.platforms?.slice(0, 3).map((pId) => (
              <React.Fragment key={pId}>
                <PlatformIcon id={pId} className="w-5 h-5" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Button type="button" onClick={() => onSelect(data)} className="mt-auto w-full">
        اختر هذه الاستراتيجية
      </Button>
    </div>
  );
};

export default PresetCard;