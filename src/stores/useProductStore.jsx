import { create } from "zustand";
import { productService } from "../api/services.js";
import { toast } from "react-toastify";

const useProduct = create((set) => ({
  products: [],
  loading: false,

  allProducts: async () => {
    try {
      set({ loading: true });
      const response = await productService.getProducts();
      if (response.data.length > 0) {
        set({ products: response.data, loading: false });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
      set({ loading: false });
    }
  },
}));

export default useProduct;
