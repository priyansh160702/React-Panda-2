import { configureStore } from "@reduxjs/toolkit";

import modalStateSlice from "./StateSlices/modal-state";
import cartAddSlice from "./StateSlices/cart-add";
import adminSlice from "./adminSlice";

const store = configureStore({
  reducer: {
    modalState: modalStateSlice.reducer,
    cartAdd: cartAddSlice.reducer,
    adminState: adminSlice.reducer,
  },
});

export const modalStateActions = modalStateSlice.actions;
export const cartAddActions = cartAddSlice.actions;
export const adminSliceActions = adminSlice.actions;

export default store;
