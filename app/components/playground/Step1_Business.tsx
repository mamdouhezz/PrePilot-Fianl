import React from 'react';
import Tooltip from '../../components/ui/Tooltip';
import InfoIcon from '../../components/ui/InfoIcon';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import PlatformIcon from '../../components/ui/PlatformIcon';
import { FiChevronDown, FiZap, FiX, FiPlus, FiClipboard, FiAward } from 'react-icons/fi';
import { CampaignData } from '../../types';

type Props = {
    formData: CampaignData;
    dynamicQuestions?: { id: string; label: string; type?: 'select' | 'text' | 'multi-select'; options: string[] }[];
    contextualAnswers?: Record<string, string | string[]>;
    setContextualAnswers?: (v: Record<string, string | string[]>) => void;
    INDUSTRIES: any;
    AUDIENCE_AGES: readonly string[];
    AUDIENCE_GENDERS: readonly string[];
    AUDIENCE_LOCATIONS: readonly string[];
    AUDIENCE_INTERESTS: readonly string[];
    AUDIENCE_BEHAVIORS: readonly string[];
    industryTargetingSuggestions: any;
    industryAgeDefaults: any;
    isBrandDetailsOpen: boolean;
    setIsBrandDetailsOpen: (v: boolean) => void;
    isFetchingBrief: boolean;
    isEnhancing: boolean;
    areTipsLoading: boolean;
    realtimeTips: Record<string, string>;
    handleGenericChange: <T extends keyof CampaignData>(field: T, value: CampaignData[T]) => void;
    handleAudienceChange: <T extends keyof CampaignData['targetAudience']>(field: T, value: CampaignData['targetAudience'][T]) => void;
    handleLocationToggle: (loc: string) => void;
    handleInterestToggle: (id: string) => void;
    handleBehaviorToggle: (id: string) => void;
    handleAgeToggle: (age: string) => void;
    handleFetchBrandBrief: () => Promise<void>;
    handleBrandContextChange: <T extends keyof CampaignData['brandContext']>(field: T, value: CampaignData['brandContext'][T]) => void;
    handleEnhanceDetails: () => Promise<void>;
};

const SectionCard = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-brand-navy-950 border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <h2 className="heading-responsive text-prepilot-purple-400 mb-4 sm:mb-6">{title}</h2>
        {children}
    </div>
);

