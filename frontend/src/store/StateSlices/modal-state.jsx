import { createSlice } from "@reduxjs/toolkit";

const modalStateSlice = createSlice({
  name: "modalState",
  initialState: { modalIsShown: false },
  reducers: {
    show(state) {
      state.modalIsShown = true;
    },
    hide(state) {
      state.modalIsShown = false;
    },
  },
});

export default modalStateSlice;
