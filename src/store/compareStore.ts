import { create } from 'zustand';
import { Property } from '../types';

interface CompareState {
  properties: Property[];
  addToCompare: (property: Property) => boolean; // returns true if added, false if max reached
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  maxLimit: number;
}

const STORAGE_KEY = 'the_one_luxury_compare';

const loadStoredCompare = (): Property[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const useCompareStore = create<CompareState>((set, get) => ({
  properties: loadStoredCompare(),
  maxLimit: 4,
  addToCompare: (property: Property) => {
    const current = get().properties;
    if (current.some((p) => p.id === property.id)) {
      return true;
    }
    if (current.length >= get().maxLimit) {
      return false;
    }
    const updated = [...current, property];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ properties: updated });
    return true;
  },
  removeFromCompare: (id: string) => {
    const updated = get().properties.filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ properties: updated });
  },
  isInCompare: (id: string) => {
    return get().properties.some((p) => p.id === id);
  },
  clearCompare: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    set({ properties: [] });
  },
}));
