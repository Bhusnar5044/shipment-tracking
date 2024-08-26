import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../service';
import { ShipmentDetails } from './types';
import { urls } from '@/constants/urls';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define an API slice with endpoints
export const shipmentDetailsApi = createApi({
  reducerPath: 'shipmentDetailsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL ?? '',
  }),
  endpoints: (build) => ({
    getShipmentDetails: build.query<ShipmentDetails, {id:string}>({
      query: ({ id }) => {
        // const resultKey = keyResultMapping[key] as TableDataListTypeKey;
        return {
          url: urls.shipmentDetails(id),
          method: 'GET',
        };
      },
    }),
  }),
});

// Export API hooks for usage in components
export const { useGetShipmentDetailsQuery } = shipmentDetailsApi;
