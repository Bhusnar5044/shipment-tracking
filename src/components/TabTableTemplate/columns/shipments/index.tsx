import Chip from '@/components/common/Chip';
import { ColumnTypes } from '@/components/common/DataTable/types';
import { IShipment } from '@/store/services/shipmentApi/types';
import { cn } from '@/utils';
import ShowDetailsButton from '../../CellButtons/ShowDetailsButton';

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

export const shipmentColumn: ColumnTypes<IShipment>[] = [
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
    accessorKey: 'currentStatus',
    header: 'Current Status',
    cellComponent: ({ row }) => (
      <Chip size="XS" className={cn('capitalize', statusBackground(row?.original?.currentStatus))} label={row?.original?.currentStatus} />
    ),
  },
  {
    accessorKey: 'estimatedDeliveryDate',
    header: 'Estimated Delivery Date',
  },
  {
    accessorKey: 'action',
    header: 'action',
    enableHiding: false,
    cellComponent: ({ row }) => (
      <div>
        <ShowDetailsButton data={row?.original} sidePanelKey={'shipment_content'} />
      </div>
    ),
  },
];
