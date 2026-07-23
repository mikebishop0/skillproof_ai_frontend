import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedProfilesState {
  savedIds: string[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedProfilesStore = create<SavedProfilesState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      toggle: (id) =>
        set((state) => ({
          savedIds: state.savedIds.includes(id)
            ? state.savedIds.filter((existing) => existing !== id)
            : [...state.savedIds, id],
        })),
      isSaved: (id) => get().savedIds.includes(id),
    }),
    { name: 'skillproof-saved-profiles' },
  ),
);
