import {
  configureStore,
  // getDefaultMiddleware,
  // ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import auth from '@store/auth';

import {authApi} from '@service/auth';
import {profileApi} from '@service/profile';
import {orderApi} from '@service/order';

export const createStore = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(profileApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware),
});

// setupListeners(store.dispatch);
export const store = createStore;
// export const rootState = store.getState;
export const RootState = store.getState;
// export const useAppDispatch = () => useDispatch();
// export const useAppSelector = () => useSelector();
