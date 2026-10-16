import { create } from 'zustand';

interface RecentlyViewedState {
  recentIds: string[];
  addRecentlyViewed: (id: string) => void;
}

const STORAGE_KEY = 'the_one_luxury_recent';

const loadStoredRecent = (): string[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : ['prop-pearl-01', 'prop-lusail-02', 'prop-msheireb-05', 'prop-westbay-03'];
  } catch {
    return [];
  }
};

export const useRecentlyViewedStore = create<RecentlyViewedState>((set, get) => ({
  recentIds: loadStoredRecent(),
  addRecentlyViewed: (id: string) => {
    const current = get().recentIds.filter((item) => item !== id);
    const updated = [id, ...current].slice(0, 8); // Keep top 8
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ recentIds: updated });
  },
}));
