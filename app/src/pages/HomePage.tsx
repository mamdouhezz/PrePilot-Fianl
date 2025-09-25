import React from 'react';
import LandingPage from '../features/landing';
import { Page } from '../types';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
  return <LandingPage navigateTo={navigateTo} />;
}