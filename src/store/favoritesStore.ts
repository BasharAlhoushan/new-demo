import { create } from 'zustand';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const STORAGE_KEY = 'the_one_luxury_favorites';

const loadStoredFavorites = (): string[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : ['prop-pearl-01', 'prop-lusail-02', 'prop-westbay-03'];
  } catch {
    return [];
  }
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: loadStoredFavorites(),
  toggleFavorite: (id: string) => {
    const current = get().favorites;
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ favorites: updated });
  },
  isFavorite: (id: string) => get().favorites.includes(id),
  clearFavorites: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    set({ favorites: [] });
  },
}));
