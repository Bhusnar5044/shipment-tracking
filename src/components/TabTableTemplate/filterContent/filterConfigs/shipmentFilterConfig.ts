import { FilterConfig } from '@/constants/types';

export const shipmentFilterConfig: FilterConfig[] = [
  {
    type: 'textField',
    label: 'Origin',
    placeholder: 'Search by origin',
    stateKey: 'origin',
    feature: [],
    priority: 5,
  },
  {
    type: 'textField',
    label: 'Destination',
    placeholder: 'Search by destination',
    stateKey: 'destination',
    feature: [],
    priority: 5,
  },
];
