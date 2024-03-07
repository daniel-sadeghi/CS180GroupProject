import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [currentFavorites, setCurrentFavorites] = useState([]);

  return (
    <FavoriteContext.Provider value={{ currentFavorites, setCurrentFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);