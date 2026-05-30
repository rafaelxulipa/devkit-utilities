
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CONSENT_KEY = 'devkit_ad_consent';
const ADSENSE_CLIENT = 'ca-pub-0079702856690089';

interface AdConsentContextType {
  hasConsent: boolean;
  grantConsent: () => void;
}

const AdConsentContext = createContext<AdConsentContextType>({
  hasConsent: false,
  grantConsent: () => {},
});

export const useAdConsent = () => useContext(AdConsentContext);

function loadAdSenseScript() {
  if (document.getElementById('adsense-script')) return;
  const script = document.createElement('script');
  script.id = 'adsense-script';
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export const AdConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(
    () => localStorage.getItem(CONSENT_KEY) === 'true'
  );

  useEffect(() => {
    if (hasConsent) loadAdSenseScript();
  }, [hasConsent]);

  const grantConsent = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setHasConsent(true);
  }, []);

  return (
    <AdConsentContext.Provider value={{ hasConsent, grantConsent }}>
      {children}
    </AdConsentContext.Provider>
  );
};
