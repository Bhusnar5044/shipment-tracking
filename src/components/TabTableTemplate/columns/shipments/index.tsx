import Chip from '@/components/common/Chip';
import { ColumnTypes } from '@/components/common/DataTable/types';
import { cn } from '@/utils';
import ShowDetailsButton from '../../CellButtons/ShowDetailsButton';
import { ShipmentsRecords } from './types';

export function statusBackground(status: string) {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500 text-white';
    case 'In Transit':
      return 'bg-green-200 text-gray-700';
    default:
      return 'bg-red-300 text-red-500';
  }
}

export const shipmentColumn: ColumnTypes<ShipmentsRecords>[] = [
  {
    accessorKey: 'trackingId',
    header: 'Tracking Id',
  },
  {
    accessorKey: 'origin',
    header: 'Origin',
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cellComponent: ({ row }) => (
      <Chip
        size="XS"
        className={cn('capitalize', statusBackground(row?.original?.status?.split('_')?.join(' ')?.slice(6)?.trim()?.toLowerCase()))}
        label={row?.original?.status?.split('_')?.join(' ')?.slice(6)}
      />
    ),
  },
  {
    accessorKey: 'action',
    header: 'action',
    enableHiding: false,
    cellComponent: ({ row }) => <ShowDetailsButton data={row?.original} sidePanelKey={'orders_action'} />,
  },
  // {
  //   accessorKey: "estimatedDeliveryDate",
  //   header: "Estimated Delivery Date",
  //   cellComponent: ({ row }: { row: { original: AdminTypes } }) => <EditDetailsButton sidePanelKey="edit_rake_data" data={row.original} />,
  // },
];
