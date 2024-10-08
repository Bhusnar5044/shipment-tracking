import { ShipmentStatus } from '@/constants/types';

export interface IShipment {
  _id?: string;
  shipmentId: string;
  customerId: string;
  origin: string;
  destination: string;
  currentStatus: ShipmentStatus;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  containerNumbers: string[];
  cargoDetails?: {
    description?: string;
    weight?: number; // In kilograms
    volume?: number; // In cubic meters
  };
  shippingAgent: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  trackingId: string;
}
