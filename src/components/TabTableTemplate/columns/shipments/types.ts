export interface ShipmentsRecords {
  origin: string;
  destination: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  estimatedDeliveryDate: Date;
  trackingId: string;
  isDeleted: boolean;
}

export interface RakeMapTypes {
  id: number;
  trainName: string;
  startDateTime: string;
  rakeName: string;
  trainNumber: string;
  vendorId: number;
  obcsName: string;
  obcsMobile: string;
  obcsEmail: string;
  pcmName: string;
  pcmMobile: string;
  pcmEmail: string;
}
