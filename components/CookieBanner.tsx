
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdConsent } from '../contexts/AdConsentContext';

const CookieBanner: React.FC = () => {
  const { hasConsent, grantConsent } = useAdConsent();

  if (hasConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl animate-fade-in">
      <div className="bg-light-card dark:bg-dark-card border-t-2 border-light-primary/50 dark:border-dark-primary/50">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="text-xl shrink-0 mt-0.5" role="img" aria-label="anúncio">📢</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-light-text dark:text-dark-text">
                  Ajude a manter o DevKit Utilidades gratuito!
                </p>
                <p className="text-xs text-light-secondary dark:text-dark-text/70 mt-0.5 leading-relaxed">
                  Usamos anúncios do Google AdSense para cobrir os custos de hospedagem e
                  manutenção deste projeto gratuito. Sem anúncios, não conseguimos mantê-lo
                  funcionando para todos.{' '}
                  <Link
                    to="/politica-de-privacidade"
                    className="underline text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity"
                  >
                    Ver Política de Privacidade
                  </Link>
                </p>
              </div>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <button
                onClick={grantConsent}
                className="w-full sm:w-auto px-6 py-2.5 bg-light-primary dark:bg-dark-primary text-white text-sm font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                ✓ Aceitar anúncios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
