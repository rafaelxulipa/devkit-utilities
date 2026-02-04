
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-auto py-6 border-t border-light-secondary/20 dark:border-dark-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-light-secondary dark:text-dark-text/60">
        <p>&copy; {currentYear} DevKit Utilidades. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
