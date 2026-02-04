
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const getInitialFavorites = (): string[] => {
    try {
        const item = window.localStorage.getItem('favorite_tools');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error reading favorites from localStorage', error);
        return [];
    }
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>(getInitialFavorites);

    useEffect(() => {
        try {
            window.localStorage.setItem('favorite_tools', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error writing favorites to localStorage', error);
        }
    }, [favorites]);

    const toggleFavorite = useCallback((toolId: string) => {
        setFavorites(prevFavorites => {
            const isAlreadyFavorite = prevFavorites.includes(toolId);
            if (isAlreadyFavorite) {
                return prevFavorites.filter(id => id !== toolId);
            } else {
                return [...prevFavorites, toolId];
            }
        });
    }, []);

    const isFavorite = useCallback((toolId: string): boolean => {
        return favorites.includes(toolId);
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
