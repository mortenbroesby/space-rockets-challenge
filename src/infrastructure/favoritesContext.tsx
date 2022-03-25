/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { LRUCache } from "typescript-lru-cache";

import { LocalStorage, noop } from "../utils";
import { Launch, LaunchPad } from "../domains";

const LocalStorageKey = "Favorites";

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

let launchesCache: LRUCache<string, FavoriteItem>;
let launchPadCache: LRUCache<string, FavoriteItem>;

const favoriteCacheMap = {
  Launch: () => launchesCache,
  LaunchPad: () => launchPadCache,
};

interface EvictedFavorite {
  key: string;
  value: FavoriteItem;
  isExpired: boolean;
}

function initialiseCache(updateFn: (entry: EvictedFavorite) => void) {
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

function getStoredFavorites(): FavoriteItem[] {
  const storedFavorites = LocalStorage.getItem(LocalStorageKey);
  if (storedFavorites) {
    try {
      return JSON.parse(storedFavorites) as FavoriteItem[];
    } catch (error) {
      console.warn("Error parsing stored favorites");
    }
  }

  return [];
}

function storeFavorites(favorites: FavoriteItem[]) {
  LocalStorage.setItem(LocalStorageKey, JSON.stringify(favorites));
}

export const FavoritesProvider: FunctionComponent = ({ children }) => {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [isCacheInitialised, setCacheInitialised] = useState(false);

  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialStore());

  /**
   * Initialise cache and restore from local-storage
   */
  useEffect(() => {
    if (isCacheInitialised) return;

    setCacheInitialised(true);
    initialiseCache(onCacheEviction);

    getStoredFavorites().forEach((item) => {
      addToFavorites(item);
    });
  }, [isCacheInitialised]);

  function onCacheEviction() {
    updateFavorites();
  }

  function isFavorited(favoriteId: string): boolean {
    const cacheEntry = favorites.find((item) => item.id.includes(favoriteId));
    return Boolean(cacheEntry);
  }

  function addToFavorites({ id, type, payload }: FavoriteItem) {
    const targetCache = favoriteCacheMap[type];
    if (!targetCache) {
      throw new Error("Cache type does not exist");
    }

    targetCache().set(id, { id, type, payload });
    updateFavorites();
  }

  function removeFromFavorites({ id, type }: RemoveFavoriteItem) {
    const targetCache = favoriteCacheMap[type];
    if (!targetCache) {
      throw new Error("Cache type does not exist");
    }

    targetCache().delete(id);
    updateFavorites();
  }

  function updateFavorites() {
    const updatedFavorites: FavoriteItem[] = [];

    Object.values(favoriteCacheMap).forEach((cacheEntry) => {
      cacheEntry().forEach((item) => {
        updatedFavorites.push(item);
      });
    });

    storeFavorites(updatedFavorites);
    setFavorites(updatedFavorites);
  }

  function clearFavorites() {
    launchesCache.clear();
    setFavorites(initialStore());
    updateFavorites();
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
