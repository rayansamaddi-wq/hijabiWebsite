import { ORDERS_URL, PAYMENT_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }
      }),
      invalidatesTags: ['Order','Product']
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`
      }),
      providesTags: ['Order']
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`
      }),
      providesTags: ['Order']
    }),
    payOrder: builder.mutation({
  query: orderId => ({
    url: `${ORDERS_URL}/${orderId}/pay`,
    method: 'PUT',
  }),
  invalidatesTags:['Order']
}),
    updateDeliver: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT'
      }),
      invalidatesTags: ['Order']
    }),
   createTapCharge: builder.mutation({
  query: (data) => ({
    url: `${PAYMENT_URL}/create-charge`,
    method: 'POST',
    body: data,
  }),
}),

getTapCharge: builder.query({
  query: (chargeId) => ({
    url: `${PAYMENT_URL}/charge/${chargeId}`,
  }),
}),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL
      }),
      providesTags: ['Order']
    })
  })
});

export const {
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useUpdateDeliverMutation,
 useCreateTapChargeMutation,
useGetTapChargeQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery
} = ordersApiSlice;