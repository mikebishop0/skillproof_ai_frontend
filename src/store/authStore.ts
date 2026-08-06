import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setTokens: (tokens: { idToken: string; accessToken: string; refreshToken: string } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      idToken: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (tokens) => set({
        idToken: tokens?.idToken ?? null,
        accessToken: tokens?.accessToken ?? null,
        refreshToken: tokens?.refreshToken ?? null,
      }),
      logout: () => set({
        user: null,
        idToken: null,
        accessToken: null,
        refreshToken: null,
      }),
    }),
    { name: 'skillproof-auth' },
  ),
);

