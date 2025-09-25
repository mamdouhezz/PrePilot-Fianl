/**
 * Mobile Homepage Component
 * Optimized mobile experience with touch-friendly interface
 */

import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { TrustSection } from './sections/TrustSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { useLandingAnalytics } from './hooks/useLandingAnalytics';
import { Page } from '../../types';

interface MobileHomepageProps {
  navigateTo: (page: Page) => void;
}

export const MobileHomepage: React.FC<MobileHomepageProps> = ({ navigateTo }) => {
  const { trackPageView } = useLandingAnalytics();

  React.useEffect(() => {
    trackPageView('mobile-homepage');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection isMobile={true} navigateTo={navigateTo} />
      <TrustSection isMobile={true} />
      <FeaturesSection isMobile={true} />
    </div>
  );
};
