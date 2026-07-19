import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart ? JSON.parse(savedCart) : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItems = state.items.find(
        (item) => item.id === action.payload.id,
      );

      existingItems
        ? (existingItems.quantity += 1)
        : state.items.push({
            ...action.payload,
            quantity: 1,
          });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart,increaseQuantity,decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
