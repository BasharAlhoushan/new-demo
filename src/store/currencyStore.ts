import { create } from 'zustand';

interface CurrencyState {
  currency: 'QAR' | 'USD';
  setCurrency: (c: 'QAR' | 'USD') => void;
  toggleCurrency: () => void;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: (localStorage.getItem('the_one_currency') as 'QAR' | 'USD') || 'QAR',
  setCurrency: (currency) => {
    localStorage.setItem('the_one_currency', currency);
    set({ currency });
  },
  toggleCurrency: () => {
    const next = get().currency === 'QAR' ? 'USD' : 'QAR';
    localStorage.setItem('the_one_currency', next);
    set({ currency: next });
  },
}));
