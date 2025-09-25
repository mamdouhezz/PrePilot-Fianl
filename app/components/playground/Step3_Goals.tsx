import React from 'react';
import Tooltip from '../../components/ui/Tooltip';
import Icon from '../../components/ui/Icon';
import PlatformIcon from '../../components/ui/PlatformIcon';
import { FiAlertTriangle } from 'react-icons/fi';
import { CampaignData } from '../../types';

const SectionCard = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-brand-navy-950 border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <h2 className="heading-responsive text-prepilot-purple-400 mb-4 sm:mb-6">{title}</h2>
        {children}
    </div>
);

type Props = {
    formData: CampaignData;
    availablePrimaryGoals: string[];
    mainGoals: string[];
    GOALS: Record<string, string[]>;
    PLATFORMS: readonly { id: string; name: string }[];
    industryPlatformCompatibility: any;
    getSuggestedPlatforms: (industry: string, goals: string[]) => string[];
    handlePrimaryGoalChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubGoalToggle: (subGoal: string) => void;
    handleSecondaryGoalToggle: (goal: string) => void;
    handlePlatformToggle: (platformId: string) => void;
    handleSeasonToggle: (season: string) => void;
    SEASONS: readonly string[] | readonly { id: string; name: string }[];
    realtimeTips: Record<string, string>;
    areTipsLoading: boolean;
};

const Step3_Goals: React.FC<Props> = ({
    formData,
    availablePrimaryGoals,
    mainGoals,
    GOALS,
    PLATFORMS,
    industryPlatformCompatibility,
    getSuggestedPlatforms,
    handlePrimaryGoalChange,
    handleSubGoalToggle,
    handleSecondaryGoalToggle,
    handlePlatformToggle,
    handleSeasonToggle,
    SEASONS,
    realtimeTips,
    areTipsLoading,
}) => {
    const primaryGoal = formData.goals[0] || '';
    const secondaryGoals = formData.goals.slice(1);
    const availableSecondaryGoals = React.useMemo(() => mainGoals.filter(g => g !== primaryGoal), [mainGoals, primaryGoal]);
    const subGoalsForPrimary = primaryGoal ? GOALS[primaryGoal as keyof typeof GOALS] : [];

    const RealtimeTip = ({ fieldName }: { fieldName: string }) => {
        const tip = realtimeTips[fieldName];
        return (
            <div className="min-h-[24px] mt-3">
                {areTipsLoading && <div className="flex items-center justify-center text-sm text-prepilot-purple-300 animate-pulse text-center mt-2">يفكر...</div>}
                {!areTipsLoading && tip && (
                    <div className="p-3 text-sm text-red-300 bg-red-900/30 border border-red-800/60 rounded-lg animate-fade-in">
                        {tip}
                    </div>
                )}
            </div>
        );
    };

    return (
        <SectionCard title="الخطوة 3: الأهداف والمنصات">
            <div className="space-y-8">
                <div>
                    <label htmlFor="primaryGoal" className="block text-gray-300 mb-2 font-bold">ما هو هدفك الأساسي؟*</label>
                    <p className="text-sm text-gray-500 mb-3">سيتم فلترة الخيارات بناءً على مرحلة الحملة التي اخترتها.</p>
                    <select 
                        id="primaryGoal" 
                        value={primaryGoal} 
                        onChange={handlePrimaryGoalChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 focus:border-prepilot-purple-500 outline-none"
                    >
                        <option value="">-- اختر الهدف الأساسي --</option>
                        {availablePrimaryGoals.map(goal => <option key={goal} value={goal}>{goal}</option>)}
                    </select>
                </div>

                {primaryGoal && subGoalsForPrimary.length > 0 && (
                    <div className="p-4 bg-brand-navy-950/50 rounded-lg border border-gray-700 animate-fade-in">
                        <label className="block text-gray-300 mb-3 font-medium">ما هي أهدافك الفرعية لـ "{primaryGoal}"؟</label>
                        <div className="flex flex-wrap gap-3">
                            {subGoalsForPrimary.map(subGoal => (
                                <button 
                                    type="button" 
                                    key={subGoal} 
                                    onClick={() => handleSubGoalToggle(subGoal)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                        formData.subGoals[primaryGoal]?.includes(subGoal) 
                                            ? 'bg-prepilot-purple-600 text-white' 
                                            : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                                >
                                    {subGoal}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                 {primaryGoal && (
                    <div>
                        <label className="block text-gray-300 mb-3 font-bold">هل لديك أهداف ثانوية؟ (اختياري)</label>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {availableSecondaryGoals.map(goal => (
                                <button 
                                    type="button" 
                                    key={goal} 
                                    onClick={() => handleSecondaryGoalToggle(goal)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        secondaryGoals.includes(goal) 
                                            ? 'bg-prepilot-purple-800/80 text-white' 
                                            : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>
                 )}

                <div className="pt-4 border-t border-gray-800">
                    <label className="block text-gray-300 mb-3 text-center font-bold">اختر المنصات الإعلانية*</label>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {PLATFORMS.map(platform => {
                            const isSuggested = getSuggestedPlatforms(formData.industry, formData.goals).includes(platform.id);
                            const isSelected = formData.platforms.includes(platform.id);
                            const compatibility = formData.industry ? industryPlatformCompatibility[formData.industry as keyof typeof industryPlatformCompatibility] : null;
                            const isDiscouraged = compatibility && 'discourage' in compatibility && !!compatibility.discourage?.some((p: string) => p === platform.id);

                            return (
                             <button type="button" key={platform.id} onClick={() => handlePlatformToggle(platform.id)} className={`p-4 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-all duration-200 relative ${isSelected ? 'border-prepilot-purple-500 bg-prepilot-purple-900/40' : `border-gray-700 bg-gray-800 hover:border-gray-500 ${isSuggested && !isDiscouraged ? 'shadow-lg shadow-prepilot-purple-900/50' : ''}`}`}>
                                 {isSuggested && !isDiscouraged && <span className="absolute top-1 right-1 text-[10px] bg-prepilot-purple-500 text-white px-1.5 py-0.5 rounded-full font-bold">مقترح</span>}
                                 {isDiscouraged && (
                                    <Tooltip text={`هذه المنصة غير موصى بها لمجال ${formData.industry}`}>
                                        <span className="absolute top-1 left-1 text-lg">!</span>
                                    </Tooltip>
                                 )}
                                 <PlatformIcon id={platform.id} className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
                                 <span className="text-xs sm:text-sm">{platform.name}</span>
                             </button>
                            );
                        })}
                    </div>
                    <RealtimeTip fieldName="platforms" />
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                     <div>
                      <label className="flex items-center text-gray-300 mb-2">المواسم والمناسبات (اختياري)</label>
                      <div className="flex flex-wrap gap-2">
                        {(SEASONS as any[]).map((season: any) => {
                            const id = typeof season === 'string' ? season : season.id;
                            const name = typeof season === 'string' ? season : season.name;
                            const selected = formData.seasons.includes(id);
                            return (
                                <button key={id} type="button" onClick={() => handleSeasonToggle(id)} className={`px-2 py-1 rounded-lg text-sm ${selected ? 'bg-prepilot-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{name}</button>
                            );
                        })}
                      </div>
                     </div>
                    <RealtimeTip fieldName="seasons" />
                </div>
            </div>
        </SectionCard>
    );
};

export default Step3_Goals;


