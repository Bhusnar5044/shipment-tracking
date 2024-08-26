export const urls = {
  login: '/login',
  signup: '/signup',
  users: '/users',
  profile: '/profile',
  getShipments: '/shipments',
  customers: '/customers',
  customerById: (id: string) => `/customers/${id}`,
  shipmentDetails: (id: string) => `/shipments/${id}`,
  shipmentTrack: (trackingId: string) => `/shipments/track/${trackingId}`,
};

export const ListUrls = {
  shipments: urls.getShipments,
};
