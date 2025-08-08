import { create } from "zustand";
import { authService } from "../api/services.js";
import { toast } from "react-toastify";
import api from "../api/axios.js";

const useAuth = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: (user) => {
    set({ isAuthenticated: true, user, isLoading: false });
  },
  logout: async () => {
    try {
      await authService.logout();
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/users/current");

      if (response.data.success) {
        set({
          isAuthenticated: true,
          user: response.data.data,
          isLoading: false,
        });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch (error) {
      console.log("Error checking authentication:", error.message);
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },

  setUser: (user) => set({ user }),

  updateUser: (updates) =>
    set((state) => ({
      user: { ...state.user, ...updates },
    })),
  setToken: (token) => set({ token }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuth;
