import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../pages/products/Product.interface";
import { toast } from "sonner";
import { RootState } from "../store";

type TCartState = {
  products: TProduct[];
};

const initialState: TCartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      const newProduct = action.payload;
      const exists = state.products.some(
        (product) => product._id === newProduct._id
      );
      if (!exists) {
        state.products.push(newProduct);
        toast.success("Added to cart", { duration: 3000 });
      } else {
        toast.error("Already exists in cart", { duration: 3000 });
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state: RootState) => state.cart;
