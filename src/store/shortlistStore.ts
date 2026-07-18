import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShortlistState {
  shortlistedIds: string[];
  toggle: (id: string) => void;
  isShortlisted: (id: string) => boolean;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      shortlistedIds: [],
      toggle: (id) =>
        set((state) => ({
          shortlistedIds: state.shortlistedIds.includes(id)
            ? state.shortlistedIds.filter((existing) => existing !== id)
            : [...state.shortlistedIds, id],
        })),
      isShortlisted: (id) => get().shortlistedIds.includes(id),
    }),
    { name: 'skillproof-shortlist' },
  ),
);
