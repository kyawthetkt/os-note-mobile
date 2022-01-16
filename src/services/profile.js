import {createApi} from '@reduxjs/toolkit/query/react';
import {PROFILE_URL, UPDATE_PROFILE_URL, UPDATE_PASSWORD_URL} from '@api';
import baseQuery from '@util/header';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  keepUnusedDataFor: 0,
  baseQuery: baseQuery,
  endpoints: builder => ({
    profile: builder.query({
      query: no => `${PROFILE_URL}?no=${no}`,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: requestData => ({
        url: UPDATE_PROFILE_URL,
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Profile'],
    }),
    updatePassword: builder.mutation({
      query: requestData => ({
        url: UPDATE_PASSWORD_URL,
        method: 'POST',
        body: requestData,
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = profileApi;
