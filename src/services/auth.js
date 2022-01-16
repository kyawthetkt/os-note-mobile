import {createApi} from '@reduxjs/toolkit/query/react';
import {LOGIN_URL, LOGOUT_URL, REGISTER_URL} from '@api';
import baseQuery from '@util/header';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: requestData => ({
        url: LOGIN_URL,
        method: 'POST',
        body: requestData,
      }),
    }),
    register: builder.mutation({
      query: requestData => ({
        url: REGISTER_URL,
        method: 'POST',
        body: requestData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: 'POST',
        body: {action: 'logout'},
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} =
  authApi;