const MultiSelectWithSearch = ({
  label,
  tooltipText,
  options,
  selected,
  onToggle,
}: {
  label: string;
  tooltipText: string;
  options: readonly { id: string; name: string }[] | readonly string[];
  selected: string[];
  onToggle: (id: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const formattedOptions = React.useMemo(() => 
    options.map(o => (typeof o === 'string' ? { id: o, name: o } : o)), 
    [options]
  );
  const selectedItems = React.useMemo(() => formattedOptions.filter(o => selected.includes(o.id)), [formattedOptions, selected]);
  const availableItems = React.useMemo(() => formattedOptions.filter(o => 
    !selected.includes(o.id) && 
    o.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [formattedOptions, selected, searchTerm]);
  return (
    <div>
      <label className="flex items-center text-gray-300 mb-2">
        {label}
        <Tooltip text={tooltipText}>
          <InfoIcon className="inline-block mr-2 w-4 h-4 text-gray-400" />
        </Tooltip>
      </label>
      <div className="flex flex-wrap gap-2 p-2 bg-brand-navy-950 border border-gray-700 rounded-lg min-h-[44px]">
        {selectedItems.length > 0 ? selectedItems.map(item => (
          <span key={item.id} className="bg-prepilot-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1.5 animate-fade-in">
            {item.name}
            <button type="button" onClick={() => onToggle(item.id)} className="bg-prepilot-purple-800 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs hover:bg-red-500 transition-colors">
              ✕
            </button>
          </span>
        )) : <span className="text-sm text-gray-500 px-1">لم يتم اختيار شيء بعد</span>}
      </div>
      <div className="mt-2">
        <input 
          type="text" 
          placeholder="ابحث..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-1 focus:ring-prepilot-purple-500 outline-none"
        />
        <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto p-1">
          {availableItems.map(item => (
            <button key={item.id} type="button" onClick={() => onToggle(item.id)} className="px-2 py-1 bg-gray-700 text-gray-200 rounded-md text-sm hover:bg-green-600 hover:text-white transition-colors">
              + {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step1_Business: React.FC<Props> = ({
    formData,
    dynamicQuestions = [],
    contextualAnswers = {},
    setContextualAnswers,
    INDUSTRIES,
    AUDIENCE_AGES,
    AUDIENCE_GENDERS,
    AUDIENCE_LOCATIONS,
    AUDIENCE_INTERESTS,
    AUDIENCE_BEHAVIORS,
    isBrandDetailsOpen,
    setIsBrandDetailsOpen,
    isFetchingBrief,
    isEnhancing,
    areTipsLoading,
    realtimeTips,
    handleGenericChange,
    handleAudienceChange,
    handleLocationToggle,
    handleInterestToggle,
    handleBehaviorToggle,
    handleAgeToggle,
    handleFetchBrandBrief,
    handleBrandContextChange,
    handleEnhanceDetails,
}) => {
    console.log('❓ Dynamic Questions Received:', dynamicQuestions);
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

    const subIndustries = React.useMemo(() => formData.industry ? INDUSTRIES[formData.industry as keyof typeof INDUSTRIES] : [], [formData.industry, INDUSTRIES]);

    return (
        <SectionCard title="الخطوة 1: عن البزنس والجمهور">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                   <label htmlFor="industry" className="block text-gray-300 mb-2 text-sm sm:text-base">المجال الرئيسي*</label>
                   <select id="industry" value={formData.industry} onChange={e => {
                        const newIndustry = e.target.value;
                        handleGenericChange('industry', newIndustry as any);
                        handleGenericChange('subIndustry', '' as any);
                        handleAudienceChange('interests', [] as any);
                        handleAudienceChange('behaviors', [] as any);
                   }} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 focus:border-prepilot-purple-500 outline-none touch-target text-sm sm:text-base">
                        <option value="">-- اختر المجال --</option>
                        {Object.keys(INDUSTRIES).map((ind: string) => <option key={ind} value={ind}>{ind}</option>)}
                   </select>
                </div>
                <div>
                   <label htmlFor="subIndustry" className="block text-gray-300 mb-2 text-sm sm:text-base">المجال الفرعي (اختياري)</label>
                   <select id="subIndustry" value={formData.subIndustry} onChange={e => handleGenericChange('subIndustry', e.target.value as any)} disabled={!formData.industry} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-prepilot-purple-500 focus:border-prepilot-purple-500 outline-none touch-target text-sm sm:text-base">
                        <option value="">-- اختر --</option>
                        {subIndustries.map((sub: string) => <option key={sub} value={sub}>{sub}</option>)}
                   </select>
                </div>
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
                <h3 className="subheading-responsive text-prepilot-purple-300 mb-4 sm:mb-6 text-center">الجمهور المستهدف</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm sm:text-base">الفئة العمرية* (اختر واحد أو أكثر)</label>
                        <div className="flex flex-wrap gap-2">
                            {AUDIENCE_AGES.map(age => (
                                <button
                                    type="button"
                                    key={age}
                                    onClick={() => handleAgeToggle(age)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${formData.targetAudience.age.includes(age) ? 'bg-prepilot-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                                >
                                    {age}
                                </button>
                            ))}
                        </div>
                        <RealtimeTip fieldName="age_targeting" />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm sm:text-base">الجنس*</label>
                         <div className="flex gap-2">
                            {AUDIENCE_GENDERS.map(gender => (
                                <button type="button" key={gender} onClick={() => handleAudienceChange('gender', gender as any)} className={`flex-1 py-2 rounded-lg font-medium transition-colors touch-target text-sm sm:text-base ${formData.targetAudience.gender === gender ? 'bg-prepilot-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                    {gender}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block text-gray-300 mb-2 text-sm sm:text-base">المناطق الجغرافية* (اختر واحد أو أكثر)</label>
                    <div className="flex flex-wrap gap-2">
                        {AUDIENCE_LOCATIONS.map(loc => (
                            <button type="button" key={loc} onClick={() => handleLocationToggle(loc)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${formData.targetAudience.locations.includes(loc) ? 'bg-prepilot-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <MultiSelectWithSearch
                      label="الاهتمامات"
                      tooltipText="اختر الاهتمامات التي تصف جمهورك بدقة. يساعد هذا في تحسين الاستهداف."
                      options={AUDIENCE_INTERESTS}
                      selected={formData.targetAudience.interests}
                      onToggle={handleInterestToggle}
                    />
                    <MultiSelectWithSearch
                      label="السلوكيات"
                      tooltipText="اختر السلوكيات الشرائية أو الرقمية لجمهورك."
                      options={AUDIENCE_BEHAVIORS}
                      selected={formData.targetAudience.behaviors}
                      onToggle={handleBehaviorToggle}
                    />
                </div>
            </div>

            {dynamicQuestions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="subheading-responsive text-prepilot-purple-300 mb-4 sm:mb-6 text-center">أسئلة سياقية حسب المجال</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {dynamicQuestions.map((q) => (
                            <div key={q.id}>
                                <label className="block text-gray-300 mb-2 text-sm sm:text-base">{q.label}</label>
                                {q.type === 'text' ? (
                                    <input
                                        type="text"
                                        value={(contextualAnswers[q.id] as string) || ''}
                                        onChange={(e) => setContextualAnswers && setContextualAnswers({ ...contextualAnswers, [q.id]: e.target.value })}
                                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none"
                                    />
                                ) : (
                                    <select
                                        value={(contextualAnswers[q.id] as string) || ''}
                                        onChange={(e) => setContextualAnswers && setContextualAnswers({ ...contextualAnswers, [q.id]: e.target.value })}
                                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none"
                                    >
                                        <option value="">-- اختر --</option>
                                        {q.options.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <button
                    type="button"
                    onClick={() => setIsBrandDetailsOpen(!isBrandDetailsOpen)}
                    className="w-full flex justify-between items-center text-left text-xl font-bold text-prepilot-purple-300 mb-4"
                >
                    <span>معلومات إضافية عن البراند (اختياري)</span>
                    <span className={`transform transition-transform duration-300 ${isBrandDetailsOpen ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                <p className={`text-sm text-gray-500 mb-4 flex items-center gap-2 ${isBrandDetailsOpen ? 'hidden' : 'block'}`}>
                    ⚡ كلما زادت التفاصيل، كانت توصيات الذكاء الاصطناعي أكثر تخصيصًا لك!
                </p>

                {isBrandDetailsOpen && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="brandName" className="block text-gray-300 mb-2">اسم البراند</label>
                                <input type="text" id="brandName" value={formData.brandContext?.brandName || ''} onChange={e => handleBrandContextChange('brandName', e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none" />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-gray-300 mb-2">الموقع الإلكتروني</label>
                                <div className="flex gap-2">
                                    <input type="url" id="website" value={formData.brandContext?.website || ''} onChange={e => handleBrandContextChange('website', e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none" placeholder="https://example.com" />
                                    <button 
                                        type="button" 
                                        onClick={handleFetchBrandBrief} 
                                        disabled={!formData.brandContext?.website || isFetchingBrief}
                                        className="shrink-0 px-3 py-2 rounded bg-gray-700"
                                        title="تحليل الموقع تلقائيًا"
                                    >
                                        {isFetchingBrief ? 'جاري...' : 'تحليل'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="usp" className="block text-gray-300 mb-2">ما الذي يميزكم عن المنافسين؟ (USP)</label>
                            <textarea id="usp" value={formData.brandContext?.usp || ''} onChange={e => handleBrandContextChange('usp', e.target.value)} rows={2} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none" placeholder="مثال: نقدم أسرع توصيل في الرياض، منتجاتنا عضوية بالكامل..."></textarea>
                        </div>
                        <div>
                            <label htmlFor="brandTone" className="block text-gray-300 mb-2">نبرة الصوت (Tone of Voice)</label>
                            <textarea id="brandTone" value={formData.brandContext?.brandTone || ''} onChange={e => handleBrandContextChange('brandTone', e.target.value)} rows={2} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none" placeholder="مثال: نبرة احترافية ورسمية، ودودة وعصرية، فكاهية..."></textarea>
                        </div>
                        <div>
                            <label htmlFor="extraDetails" className="block text-gray-300 mb-2">أي تفاصيل إضافية تود مشاركتها؟</label>
                            <textarea id="extraDetails" value={formData.brandContext?.extraDetails || ''} onChange={e => handleBrandContextChange('extraDetails', e.target.value)} rows={3} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none" placeholder="مثال: أطلقنا للتو تطبيقًا جديدًا، لدينا عرض خاص الشهر القادم..."></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleEnhanceDetails}
                                disabled={isEnhancing}
                                className="px-4 py-2 rounded bg-gradient-to-r from-pink-600 to-rose-600"
                            >
                                {isEnhancing ? 'جاري التحسين...' : 'تحسين النص بالذكاء الاصطناعي'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </SectionCard>
    );
};

export default Step1_Business;


