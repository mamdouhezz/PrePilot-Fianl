/**
 * Landing Analytics Hook
 * Tracks user interactions and conversions on the landing page
 */

import { useCallback } from 'react';

export interface LandingAnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useLandingAnalytics() {
  const trackEvent = useCallback((event: LandingAnalyticsEvent) => {
    // Google Analytics 4 event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    // Console log for development
    console.log('Landing Analytics Event:', event);
  }, []);

  const trackPageView = useCallback((page: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: page,
        page_location: window.location.href
      });
    }
  }, []);

  const trackConversion = useCallback((conversionType: string, value?: number) => {
    trackEvent({
      action: 'conversion',
      category: conversionType,
      value
    });
  }, [trackEvent]);

  const trackCtaClick = useCallback((ctaType: string, location: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: `${ctaType}_${location}`
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackCtaClick
  };
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
