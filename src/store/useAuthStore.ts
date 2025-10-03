import { create } from "zustand";

interface AuthState {
  user: { uid: string } | null;
  setUser: (user: { uid: string } | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));