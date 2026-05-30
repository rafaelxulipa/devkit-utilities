
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import { useAdConsent } from '../contexts/AdConsentContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { hasConsent } = useAdConsent();
  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <Header />
      <main className={`flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${!hasConsent ? 'pb-28 sm:pb-24' : ''}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
