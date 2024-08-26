import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../service';
import { urls } from '@/constants/urls';
import { ShipmentDetails } from '../shipmentDetailsApi/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define an API slice with endpoints
export const shipmentTRackApi = createApi({
  reducerPath: 'shipmentTrackApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL ?? '',
  }),
  endpoints: (build) => ({
    getShipmentTrackDetails: build.query<ShipmentDetails, {id:string}>({
      query: ({ id }) => {
        // const resultKey = keyResultMapping[key] as TableDataListTypeKey;
        return {
          url: urls.shipmentTrack(id),
          method: 'GET',
        };
      },
    }),
  }),
});

// Export API hooks for usage in components
export const { useGetShipmentTrackDetailsQuery } = shipmentTRackApi;
