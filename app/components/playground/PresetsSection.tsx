import React from 'react';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import { FiZap, FiChevronDown, FiTrash2, FiSave, FiDollarSign, FiCrosshair, FiSmartphone } from 'react-icons/fi';
import PlatformIcon from '../../components/ui/PlatformIcon';
import { CampaignData, UserPreset } from '../../types';

type PresetLike = { name: string, icon: string, data: Omit<Partial<CampaignData>, 'goals' | 'platforms'> & { goals?: readonly string[]; platforms?: readonly string[]; }, industries?: readonly string[] };

const PresetCard = ({ preset, onSelect }: { preset: PresetLike, onSelect: (data: Partial<CampaignData>) => void }) => {
    const { icon, name, data } = preset;
    const getBudgetLevel = (budget: number) => {
        if (budget < 40000) return { label: 'صغيرة' };
        if (budget <= 100000) return { label: 'متوسطة' };
        return { label: 'كبيرة' };
    };
    const getShortDescription = (presetName: string) => {
        if (presetName.includes('وعي')) return 'لزيادة الانتشار والوصول لأكبر شريحة.';
        if (presetName.includes('Leads') || presetName.includes('عملاء')) return 'لجذب عملاء محتملين بجودة عالية.';
        if (presetName.includes('مبيعات') || presetName.includes('متجر')) return 'لتحقيق مبيعات مباشرة ورفع العائد.';
        if (presetName.includes('إطلاق')) return 'لإحداث ضجة وجذب انتباه السوق بسرعة.';
        return 'استراتيجية متوازنة لتحقيق أهدافك.';
    };
    const budgetInfo = getBudgetLevel((data.budget as number) || 0);
    const primaryGoal = (data.goals?.[0] as string | undefined)?.split(' / ')[0] || 'متنوع';
    return (
        <div className="w-72 shrink-0 bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-prepilot-purple-500 hover:shadow-2xl hover:shadow-prepilot-purple-900/40">
            <div className="text-6xl mb-4">{icon}</div>
            <h4 className="text-lg font-bold text-white mb-2">{name}</h4>
            <p className="text-sm text-gray-400 mb-6 min-h-[40px] flex-grow">
                {getShortDescription(name)}
            </p>
            <div className="space-y-3 text-sm mb-6 text-left border-t border-gray-700/50 pt-4">
                <div className="flex items-center gap-3">
                    <span className="w-5 text-center">$</span>
                    <span className="text-gray-300">ميزانية {budgetInfo.label}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-5 text-center">🎯</span>
                    <span className="text-gray-300">الهدف: {primaryGoal}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-5 text-center">📱</span>
                    <div className="flex items-center gap-1.5">
                        {data.platforms?.slice(0, 3).map(pId => (
                            <React.Fragment key={pId as string}>
                                <PlatformIcon id={pId as string} className="w-5 h-5" />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <Button
                type="button"
                onClick={() => onSelect({ ...data, goals: data.goals ? [...data.goals] : [], platforms: data.platforms ? [...data.platforms] : [] })}
                className="mt-auto w-full"
            >
                اختر هذه الاستراتيجية
            </Button>
        </div>
    );
};

type Props = {
    isPresetsOpen: boolean;
    setIsPresetsOpen: (v: boolean) => void;
    isUserPresetsOpen: boolean;
    setIsUserPresetsOpen: (v: boolean) => void;
    filteredPresets: PresetLike[];
    userPresets: UserPreset[];
    handlePresetSelect: (presetData: Partial<CampaignData>) => void;
    handleDeletePreset: (id: number) => void;
};

const PresetsSection: React.FC<Props> = ({
    isPresetsOpen,
    setIsPresetsOpen,
    isUserPresetsOpen,
    setIsUserPresetsOpen,
    filteredPresets,
    userPresets,
    handlePresetSelect,
    handleDeletePreset,
}) => {
    return (
        <div className="mb-8">
            <div className="bg-brand-navy-950 border border-gray-700 rounded-2xl">
                <button
                    type="button"
                    onClick={() => setIsPresetsOpen(!isPresetsOpen)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-yellow-400 text-2xl">⚡</span>
                        <h3 className="text-xl font-bold text-gray-200">
                            ابدأ باستراتيجية جاهزة
                        </h3>
                    </div>
                    <span className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isPresetsOpen ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                {isPresetsOpen && (
                    <div className="px-6 pb-6 border-t border-gray-800">
                        <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
                            {filteredPresets.map(preset => (
                                <React.Fragment key={preset.name}>
                                    <PresetCard preset={preset} onSelect={handlePresetSelect} />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {userPresets.length > 0 && (
                <div className="bg-brand-navy-950 border border-gray-700 rounded-2xl mt-6">
                    <button
                        type="button"
                        onClick={() => setIsUserPresetsOpen(!isUserPresetsOpen)}
                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    >
                        <div className="flex items-center gap-4">
                          <span className="text-prepilot-purple-300 text-2xl">💾</span>
                          <h3 className="text-xl font-bold text-prepilot-purple-300">
                                استراتيجياتك المحفوظة
                          </h3>
                        </div>
                        <span className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isUserPresetsOpen ? 'rotate-180' : ''}`}>⌄</span>
                    </button>
                    {isUserPresetsOpen && (
                        <div className="px-6 pb-6 border-t border-gray-800">
                            <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
                                {userPresets.map(p => (
                                  <div key={p.id} className="w-72 shrink-0 flex flex-col">
                                      <PresetCard 
                                          preset={{ name: p.name, icon: '💾', data: p.data } as PresetLike} 
                                          onSelect={() => handlePresetSelect(p.data)} 
                                      />
                                      <Button 
                                          type="button" 
                                          onClick={() => handleDeletePreset(p.id)}
                                          variant="ghost" 
                                          size="sm"
                                          className="mt-2 text-red-400 hover:bg-red-900/50 hover:text-red-300"
                                      >
                                          حذف
                                      </Button>
                                  </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PresetsSection;


