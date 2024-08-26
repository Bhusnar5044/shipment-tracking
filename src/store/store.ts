import { configureStore } from '@reduxjs/toolkit';

import sidePanel from './features/sidePanel';
import userInfoReducer from './features/user';
import { createUpdateCustomerApi, createUpdateShipmentApi, customerIdsApi, listApi, shipmentDetailsApi, shipmentTRackApi } from './services';

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidePanel,
      userInfo: userInfoReducer,
      [listApi.reducerPath]: listApi.reducer,
      [shipmentDetailsApi.reducerPath]: shipmentDetailsApi.reducer,
      [shipmentTRackApi.reducerPath]: shipmentTRackApi.reducer,
      [createUpdateShipmentApi.reducerPath]: createUpdateShipmentApi.reducer,
      [createUpdateCustomerApi.reducerPath]: createUpdateCustomerApi.reducer,
      [customerIdsApi.reducerPath]: customerIdsApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([listApi.middleware, shipmentDetailsApi.middleware, shipmentTRackApi.middleware, createUpdateShipmentApi.middleware, createUpdateCustomerApi.middleware, customerIdsApi.middleware]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
