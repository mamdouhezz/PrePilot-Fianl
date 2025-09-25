/**
 * @file PlaygroundPage.tsx
 * @description Playground page with advanced code splitting for optimal performance
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { Suspense, lazy } from 'react';
import { Page } from '../types';
import { FiSend, FiCpu } from 'react-icons/fi';
import { CampaignData } from '../types';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import BackButton from '../components/ui/BackButton';
import VersionHint from '../components/ui/VersionHint';
import StepIndicator from '../components/ui/StepIndicator';
import { usePlaygroundForm } from '../hooks/usePlaygroundForm';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import LoadingState from '../components/ui/LoadingState';

// Lazy load playground components for better performance
const Step1_Business = lazy(() => import('../components/playground/Step1_Business'));
const Step2_Strategy = lazy(() => import('../components/playground/Step2_Strategy'));
const Step3_Goals = lazy(() => import('../components/playground/Step3_Goals'));
const PresetsSection = lazy(() => import('../components/playground/PresetsSection'));

// Lazy load Chatbot component - large dependency
const Chatbot = lazy(() => import('../components/shared/Chatbot'));

// Fallback component for lazy-loaded steps
const StepFallback = () => (
  <div className="space-y-4">
    <SkeletonLoader variant="card" />
    <SkeletonLoader variant="card" />
  </div>
);

// Fallback component for Chatbot
const ChatbotFallback = () => (
  <div className="p-6 bg-gray-800 rounded-lg text-center">
    <SkeletonLoader variant="text" lines={3} />
  </div>
);

interface PlaygroundPageProps {
  navigateTo: (page: Page) => void;
  onGeneratePlan: (formData: CampaignData) => Promise<void>;
}

const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ navigateTo, onGeneratePlan }) => {
    const {
        formData,
        dynamicQuestions,
        contextualAnswers,
        setContextualAnswers,
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
    } = usePlaygroundForm(null, onGeneratePlan);

    const renderStepContent = () => {
        switch(currentStep) {
            case 1: return (
                <Suspense fallback={<StepFallback />}>
                    <Step1_Business
                    formData={formData}
                    dynamicQuestions={dynamicQuestions}
                    contextualAnswers={contextualAnswers}
                    setContextualAnswers={setContextualAnswers}
                    INDUSTRIES={INDUSTRIES}
                    AUDIENCE_AGES={AUDIENCE_AGES}
                    AUDIENCE_GENDERS={AUDIENCE_GENDERS}
                    AUDIENCE_LOCATIONS={AUDIENCE_LOCATIONS}
                    AUDIENCE_INTERESTS={AUDIENCE_INTERESTS}
                    AUDIENCE_BEHAVIORS={AUDIENCE_BEHAVIORS}
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
                    />
                </Suspense>
            );
            case 2: return (
                <Suspense fallback={<StepFallback />}>
                    <Step2_Strategy
                    formData={formData}
                    CAMPAIGN_DURATIONS={CAMPAIGN_DURATIONS}
                    FUNNEL_STAGES={FUNNEL_STAGES}
                    CONVERSION_DEFINITIONS={CONVERSION_DEFINITIONS}
                    CREATIVE_TYPES={CREATIVE_TYPES}
                    COMPETITOR_CONTEXTS={COMPETITOR_CONTEXTS}
                    handleGenericChange={handleGenericChange}
                    />
                </Suspense>
            );
            case 3: return (
                <Suspense fallback={<StepFallback />}>
                    <Step3_Goals
                    formData={formData}
                    availablePrimaryGoals={availablePrimaryGoals}
                    mainGoals={mainGoals}
                    GOALS={GOALS}
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
                </Suspense>
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
                        <Suspense fallback={<StepFallback />}>
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
                        </Suspense>
                        
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
                                    leftIcon={<Icon as={FiSend} />}
                                >
                                    حفظ كـ Preset
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    leftIcon={<Icon as={isSubmitting ? FiCpu : FiSend} className={isSubmitting ? 'animate-spin' : ''} />}
                                >
                                    {isSubmitting ? 'جاري التحليل...' : (currentStep < totalSteps ? 'التالي' : 'إنشاء الخطة')}
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <Suspense fallback={<ChatbotFallback />}>
                        <Chatbot onSubmit={(data) => {
                            // This would be handled by the hook in a real implementation
                            console.log('AI Chat data:', data);
                        }}/>
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default PlaygroundPage;
