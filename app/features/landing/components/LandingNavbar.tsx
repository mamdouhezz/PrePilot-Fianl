/**
 * LandingNavbar Component
 * Professional, modern navbar with glassmorphism effect and scroll awareness
 */

import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import { Page } from '../../../types';

interface LandingNavbarProps {
  navigateTo: (page: Page) => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'features', label: 'المميزات', href: '#features' },
  { id: 'pricing', label: 'الأسعار', href: '#pricing' },
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'contact', label: 'اتصل بنا', href: '#contact' },
];

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track scroll position for background effect (simplified without framer-motion)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="landing-container">
        <div className="flex items-center justify-between py-4">
          {/* Left Section: Logo & Brand */}
          <div
            onClick={scrollToTop}
            className="flex items-center space-x-3 space-x-reverse cursor-pointer group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              PrePilot
            </span>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(item.href);
                }}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Right Section: CTA Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="secondary"
              size="sm"
              className="hidden sm:flex"
            >
              تسجيل الدخول
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigateTo('playground')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ابدأ مجاناً
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
