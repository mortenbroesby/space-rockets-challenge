import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { noop } from "../../utils";

import { FavoriteItem } from "./types";

interface FavoriteContextType {
  favorites: FavoriteItem[];
  addToFavorites: (id: string) => boolean;
  removeFromFavorites: (id: string) => boolean;
  clearFavorites: () => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  addToFavorites: noop,
  removeFromFavorites: noop,
  clearFavorites: noop,
});

export const useMenuContext: () => FavoriteContextType = () => {
  return useContext(FavoriteContext);
};

export const FavoritesProvider: FunctionComponent = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  function addToFavorites(id: string) {
    setFavorites([]);
    return true;
  }

  function removeFromFavorites(id: string) {
    setFavorites([]);
    return true;
  }

  function clearFavorites() {
    setFavorites([]);
  }

  const value = useMemo(
    () => ({ favorites, addToFavorites, removeFromFavorites, clearFavorites }),
    [favorites]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoritesProvider.displayName = "FavoritesProvider";
