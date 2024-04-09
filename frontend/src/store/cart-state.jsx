import { configureStore } from "@reduxjs/toolkit";

import modalStateSlice from "./StateSlices/modal-state";
import cartAddSlice from "./StateSlices/cart-add";

const store = configureStore({
  reducer: {
    modalState: modalStateSlice.reducer,
    cartAdd: cartAddSlice.reducer,
  },
});

export const modalStateActions = modalStateSlice.actions;
export const cartAddActions = cartAddSlice.actions;

export default store;
