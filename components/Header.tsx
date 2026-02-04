
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-secondary/20 dark:border-dark-secondary/20 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-dark-primary rounded-md"
            >
              <span className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                DevKit
              </span>
              <span className="text-2xl font-light text-light-text dark:text-dark-text">
                Utilidades
              </span>
            </Link>
          </div>
          <div className="flex items-center">
             <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;