import { ShipmentStatus } from "@/constants/types";

export interface ShipmentForm {
    shipmentId: string;
    origin: string;
    destination: string;
    currentStatus: string;
    estimatedDeliveryDate?: Date;
    containerNumbers: string[];
    shippingAgent: string;
  }
  
  export interface IShipment{
    _id?: string;
    shipmentId: string;
    customer: string;
    origin: string;
    destination: string;
    currentStatus: ShipmentStatus
    estimatedDeliveryDate: Date;
    actualDeliveryDate?: Date;
    containerNumbers: string[];
    cargoDetails: {
      description: string;
      weight: number; // In kilograms
      volume: number; // In cubic meters
    };
    shippingAgent: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    trackingId: string;
}