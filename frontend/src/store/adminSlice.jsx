import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminState",
  initialState: { isAdmin: false },
  reducers: {
    setAdminTrue(state) {
      state.isAdmin = true;
    },
    setAdminFalse(state) {
      state.isAdmin = false;
    },
  },
});

export default adminSlice;
