/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { LRUCache } from "typescript-lru-cache";

import { noop } from "../utils";
import { Launch, LaunchPad } from "../domains/types";

export type FavoriteType = "Launch" | "LaunchPad";
export type FavoritePayload = Launch | LaunchPad;

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  payload: FavoritePayload;
}

interface FavoriteContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (item: FavoriteItem) => void;
  clearFavorites: () => void;
  isFavorited: (id: string) => boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const initialStore: () => FavoriteItem[] = () => {
  return [];
};

const initialState: () => FavoriteContextType = () => {
  return {
    favorites: initialStore(),
    addToFavorites: noop,
    removeFromFavorites: noop,
    clearFavorites: noop,
    isFavorited: noop,
    isDrawerOpen: false,
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

const cacheSize = 3;

let favoritesCache: LRUCache<string, FavoriteItem>;

export const FavoritesProvider: FunctionComponent = ({ children }) => {
  if (!favoritesCache) {
    favoritesCache = new LRUCache<string, FavoriteItem>({
      maxSize: cacheSize,
      onEntryEvicted: () => {
        updateFavorites();
      },
    });
  }

  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialStore());
  const [lastUpdatedTimestamp, setUpdatedTimestamp] = useState(Date.now());
  const [isDrawerOpen, setDrawerOpenState] = useState(false);

  function isFavorited(favoriteId: string): boolean {
    const cacheEntry = favorites.find((item) => item.id.includes(favoriteId));
    return Boolean(cacheEntry);
  }

  function addToFavorites({ id, type, payload }: FavoriteItem) {
    favoritesCache.set(id, { id, type, payload });
    updateFavorites();
  }

  function removeFromFavorites({ id }: FavoriteItem) {
    favoritesCache.delete(id);
    updateFavorites();
  }

  function updateFavorites() {
    const updatedFavorites: FavoriteItem[] = [];

    favoritesCache.forEach((item) => {
      updatedFavorites.push(item);
    });

    setFavorites(updatedFavorites);
    setUpdatedTimestamp(Date.now());
  }

  function clearFavorites() {
    favoritesCache.clear();
    setFavorites(initialStore());
  }

  function openDrawer() {
    setDrawerOpenState(true);
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
      isFavorited,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [favorites, lastUpdatedTimestamp, isDrawerOpen]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoritesProvider.displayName = "FavoritesProvider";
