import React from 'react';
import Tooltip from '../../components/ui/Tooltip';
import InfoIcon from '../../components/ui/InfoIcon';
import { CampaignData } from '../../types';

const SectionCard = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-brand-navy-950 border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <h2 className="heading-responsive text-prepilot-purple-400 mb-4 sm:mb-6">{title}</h2>
        {children}
    </div>
);

const ToggleButton = ({ options, selected, onSelect, multiSelect = false }: { options: readonly {id: string, name: string}[], selected: string | string[], onSelect: (id: string) => void, multiSelect?: boolean }) => (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
       {options.map(option => (
           <button 
               type="button" 
               key={option.id} 
               onClick={() => onSelect(option.id)} 
               className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 touch-target ${ (multiSelect ? (selected as string[]).includes(option.id) : selected === option.id) ? 'bg-prepilot-purple-600 text-white shadow-md shadow-prepilot-purple-900/50 scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}
           >
               {option.name}
           </button>
       ))}
   </div>
);

type Props = {
    formData: CampaignData;
    CAMPAIGN_DURATIONS: readonly { id: string; name: string; description: string }[];
    FUNNEL_STAGES: readonly { id: string; name: string }[];
    CONVERSION_DEFINITIONS: readonly { id: string; name: string }[];
    CREATIVE_TYPES: readonly { id: string; name: string }[];
    COMPETITOR_CONTEXTS: readonly { id: string; name: string }[];
    handleGenericChange: <T extends keyof CampaignData>(field: T, value: CampaignData[T]) => void;
};

const Step2_Strategy: React.FC<Props> = ({
    formData,
    CAMPAIGN_DURATIONS,
    FUNNEL_STAGES,
    CONVERSION_DEFINITIONS,
    CREATIVE_TYPES,
    COMPETITOR_CONTEXTS,
    handleGenericChange,
}) => {
    const isFinancialsDisabled = formData.funnelStage !== 'conversion';
    return (
        <SectionCard title="الخطوة 2: الاستراتيجية والميزانية">
            <div className="space-y-8">
                <div>
                    <label className="block text-gray-300 text-center mb-2">الميزانية الإجمالية للحملة*</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                         <input type="range" min="5000" max="500000" step="1000" value={String(formData.budget)} onChange={e => handleGenericChange('budget', Number(e.target.value) as any)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-prepilot-purple-500" />
                         <div className="relative shrink-0">
                            <input type="number" min="5000" max="500000" step="1000" value={String(formData.budget)} onChange={e => handleGenericChange('budget', Number(e.target.value) as any)} className="w-36 p-2 bg-gray-800 border border-gray-600 rounded-lg text-center font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ريال</span>
                         </div>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-300 mb-3 text-center">مدة الحملة*</label>
                    <ToggleButton options={CAMPAIGN_DURATIONS.map(d=>({id: d.id, name: `${d.name} ${d.description}`}))} selected={formData.duration} onSelect={id => handleGenericChange('duration', id as any)} />
                </div>
                 <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-800">
                    <div>
                        <label className="block text-gray-300 mb-3 text-center">مرحلة الحملة*</label>
                        <ToggleButton options={FUNNEL_STAGES} selected={formData.funnelStage} onSelect={id => handleGenericChange('funnelStage', id as any)} />
                    </div>
                    {formData.funnelStage === 'conversion' && (
                        <div className="animate-fade-in">
                            <label className="block text-gray-300 mb-3 text-center">ما هو التحويل الأساسي؟*</label>
                            <ToggleButton options={CONVERSION_DEFINITIONS} selected={formData.conversionDefinition} onSelect={id => handleGenericChange('conversionDefinition', id as any)} />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-300 mb-3 text-center">نوع المحتوى الأساسي*</label>
                        <ToggleButton options={CREATIVE_TYPES} selected={formData.creativeType} onSelect={id => handleGenericChange('creativeType', id as any)} />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-3 text-center">مستوى المنافسة*</label>
                        <ToggleButton options={COMPETITOR_CONTEXTS} selected={formData.competitorContext} onSelect={id => handleGenericChange('competitorContext', id as any)} />
                    </div>
                </div>
                 <div className={`grid md:grid-cols-2 gap-6 pt-4 mt-6 border-t border-gray-800 transition-opacity duration-300 ${isFinancialsDisabled ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="space-y-2">
                        <label className="flex items-center justify-center text-gray-300">
                            هامش الربح*
                            <Tooltip text="النسبة المئوية للربح من كل عملية بيع بعد خصم التكاليف. يساعدنا هذا الرقم في حساب نقطة التعادل."><InfoIcon className="inline-block mr-2 w-4 h-4 text-gray-400" /></Tooltip>
                        </label>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold mb-2 text-prepilot-purple-300">{formData.profitMargin}%</div>
                            <input type="range" min="1" max="100" step="1" value={String(formData.profitMargin)} onChange={e => handleGenericChange('profitMargin', Number(e.target.value) as any)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-prepilot-purple-500 disabled:accent-gray-600" disabled={isFinancialsDisabled} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="aov" className="flex items-center justify-center text-gray-300">
                            متوسط قيمة الطلب (AOV)
                            <Tooltip text="متوسط المبلغ الذي يدفعه العميل في كل عملية شراء. اتركه فارغًا إذا كان هدفك ليس البيع المباشر."><InfoIcon className="inline-block mr-2 w-4 h-4 text-gray-400" /></Tooltip>
                        </label>
                        <div className="relative">
                            <input id="aov" type="number" value={String(formData.aov)} onChange={e => handleGenericChange('aov', Number(e.target.value) as any)} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none text-center disabled:opacity-50" placeholder="0" disabled={isFinancialsDisabled} />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">ريال</span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};

export default Step2_Strategy;


