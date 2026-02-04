
import React from 'react';
import { Link } from 'react-router-dom';
import type { Tool } from '../types';
import Card from '../components/Card';
import { useFavorites } from '../contexts/FavoritesContext';

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
);

interface CategoryPageProps {
  category: {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  tools: Tool[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, tools }) => {
  const { name, description, icon: Icon } = category;
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div>
        <div className="mb-8">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link
                            to="/"
                            className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary focus:outline-none focus:ring-1 focus:ring-light-primary dark:focus:ring-dark-primary rounded"
                        >
                            Início
                        </Link>
                    </li>
                    <li>
                        <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-light-secondary/50 dark:text-dark-secondary/50" />
                    </li>
                    <li>
                        <span className="font-semibold text-light-text dark:text-dark-text" aria-current="page">
                            {name}
                        </span>
                    </li>
                </ol>
            </nav>

            <div className="flex items-center space-x-4 mt-4">
                <div className="p-3 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg text-light-primary dark:text-dark-primary">
                    <Icon className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">{name}</h1>
                    <p className="text-light-secondary dark:text-dark-secondary mt-1">{description}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
                <Link to={`/${tool.path}`} key={tool.id} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-dark-primary rounded-xl">
                  <Card 
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      isFavorite={isFavorite(tool.id)}
                      onToggleFavorite={() => toggleFavorite(tool.id)}
                  />
                </Link>
            ))}
        </div>
    </div>
  );
};

export default CategoryPage;