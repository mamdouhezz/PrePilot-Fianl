/**
 * Main Landing Page Component
 * Orchestrates the entire homepage experience
 */

import React from 'react';
import { useResponsive } from './hooks/useResponsive';
import { MobileHomepage } from './MobileHomepage';
import { DesktopHomepage } from './DesktopHomepage';
import { Page } from '../../types';
import './styles/landing-page.css';

interface LandingPageProps {
  navigateTo: (page: Page) => void;
}

export default function LandingPage({ navigateTo }: LandingPageProps): React.ReactElement {
  const { isMobile } = useResponsive();

  return (
    <div className="landing-page-container">
      {isMobile ? <MobileHomepage navigateTo={navigateTo} /> : <DesktopHomepage navigateTo={navigateTo} />}
    </div>
  );
}
