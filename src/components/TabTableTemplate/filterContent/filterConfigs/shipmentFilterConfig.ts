import { FilterConfig } from '@/constants/types';

export const shipmentFilterConfig: FilterConfig[] = [
  {
    type: 'textField',
    label: 'Shipment id',
    placeholder: 'Search by shipment id',
    stateKey: 'shipmentId',
    feature: ['orders'],
    priority: 1,
  },
  {
    type: 'textField',
    label: 'Origin',
    placeholder: 'Search by origin',
    stateKey: 'origin',
    feature: ['orders'],
    priority: 2,
  },
  {
    type: 'textField',
    label: 'Destination',
    placeholder: 'Search by destination',
    stateKey: 'destination',
    feature: ['orders'],
    priority: 5,
  },
];
