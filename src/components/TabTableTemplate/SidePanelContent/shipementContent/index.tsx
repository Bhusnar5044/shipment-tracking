/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@/components/common/Typography";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetShipmentDetailsQuery } from "@/store/services/shipmentDetailsApi";
import { ShipmentDetails } from "@/store/services/shipmentDetailsApi/types";

const ShipmentContent = memo(
  ({sidePanelData}:{sidePanelData: ShipmentDetails}) => {
    const { id='' } = useParams<{ id: string }>();
    const shipmentId = sidePanelData.shipmentId
    const {data, isLoading} = useGetShipmentDetailsQuery({id: id ?? shipmentId})

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="p-8">
      <Typography variant="h3" className="mb-6">Shipment Details</Typography>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <Typography variant="h4" className="text-xl font-bold">{data?.shipmentId}</Typography>
        <Typography>
          <strong>Origin:</strong> {data?.origin}
        </Typography>
        <Typography>
          <strong>Destination:</strong> {data?.destination}
        </Typography>
        <Typography>
          <strong>Status:</strong> {data?.currentStatus}
        </Typography>
        <Typography>
          <strong>Estimated Delivery:</strong>{' '}
          {data?.estimatedDeliveryDate ? new Date(data?.estimatedDeliveryDate).toLocaleDateString(): 'NA'}
        </Typography>
        <Typography>
          <strong>Containers:</strong> {data?.containerNumbers.join(', ')}
        </Typography>
        <Typography>
          <strong>Shipping Agent:</strong> {data?.shippingAgent}
        </Typography>
        <Typography>
          <strong>Tracking ID:</strong> {data?.trackingId}
        </Typography>
        <Link
          to={`/shipments/edit/${id}`}
          className="inline-block mt-4 px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
        >
          Edit Shipment
        </Link>
      </div>
    </div>
  );
});

ShipmentContent.displayName = "ShipmentContent";
export default ShipmentContent;