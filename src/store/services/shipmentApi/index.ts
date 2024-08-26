import { createApi } from '@reduxjs/toolkit/query/react';

import { urls } from '@/constants/urls';
import { axiosBaseQuery } from '../service';
import { IShipment } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define an API slice with endpoints
export const shipmentApi = createApi({
  reducerPath: 'shipmentApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL ?? '',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getShipmentDetails: build.query<IShipment, { id: string }>({
      query: ({ id }) => {
        return {
          url: urls.shipmentDetails(id),
          method: 'GET',
        };
      },
    }),
    getShipmentTrackDetails: build.query<IShipment, { id: string }>({
      query: ({ id }) => {
        // const resultKey = keyResultMapping[key] as TableDataListTypeKey;
        return {
          url: urls.shipmentTrack(id),
          method: 'GET',
        };
      },
    }),
    updateShipmentPost: build.mutation<IShipment, Partial<IShipment> & Pick<IShipment, '_id'>>({
      query: ({ _id, ...patch }) => ({
        url: _id ? urls.shipmentDetails(_id) : urls.createShipment,
        method: _id ? 'PUT' : 'POST',
        data: patch,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteShipment: build.mutation<IShipment, Pick<IShipment, '_id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ _id }) => ({
        url: urls.shipmentDetails(_id ?? ''),
        method: 'DELETE',
      }),
    }),
  }),
});

// Export API hooks for usage in components
export const { useUpdateShipmentPostMutation, useGetShipmentDetailsQuery, useGetShipmentTrackDetailsQuery, useDeleteShipmentMutation } = shipmentApi;
