import { create } from "zustand";
import { authService } from "../api/services.js";
import { toast } from "react-toastify";
import api from "../api/axios.js";

const useAuth = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: async () => {
    try {
      await authService.logout();
      set({ isAuthenticated: false, user: null, token: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/users/current");

      if (response.data.success)
        set({ isAuthenticated: true, user: response.data.data });
      else set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.log("Error checking authentication:", error.message);
    }
  },

  performLogin: (user, token) => {
    set({ isAuthenticated: true, user, token });
  },
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuth;
