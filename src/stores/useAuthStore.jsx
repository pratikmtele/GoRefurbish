import { create } from 'zustand'
import {authService} from '../api/services.js';
import { toast } from 'react-toastify';

const useAuth = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (user, token) => set({ isAuthenticated: true, user, token }),
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
  checkAuth: async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        set({ isAuthenticated: true, user });
        toast.success('Welcome back!');
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ isAuthenticated: false, user: null });
    }
  },
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))

export default useAuth;