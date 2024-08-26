export type Item = {
  name: string;
  title: string;
  slug: string;
  description?: string;
  routePermission?: string[];
  icon: string;
  items?: Item[];
};

export const keyPaths = {
  dashboard: '/dashboard',
  trackShipments: '/dashboard/track-shipment',
  shipments: '/dashboard/shipments',
  createShipment: '/dashboard/shipments/new',
  updateShipment: '/dashboard/shipments/:id',
  userManagement: '/dashboard/user-management',
  customerManagement: '/dashboard/customer-onboarding',
  reports: '/dashboard/reports',
};

export const navLinks: Item[] = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    slug: keyPaths.dashboard,
    icon: 'dashboard',
    routePermission: ['Admin', 'Manager'],
  },
  {
    name: 'Track Shipments',
    title: 'Track Shipments',
    slug: keyPaths.trackShipments,
    icon: 'share_location',
    routePermission: ['Customer', 'Admin', 'Manager'],
  },
  {
    name: 'shipments',
    title: 'Shipments',
    slug: keyPaths.shipments,
    icon: 'monitoring',
    routePermission: ['Admin', 'Manager', 'Customer'],
  },
  {
    name: 'User Management',
    title: 'User Management',
    slug: keyPaths.userManagement,
    icon: 'supervisor_account',
    routePermission: ['Admin'],
  },
  {
    name: 'Customer Onboarding',
    title: 'Customer Onboarding',
    slug: keyPaths.customerManagement,
    icon: 'how_to_reg',
    routePermission: ['Admin', 'Manager'],
  },
];
