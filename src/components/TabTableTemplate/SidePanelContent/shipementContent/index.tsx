/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import { IShipment } from '@/store/services/shipmentApi/types';
import { cn } from '@/utils';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { statusBackground } from '../../columns/shipments';

const ShipmentContent = memo(({ sidePanelData }: { sidePanelKey: string; sidePanelData: IShipment }) => {
  return (
    <div className="p-8">
      <Typography variant="h3" className="mb-6">
        Shipment Details
      </Typography>
      <div className="bg-blue-50 p-2 mb-3">
        <Button className="self-end">
          <Link to={`/dashboard/shipments/${sidePanelData._id}`} className="text-white">
            Edit Shipment
          </Link>
        </Button>
      </div>
      <div className="flex justify-between mb-4">
        <Typography variant="h4">Status:</Typography>
        <Chip size="S" className={cn('capitalize', statusBackground(sidePanelData?.currentStatus))} label={sidePanelData?.currentStatus} />
      </div>
      <div className="flex flex-col gap-3">
        <Typography className="flex justify-between">
          <strong>Shipment Id:</strong> {`#${sidePanelData?.shipmentId ?? 'NA'}`}
        </Typography>
        <Typography className="flex justify-between">
          <strong>Origin:</strong> {sidePanelData?.origin}
        </Typography>
        <Typography className="flex justify-between">
          <strong>Destination:</strong> {sidePanelData?.destination}
        </Typography>
        <Typography className="flex justify-between">
          <strong>Estimated Delivery:</strong>{' '}
          {sidePanelData?.estimatedDeliveryDate ? new Date(sidePanelData?.estimatedDeliveryDate).toLocaleDateString() : 'NA'}
        </Typography>
        <Typography className="flex justify-between">
          <strong>Containers:</strong> {sidePanelData?.containerNumbers?.join(', ')}
        </Typography>
        <Typography className="flex justify-between">
          <strong>Shipping Agent:</strong> {sidePanelData?.shippingAgent}
        </Typography>
        <Typography variant="h5" className="my-3">
          Cargo Details
        </Typography>
        <Typography className="flex justify-between">
          <strong>description:</strong> {sidePanelData?.cargoDetails?.description}
        </Typography>
        <Typography className="flex justify-between">
          <strong>weight:</strong> {`${sidePanelData?.cargoDetails?.weight} Kg`}
        </Typography>
        <Typography className="flex justify-between">
          <strong>volume:</strong> {`${sidePanelData?.cargoDetails?.volume} cubic`}
        </Typography>
        <Typography variant="h5" className="my-3">
          Tracking Details
        </Typography>
        <Typography className="flex justify-between mb-4">
          <strong>Tracking ID:</strong> {sidePanelData?.trackingId}
        </Typography>
      </div>
    </div>
  );
});

ShipmentContent.displayName = 'ShipmentContent';
export default ShipmentContent;
