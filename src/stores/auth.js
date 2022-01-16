import {createSlice} from '@reduxjs/toolkit';

import {
  // getItem as getToken,
  setItem as setToken,
  removeItem as removeToken,
} from '@store/storage';

const initialState = {
  user: {name: null, token: null},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      setToken(action.payload);
      state.user.name = action.payload.name;
      state.user.token = action.payload.token;
    },
    unsetAuthUser: (state, action) => {
      removeToken();
      state.user.name = action.payload.name;
      state.user.token = action.payload.token;
    },
  },
  extraReducers: builder => {},
});

// Action creators are generated for each case reducer function
export const {setAuthUser, unsetAuthUser} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
