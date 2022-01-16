import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery, {parameterizeObject} from '@util/header';
import {
  ORDER_URL,
  ORDER_COUNTER_URL,
  ORDER_DETAIL_URL,
  ORDER_EDIT_URL,
  POST_UPDATE_ORDER_URL,
  CREATE_ORDER_URL,
  CREATE_ORDER_DETAIL_URL,
  UPDATE_ORDER_DETAIL_URL,
  DELETE_ORDER_DETAIL_URL,
  POST_DELETE_ORDER_URL,
  PRINT_ORDER_URL,
} from '@api';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
  keepUnusedDataFor: 0,
  baseQuery: baseQuery,
  endpoints: builder => ({
    orders: builder.query({
      query: obj => `${ORDER_URL}?${parameterizeObject(obj)}`,
      providesTags: ['Orders'],
    }),
    orderCounter: builder.query({
      query: counter => `${ORDER_COUNTER_URL}?counter=${counter}`,
      providesTags: ['OrderCounter'],
    }),
    order: builder.query({
      query: ({id, counter}) => {
        return `${ORDER_DETAIL_URL}${id}?counter=${counter}`;
      },
      providesTags: ['Order'],
    }),
    getEditOrder: builder.query({
      query: ({id, counter}) => {
        return `${ORDER_EDIT_URL}${id}?counter=${counter}`;
      },
      providesTags: ['OrderDetail'],
    }),
    create: builder.mutation({
      query: requestData => ({
        url: CREATE_ORDER_URL,
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),

    update: builder.mutation({
      query: obj => ({
        url: `${POST_UPDATE_ORDER_URL}${obj.id}`,
        method: 'POST',
        body: obj,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
    deleteOrder: builder.mutation({
      query: obj => ({
        url: `${POST_DELETE_ORDER_URL}${obj.user_id}/${obj.id}`,
        method: 'DELETE',
        body: obj,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
    printPdf: builder.mutation({
      query: obj => ({
        url: `${PRINT_ORDER_URL}${obj.user_id}/${obj.id}`,
        method: 'POST',
        body: obj,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
    createOrderDtail: builder.mutation({
      query: requestData => ({
        url: CREATE_ORDER_URL,
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
    createDetail: builder.mutation({
      query: obj => ({
        url: `${CREATE_ORDER_DETAIL_URL}${obj.order_id}`,
        method: 'POST',
        body: obj,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
    updateDetail: builder.mutation({
      query: obj => ({
        url: `${UPDATE_ORDER_DETAIL_URL}${obj.order_id}/${obj.id}`,
        method: 'POST',
        body: obj,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
    deleteDetail: builder.mutation({
      query: obj => ({
        url: `${DELETE_ORDER_DETAIL_URL}${obj.order_id}/${obj.id}`,
        method: 'POST',
        body: obj,
      }),
      invalidatesTags: ['Orders', 'Order', 'OrderCounter', 'OrderDetail'],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderCounterQuery,
  useOrderQuery,
  useDeleteOrderMutation,
  useCreateMutation,
  useUpdateMutation,
  useCreateDetailMutation,
  useUpdateDetailMutation,
  useDeleteDetailMutation,

  usePrintPdfMutation,
} = orderApi;
