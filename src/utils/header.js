import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {END_POINT} from '@api';

export default fetchBaseQuery({
  baseUrl: END_POINT,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.user.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // headers.set('Content-Type', '*/*');
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    // headers.set("Content-Type", "boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu");
    // multipart/form-data
    return headers;
  },
});

export const parameterizeObject = props =>
  Object.keys(props)
    .map(key => key + '=' + props[key])
    .join('&');
