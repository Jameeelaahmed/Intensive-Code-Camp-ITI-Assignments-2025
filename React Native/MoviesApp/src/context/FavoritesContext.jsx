import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (movie) => {
        setFavorites(prev => {
            if (!prev.find(fav => fav.imdbID === movie.imdbID)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeFavorite = (movieId) => {
        setFavorites(prev => prev.filter(fav => fav.imdbID !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.imdbID === movieId);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
