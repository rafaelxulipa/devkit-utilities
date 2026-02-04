
import React from 'react';
import { Link } from 'react-router-dom';
import type { Tool } from '../types';
import { CATEGORIES } from '../constants';
import { useFavorites } from '../contexts/FavoritesContext';

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
);

const StarIconSolid = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

const StarIconOutline = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

interface ToolPageProps {
  tool: Tool;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool }) => {
  const { title, description, icon: Icon, component: ToolComponent, category, id } = tool;
  const categoryInfo = CATEGORIES.find(c => c.name === category);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isToolFavorite = isFavorite(id);

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
                    {categoryInfo && (
                        <>
                            <li>
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-light-secondary/50 dark:text-dark-secondary/50" />
                            </li>
                            <li>
                                <Link
                                    to={`/category/${categoryInfo.path}`}
                                    className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary focus:outline-none focus:ring-1 focus:ring-light-primary dark:focus:ring-dark-primary rounded"
                                >
                                    {tool.category}
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-light-secondary/50 dark:text-dark-secondary/50" />
                    </li>
                    <li>
                        <span className="font-semibold text-light-text dark:text-dark-text" aria-current="page">
                            {title}
                        </span>
                    </li>
                </ol>
            </nav>

            <div className="flex items-start justify-between mt-4">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg text-light-primary dark:text-dark-primary">
                        <Icon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h1>
                        <p className="text-light-secondary dark:text-dark-secondary mt-1">{description}</p>
                    </div>
                </div>
                 <button
                    onClick={() => toggleFavorite(id)}
                    className="ml-4 flex-shrink-0 p-2 rounded-full text-light-secondary/80 hover:text-yellow-500 dark:text-dark-secondary/80 dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label={isToolFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                    {isToolFavorite ? <StarIconSolid className="w-7 h-7 text-yellow-500 dark:text-yellow-400" /> : <StarIconOutline className="w-7 h-7" />}
                </button>
            </div>
        </div>

        <div className="bg-light-card dark:bg-dark-card p-6 sm:p-8 rounded-xl shadow-md">
            <ToolComponent />
        </div>
    </div>
  );
};

export default ToolPage;