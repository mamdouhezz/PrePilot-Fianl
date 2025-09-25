import React from 'react';
import type { Page, CampaignData } from '../../types';
import { FiSend, FiCpu } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { industryTargetingSuggestions, industryAgeDefaults, GOALS as GOALS_CONST } from '../constants';
import BackButton from '../../components/ui/BackButton';
import VersionHint from '../../components/ui/VersionHint';
import StepIndicator from '../../components/ui/StepIndicator';
import { usePlaygroundForm } from '../hooks/usePlaygroundForm';
import Step1_Business from '../features/playground/Step1_Business';
import Step2_Strategy from '../features/playground/Step2_Strategy';
import Step3_Goals from '../features/playground/Step3_Goals';
import PresetsSection from '../features/playground/PresetsSection';

const Chatbot: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => (
    <div className="p-6 bg-gray-800 rounded-lg text-center">
        <h3 className="text-xl font-bold">AI Chat</h3>
        <p className="text-gray-400 mt-2">Chatbot functionality will be available soon.</p>
    </div>
);

interface PlaygroundPageProps {
  navigateTo: (page: Page) => void;
  onGeneratePlan: (formData: CampaignData) => Promise<void>;
}

const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ navigateTo, onGeneratePlan }) => {
    const {
        formData,
        activeTab,
        setActiveTab,
        currentStep,
        totalSteps,
        userPresets,
        isSubmitting,
        isEnhancing,
        isFetchingBrief,
        isBrandDetailsOpen,
        setIsBrandDetailsOpen,
        isPresetsOpen,
        setIsPresetsOpen,
        isUserPresetsOpen,
        setIsUserPresetsOpen,
        realtimeTips,
        areTipsLoading,
        availablePrimaryGoals,
        primaryGoal,
        secondaryGoals,
        filteredPresets,
        mainGoals,
        prevStep,
        handleGenericChange,
        handleAudienceChange,
        handleSubmitOrNext,
        handleStepClick,
        handlePresetSelect,
        handleSavePreset,
        handleDeletePreset,
        handleLocationToggle,
        handleInterestToggle,
        handleBehaviorToggle,
        handleAgeToggle,
        handleSeasonToggle,
        handlePlatformToggle,
        handlePrimaryGoalChange,
        handleSubGoalToggle,
        handleSecondaryGoalToggle,
        handleBrandContextChange,
        handleFetchBrandBrief,
        handleEnhanceDetails,
        getSuggestedPlatforms,
        AUDIENCE_AGES,
        AUDIENCE_GENDERS,
        AUDIENCE_LOCATIONS,
        AUDIENCE_INTERESTS,
        AUDIENCE_BEHAVIORS,
        INDUSTRIES,
        PLATFORMS,
        SEASONS,
        CAMPAIGN_DURATIONS,
        FUNNEL_STAGES,
        CONVERSION_DEFINITIONS,
        CREATIVE_TYPES,
        COMPETITOR_CONTEXTS,
        industryPlatformCompatibility,
        GOALS,
        dynamicQuestions,
    } = usePlaygroundForm(null, onGeneratePlan);

    const renderStepContent = () => {
        switch(currentStep) {
            case 1: return (
                <Step1_Business
                    formData={formData}
                    INDUSTRIES={INDUSTRIES}
                    AUDIENCE_AGES={AUDIENCE_AGES}
                    AUDIENCE_GENDERS={AUDIENCE_GENDERS}
                    AUDIENCE_LOCATIONS={AUDIENCE_LOCATIONS}
                    AUDIENCE_INTERESTS={AUDIENCE_INTERESTS}
                    AUDIENCE_BEHAVIORS={AUDIENCE_BEHAVIORS}
                    industryTargetingSuggestions={industryTargetingSuggestions}
                    industryAgeDefaults={industryAgeDefaults}
                    isBrandDetailsOpen={isBrandDetailsOpen}
                    setIsBrandDetailsOpen={setIsBrandDetailsOpen}
                    isFetchingBrief={isFetchingBrief}
                    isEnhancing={isEnhancing}
                    areTipsLoading={areTipsLoading}
                    realtimeTips={realtimeTips}
                    handleGenericChange={handleGenericChange}
                    handleAudienceChange={handleAudienceChange}
                    handleLocationToggle={handleLocationToggle}
                    handleInterestToggle={handleInterestToggle}
                    handleBehaviorToggle={handleBehaviorToggle}
                    handleAgeToggle={handleAgeToggle}
                    handleFetchBrandBrief={handleFetchBrandBrief}
                    handleBrandContextChange={handleBrandContextChange}
                    handleEnhanceDetails={handleEnhanceDetails}
                    dynamicQuestions={dynamicQuestions}
                />
            );
            case 2: return (
                <Step2_Strategy
                    formData={formData}
                    CAMPAIGN_DURATIONS={CAMPAIGN_DURATIONS}
                    FUNNEL_STAGES={FUNNEL_STAGES}
                    CONVERSION_DEFINITIONS={CONVERSION_DEFINITIONS}
                    CREATIVE_TYPES={CREATIVE_TYPES}
                    COMPETITOR_CONTEXTS={COMPETITOR_CONTEXTS}
                    realtimeTips={realtimeTips}
                    areTipsLoading={areTipsLoading}
                    handleGenericChange={handleGenericChange as any}
                />
            );
            case 3: return (
                <Step3_Goals
                    formData={formData}
                    availablePrimaryGoals={availablePrimaryGoals}
                    mainGoals={mainGoals}
                    GOALS={GOALS_CONST as unknown as Record<string, string[]>}
                    PLATFORMS={PLATFORMS}
                    industryPlatformCompatibility={industryPlatformCompatibility}
                    getSuggestedPlatforms={getSuggestedPlatforms}
                    handlePrimaryGoalChange={handlePrimaryGoalChange}
                    handleSubGoalToggle={handleSubGoalToggle}
                    handleSecondaryGoalToggle={handleSecondaryGoalToggle}
                    handlePlatformToggle={handlePlatformToggle}
                    handleSeasonToggle={handleSeasonToggle}
                    SEASONS={SEASONS}
                    realtimeTips={realtimeTips}
                    areTipsLoading={areTipsLoading}
                />
            );
            default: return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <VersionHint className="mb-8" />
            
            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-prepilot-purple-400 to-pink-500">
                    إعداد خطة الـ PrePilot
                </h1>
                <p className="text-lg text-gray-400">كلما كانت مدخلاتك أدق، كانت الخطة أكثر واقعية.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center border-b border-gray-700 mb-8">
                    <button onClick={() => setActiveTab('manual')} className={`px-6 py-3 text-lg font-medium transition-colors ${activeTab === 'manual' ? 'text-prepilot-purple-400 border-b-2 border-prepilot-purple-400' : 'text-gray-400 hover:text-white'}`}>
                        Wizard (معالج الإعداد)
                    </button>
                    <button onClick={() => setActiveTab('ai')} className={`px-6 py-3 text-lg font-medium transition-colors relative ${activeTab === 'ai' ? 'text-prepilot-purple-400 border-b-2 border-prepilot-purple-400' : 'text-gray-400 hover:text-white'}`}>
                        AI Chat
                        <span className="absolute top-2 right-0 text-xs bg-pink-500 text-white font-bold px-2 py-0.5 rounded-full">جديد</span>
                    </button>
                </div>
                
                {activeTab === 'manual' ? (
                    <form onSubmit={handleSubmitOrNext}>
                        <PresetsSection
                            isPresetsOpen={isPresetsOpen}
                            setIsPresetsOpen={setIsPresetsOpen}
                            isUserPresetsOpen={isUserPresetsOpen}
                            setIsUserPresetsOpen={setIsUserPresetsOpen}
                            filteredPresets={filteredPresets}
                            userPresets={userPresets}
                            handlePresetSelect={handlePresetSelect}
                            handleDeletePreset={handleDeletePreset}
                        />
                        
                        <StepIndicator current={currentStep} onStepClick={handleStepClick} />
                        
                        {renderStepContent()}
                        
                        <div className="mt-12 flex justify-between items-center">
                            <div>
                                {currentStep > 1 && <BackButton onClick={prevStep} />}
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleSavePreset}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Icon as={FiSend} />
                                    حفظ كـ Preset
                                    </span>
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Icon as={isSubmitting ? FiCpu : FiSend} className={isSubmitting ? 'animate-spin' : ''} />
                                        {isSubmitting ? 'جاري التحليل...' : (currentStep < totalSteps ? 'التالي' : 'إنشاء الخطة')}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <Chatbot onSubmit={(data) => {
                        // This would be handled by the hook in a real implementation
                        console.log('AI Chat data:', data);
                    }}/>
                )}
            </div>
        </div>
    );
};

export default PlaygroundPage;
