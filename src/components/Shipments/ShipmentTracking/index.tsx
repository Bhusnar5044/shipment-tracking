import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import Typography from '@/components/common/Typography';
import { useGetShipmentTrackDetailsQuery } from '@/store/services/shipmentTrackingApi';
import React, { useState } from 'react';

const ShipmentTracking: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [skip, setSkip] = useState(true);

  const { data } = useGetShipmentTrackDetailsQuery({ id: trackingId }, { skip });

  const handleOnChange = (e: TextFieldEventType) => {
    setTrackingId(e.target.value);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setSkip((prev) => !prev);
  };

  return (
    <div className="p-8">
      <Typography variant="h3" className="mb-6">
        Track a Shipment
      </Typography>
      <form onSubmit={handleTrack} className="space-y-4">
        <div>
          <TextField variant="outlined" label="Tracking ID" type="text" name="trackingId" value={trackingId} onChange={handleOnChange} required />
        </div>
        <Button type="submit">Track Shipment</Button>
      </form>

      {data && (
        <div className="mt-8 bg-white p-4 rounded-md shadow-sm">
          <Typography variant="h4">{data.shipmentId}</Typography>
          <Typography>
            <strong>Origin:</strong> {data.origin}
          </Typography>
          <Typography>
            <strong>Destination:</strong> {data.destination}
          </Typography>
          <Typography>
            <strong>Status:</strong> {data.currentStatus}
          </Typography>
          <Typography>
            <strong>Estimated Delivery:</strong> {new Date(data.estimatedDeliveryDate).toLocaleDateString()}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ShipmentTracking;
