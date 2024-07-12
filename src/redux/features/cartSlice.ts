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
      const existingProduct = state.products.find(
        (product) => product._id === newProduct._id
      );

      if (existingProduct) {
        if (existingProduct.stock > 0) {
          existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
          existingProduct.stock -= 1;
          toast.info("Increased product quantity", { duration: 3000 });
        } else {
          toast.error("Out of stock, try another product.", { duration: 3000 });
        }
      } else {
        state.products.push({
          ...newProduct,
          quantity: 1,
          stock: newProduct.stock - 1,
        });
        toast.success("Added to cart", { duration: 3000 });
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product && product.stock > 0) {
        product.quantity = (product.quantity ?? 0) + 1;
        product.stock -= 1;
      } else {
        toast.error("Out of stock", { duration: 3000 });
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product && product.quantity && product.quantity > 1) {
        product.quantity -= 1;
        product.stock += 1;
      } else if (product && product.quantity === 1) {
        product.stock += 1;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state: RootState) => state.cart;
