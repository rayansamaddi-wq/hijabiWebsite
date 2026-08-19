import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Only persist checkout information
const checkout = localStorage.getItem('checkout')
  ? JSON.parse(localStorage.getItem('checkout'))
  : {};

const initialState = {
  cartItems: [],

  shippingAddress: checkout.shippingAddress || {},

  paymentMethod: checkout.paymentMethod || '',

  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,

  cartAdded: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // Sync Redux with MongoDB cart
    setCart: (state, action) => {
      state.cartItems = action.payload;
      return updateCart(state);
    },

    // Keep temporarily until all pages use the backend API
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },

    // Keep temporarily until CartPage uses the backend API
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      return updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];

      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;

      return updateCart(state);
    },

    showCartAdded: (state) => {
      state.cartAdded = true;
    },

    hideCartAdded: (state) => {
      state.cartAdded = false;
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  showCartAdded,
  hideCartAdded,
} = cartSlice.actions;

export default cartSlice.reducer;