import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  token: (localStorage.getItem("token") as string) || null,
  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
