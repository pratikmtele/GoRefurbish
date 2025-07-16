import { create } from "zustand";
import { authService } from "../api/services.js";
import { toast } from "react-toastify";
import api from "../api/axios.js";

const useAuth = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => {
    const userWithDefaults = {
      ...user,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      aadhaarNumber: user.aadhaarNumber,
      address: user.address,
    };
    set({ isAuthenticated: true, user: userWithDefaults });
  },
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

      if (response.data.success) {
        const userWithDefaults = {
          ...response.data.data,
          fullName: response.data.data.fullName,
          email: response.data.data.email,
          phone: response.data.data.phone,
          aadhaarNumber: response.data.data.aadhaarNumber,
          address: response.data.data.address,
        };
        set({ isAuthenticated: true, user: userWithDefaults });
      } else set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.log("Error checking authentication:", error.message);
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
