/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/common/Typography';
import { IShipment } from '@/store/services/shipmentApi/types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const ShipmentContent = memo(({ sidePanelData }: { sidePanelKey: string; sidePanelData: IShipment }) => {
  return (
    <div className="p-8">
      <Typography variant="h3" className="mb-6">
        Shipment Details
      </Typography>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <Typography variant="h4" className="text-xl font-bold">
          {sidePanelData?.shipmentId}
        </Typography>
        <Typography>
          <strong>Origin:</strong> {sidePanelData?.origin}
        </Typography>
        <Typography>
          <strong>Destination:</strong> {sidePanelData?.destination}
        </Typography>
        <Typography>
          <strong>Status:</strong> {sidePanelData?.currentStatus}
        </Typography>
        <Typography>
          <strong>Estimated Delivery:</strong>{' '}
          {sidePanelData?.estimatedDeliveryDate ? new Date(sidePanelData?.estimatedDeliveryDate).toLocaleDateString() : 'NA'}
        </Typography>
        <Typography>
          <strong>Containers:</strong> {sidePanelData?.containerNumbers?.join(', ')}
        </Typography>
        <Typography>
          <strong>Shipping Agent:</strong> {sidePanelData?.shippingAgent}
        </Typography>
        <Typography>
          <strong>Tracking ID:</strong> {sidePanelData?.trackingId}
        </Typography>
        <Link to={`/dashboard/shipments/${sidePanelData._id}`} className="underline underline-offset-4 text-blue-500 hover:text-blue-800">
          Edit Shipment
        </Link>
      </div>
    </div>
  );
});

ShipmentContent.displayName = 'ShipmentContent';
export default ShipmentContent;
