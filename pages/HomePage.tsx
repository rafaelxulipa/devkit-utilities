
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { ALL_TOOLS, CATEGORIES } from '../constants';
import type { Tool } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isFavorite, toggleFavorite, favorites } = useFavorites();

  const favoriteTools = useMemo(() => {
    return ALL_TOOLS.filter(tool => favorites.includes(tool.id));
  }, [favorites]);
  
  const filteredTools = useMemo(() => {
    if (!searchTerm) return [];
    return ALL_TOOLS.filter(tool => 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const renderToolGrid = (tools: Tool[], title: string) => {
    if (tools.length === 0) return null;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">{title}</h2>
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

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text">
          Suas <span className="text-light-primary dark:text-dark-primary">Ferramentas</span> Essenciais
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-light-secondary dark:text-dark-secondary">
          Tudo o que você precisa para simplificar tarefas diárias, em um só lugar. Rápido, moderno e eficiente.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-light-secondary dark:text-dark-secondary">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Buscar ferramenta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-light-card dark:bg-dark-card border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {searchTerm ? renderToolGrid(filteredTools, `Resultados para "${searchTerm}"`) : (
        <>
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">Categorias</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CATEGORIES.map(category => {
                        return (
                            <Link
                                key={category.name}
                                to={`/category/${category.path}`}
                                className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-dark-primary rounded-xl"
                            >
                              <div
                                  className="flex items-center space-x-3 p-3 bg-light-card dark:bg-dark-card rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-dark-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent group-hover:border-light-primary/50 dark:group-hover:border-dark-primary/50"
                              >
                                  <div className="text-light-primary dark:text-dark-primary">
                                      <category.icon className="w-6 h-6" />
                                  </div>
                                  <h3 className="text-sm font-semibold text-light-text dark:text-dark-text group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors duration-300">
                                      {category.name}
                                  </h3>
                              </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {renderToolGrid(favoriteTools, "Ferramentas Favoritas")}
            {renderToolGrid(ALL_TOOLS, "Todas as Ferramentas")}
        </>
      )}
    </div>
  );
};

export default HomePage;