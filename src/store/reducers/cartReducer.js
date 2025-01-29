

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};


export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart = [...state.cart, item];
      }

      try {
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      } catch (error) {
        console.error("Failed to update localStorage:", error);
      }
    })
    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);

      try {
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      } catch (error) {
        console.error("Failed to update localStorage:", error);
      }
    });
});