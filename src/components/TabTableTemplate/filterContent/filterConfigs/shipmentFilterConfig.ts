import { FilterConfig } from '@/constants/types';

export const shipmentFilterConfig: FilterConfig[] = [
  {
    type: 'dateRange',
    label: 'Order by Delivery Date',
    stateKey: 'commonDateRange',
    feature: ['orders'],
    priority: 1,
  },
  {
    type: 'dateRange',
    label: 'Order by Booking Date',
    stateKey: 'bookingDateRange',
    feature: ['orders'],
    priority: 2,
  },
  {
    type: 'textField',
    label: 'Order ID',
    placeholder: 'Order ID',
    stateKey: 'orderId',
    feature: ['orders'],
    priority: 5,
  },
];
