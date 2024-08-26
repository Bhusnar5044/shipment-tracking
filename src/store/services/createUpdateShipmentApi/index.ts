import { createApi } from '@reduxjs/toolkit/query/react';

import { urls } from '@/constants/urls';
import { axiosBaseQuery } from '../service';
import { IShipment } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define an API slice with endpoints
export const createUpdateShipmentApi = createApi({
  reducerPath: 'createUpdateShipmentApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL ?? '',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    updateShipmentPost: build.mutation<IShipment, Partial<IShipment> & Pick<IShipment, '_id'>>({
      query: ({ _id, ...patch }) => ({
        url: _id ? urls.shipmentDetails(_id) : urls.getShipments,
        method: _id ? 'POST' : 'PUT',
        data: patch,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export API hooks for usage in components
export const { useUpdateShipmentPostMutation } = createUpdateShipmentApi;
