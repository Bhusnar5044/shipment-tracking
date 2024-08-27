import React from 'react';

import { keyPaths } from '@/constants/globalNavItems';
import ContactPage from '@/pages/contactUs';
import CreateUpdateShipmentPage from '@/pages/createUpdateShipment';
import CustomerOnboarding from '@/pages/customerOnboarding';
import DashboardPage from '@/pages/dashboard';
import { Login } from '@/pages/login/login';
import Register from '@/pages/register';
import ShipmentTrackingPage from '@/pages/shipmentTracking';
import Shipments from '@/pages/shipments';
import { PathRouteProps } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
];

export const privateRoutes: Array<PathRouteProps & { permissions: string[] }> = [
  {
    path: keyPaths.dashboard,
    element: <DashboardPage />,
    permissions: ['Manager', 'Admin'],
  },
  {
    path: keyPaths.trackShipments,
    element: <ShipmentTrackingPage />,
    permissions: ['Manager', 'Customer', 'Admin'],
  },
  {
    path: keyPaths.shipments,
    element: <Shipments />,
    permissions: ['Manager', 'Customer', 'Admin'],
  },
  {
    path: keyPaths.createShipment,
    element: <CreateUpdateShipmentPage />,
    permissions: ['Manager', 'Admin'],
  },
  {
    path: keyPaths.updateShipment,
    element: <CreateUpdateShipmentPage />,
    permissions: ['Manager', 'Admin'],
  },
  {
    path: keyPaths.customerManagement,
    element: <CustomerOnboarding />,
    permissions: ['Manager', 'Admin'],
  },
];
