import { CART_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: CART_URL,
      }),
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: CART_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation({
      query: (productId) => ({
        url: `${CART_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: CART_URL,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApiSlice;