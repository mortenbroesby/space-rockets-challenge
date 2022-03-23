/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react";

import { noop } from "../../utils";
import { Launch, LaunchPad } from "../types";

export enum FavoriteType {
  Launch = "Launch",
  LaunchPad = "LaunchPad",
}

export interface FavoritesStore {
  launches: Launch[];
  launchPads: LaunchPad[];
}

interface FavoriteContextType {
  favorites: FavoritesStore;
  addToFavorites: (id: string, type: FavoriteType) => void;
  removeFromFavorites: (id: string, type: FavoriteType) => void;
  clearFavorites: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

const initialStore: () => FavoritesStore = () => {
  return {
    launches: [],
    launchPads: [],
  };
};

const initialState: () => FavoriteContextType = () => {
  return {
    isDrawerOpen: false,
    favorites: initialStore(),
    addToFavorites: noop,
    removeFromFavorites: noop,
    clearFavorites: noop,
    openDrawer: noop,
    toggleDrawer: noop,
    closeDrawer: noop,
  };
};

export const FavoriteContext = createContext<FavoriteContextType>(
  initialState()
);

export const useFavoriteContext: () => FavoriteContextType = () => {
  return useContext(FavoriteContext);
};

export const FavoritesProvider: FunctionComponent = ({ children }) => {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [favorites, setFavorites] = useState<FavoritesStore>(initialStore());

  function addToFavorites(id: string, type: FavoriteType) {
    const currentState = Object.assign({}, favorites);
    setFavorites(currentState);
  }

  function removeFromFavorites(id: string, type: FavoriteType) {
    const currentState = Object.assign({}, favorites);
    setFavorites(currentState);
  }

  function clearFavorites() {
    setFavorites(initialStore());
  }

  function openDrawer() {
    setDrawerOpenState(true);
  }

  function toggleDrawer() {
    setDrawerOpenState(!isDrawerOpen);
  }

  function closeDrawer() {
    setDrawerOpenState(false);
  }

  const value = React.useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      isDrawerOpen,
      openDrawer,
      toggleDrawer,
      closeDrawer,
    }),
    [favorites, isDrawerOpen]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoritesProvider.displayName = "FavoritesProvider";
