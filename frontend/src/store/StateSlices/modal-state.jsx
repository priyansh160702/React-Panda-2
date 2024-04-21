import { createSlice } from "@reduxjs/toolkit";

const modalStateSlice = createSlice({
  name: "modalState",
  initialState: {
    cartIsShown: false,
    adminModalIsShown: false,
    userMenuIsShown: false,
  },
  reducers: {
    show(state, action) {
      if (action.payload === "cart") {
        state.cartIsShown = true;
      }

      if (action.payload === "adminModal") {
        state.adminModalIsShown = true;
      }

      if (action.payload === "userMenu") {
        state.userMenuIsShown = true;
      }
    },
    hide(state, action) {
      if (action.payload === "cart") {
        state.cartIsShown = false;
      }

      if (action.payload === "adminModal") {
        state.adminModalIsShown = false;
      }

      if (action.payload === "userMenu") {
        state.userMenuIsShown = false;
      }
    },
  },
});

export default modalStateSlice;
