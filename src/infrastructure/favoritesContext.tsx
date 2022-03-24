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

export type RemoveFavoriteItem = Omit<FavoriteItem, "payload">;

interface FavoriteContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (item: RemoveFavoriteItem) => void;
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
let isCacheInitialised = false;

let launchesCache: LRUCache<string, FavoriteItem>;
let launchPadCache: LRUCache<string, FavoriteItem>;

interface EvictedFavorite {
  key: string;
  value: FavoriteItem;
  isExpired: boolean;
}

function initialiseCache(updateFn: (entry: EvictedFavorite) => void) {
  if (isCacheInitialised) return;
  isCacheInitialised = true;

  launchesCache = new LRUCache<string, FavoriteItem>({
    maxSize: cacheSize,
    onEntryEvicted: (entry) => {
      updateFn(entry);
    },
  });

  launchPadCache = new LRUCache<string, FavoriteItem>({
    maxSize: cacheSize,
    onEntryEvicted: (entry) => {
      updateFn(entry);
    },
  });
}

export const FavoritesProvider: FunctionComponent = ({ children }) => {
  initialiseCache(onCacheEviction);

  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialStore());
  const [isDrawerOpen, setDrawerOpenState] = useState(false);

  function onCacheEviction() {
    updateFavorites();
  }

  function isFavorited(favoriteId: string): boolean {
    const cacheEntry = favorites.find((item) => item.id.includes(favoriteId));
    return Boolean(cacheEntry);
  }

  function addToFavorites({ id, type, payload }: FavoriteItem) {
    if (type === "Launch") {
      launchesCache.set(id, { id, type, payload });
    } else {
      launchPadCache.set(id, { id, type, payload });
    }

    updateFavorites();
  }

  function removeFromFavorites({ id, type }: RemoveFavoriteItem) {
    if (type === "Launch") {
      launchesCache.delete(id);
    } else {
      launchPadCache.delete(id);
    }

    updateFavorites();
  }

  function updateFavorites() {
    const updatedFavorites: FavoriteItem[] = [];

    launchesCache.forEach((item) => {
      updatedFavorites.push(item);
    });

    launchPadCache.forEach((item) => {
      updatedFavorites.push(item);
    });

    setFavorites(updatedFavorites);
  }

  function clearFavorites() {
    launchesCache.clear();
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
    [favorites, isDrawerOpen]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoritesProvider.displayName = "FavoritesProvider";
