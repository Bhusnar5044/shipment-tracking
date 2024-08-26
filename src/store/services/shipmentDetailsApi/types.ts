export interface ShipmentDetails {
  _id?: string;
  shipmentId: string;
  origin: string;
  destination: string;
  currentStatus: string;
  estimatedDeliveryDate: string;
  containerNumbers: string[];
  cargoDetails: {
    description: string;
    weight: number;
    volume: number;
  };
  shippingAgent: string;
  trackingId: string;
}
