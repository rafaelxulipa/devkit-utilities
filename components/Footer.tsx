
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-auto py-6 border-t border-light-secondary/20 dark:border-dark-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-light-secondary dark:text-dark-text/60">
        <p>&copy; {currentYear} DevKit Utilidades. Todos os direitos reservados.</p>
        <p className="mt-1 text-xs">
          <Link
            to="/politica-de-privacidade"
            className="underline hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            Política de Privacidade
          </Link>
          {' · '}
          <span>Mantido com 💙 e anúncios do Google AdSense</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
