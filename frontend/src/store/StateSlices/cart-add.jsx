import { createSlice } from "@reduxjs/toolkit";

const cartAddSlice = createSlice({
  name: "cartAdd",
  initialState: { items: [], totalAmount: 0, totalQuantity: 0 },
  reducers: {
    updateItems(state, action) {
      const { id, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalAmount += price * quantity;
      state.totalQuantity += quantity;
    },
    removeItem(state, action) {
      const id = action.payload;
      const removedItem = state.items.find((item) => item.id === id);

      if (!removedItem) {
        return;
      }

      if (removedItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        removedItem.quantity--;
      }

      state.totalQuantity--;
      state.totalAmount -= removedItem.price;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export default cartAddSlice;
