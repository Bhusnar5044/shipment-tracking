export const urls = {
  login: '/api/v1/login',
  signup: '/api/v1/signup',
  users: '/api/v1/users',
  profile: '/api/v1/profile',
  getShipments: '/api/v1/shipments',
  createShipment: '/api/v1/shipments/create',
  customers: '/api/v1/customers',
  customerById: (id: string) => `/api/v1/customers/${id}`,
  shipmentDetails: (id: string) => `/api/v1/shipments/${id}`,
  shipmentTrack: (trackingId: string) => `/api/v1/shipments/track/${trackingId}`,
};

export const ListUrls = {
  shipments: urls.getShipments,
};
