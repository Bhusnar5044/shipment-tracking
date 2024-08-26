import { configureStore } from '@reduxjs/toolkit';

import sidePanel from './features/sidePanel';
import userInfoReducer from './features/user';
import { customerApi, listApi, shipmentApi } from './services';

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidePanel,
      userInfo: userInfoReducer,
      [listApi.reducerPath]: listApi.reducer,
      [shipmentApi.reducerPath]: shipmentApi.reducer,
      [customerApi.reducerPath]: customerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([listApi.middleware, shipmentApi.middleware, customerApi.middleware]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
