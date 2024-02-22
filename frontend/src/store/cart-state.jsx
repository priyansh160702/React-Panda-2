import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartStateSlice = createSlice({
  name: "cartIsShown",
  initialState: { cartIsShown: false },
  reducers: {
    show(state) {
      state.cartIsShown = true;
    },
    hide(state) {
      state.cartIsShown = false;
    },
  },
});

const cartAddSlice = createSlice({
  name: "cartAdd",
  initialState: { items: [], totalAmount: 0, totalQuantity: 0 },
  reducers: {
    updateItems(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingItemIndex];

      let updatedItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };

        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;

        state.items = updatedItems;
        state.totalAmount += existingItem.price;
        state.totalQuantity = updatedItem.quantity;
      } else {
        state.items = state.items.concat(action.payload);
      }
    },
    updateTotalAmount(state, action) {
      state.totalAmount += action.payload.price * action.payload.quantity;
    },
    updateTotalQuantity(state, action) {
      state.totalQuantity += action.payload;
    },
    removeItem(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalQuantity = 0;
        state.totalAmount = 0;
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };

        state.items[existingItemIndex] = updatedItem;
        state.totalAmount -= existingItem.price;
        state.totalQuantity = updatedItem.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

const store = configureStore({
  reducer: {
    cartState: cartStateSlice.reducer,
    cartAdd: cartAddSlice.reducer,
  },
});

export const cartStateActions = cartStateSlice.actions;
export const cartAddActions = cartAddSlice.actions;

export default store;
