import React from 'react';

import { keyPaths } from '@/constants/globalNavItems';
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
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: keyPaths.dashboard,
    element: <DashboardPage />,
  },
  {
    path: keyPaths.trackShipments,
    element: <ShipmentTrackingPage />,
  },
  {
    path: keyPaths.shipments,
    element: <Shipments />,
  },
  {
    path: keyPaths.createShipment,
    element: <CreateUpdateShipmentPage />,
  },
  {
    path: keyPaths.updateShipment,
    element: <CreateUpdateShipmentPage />,
  },
  {
    path: keyPaths.customerManagement,
    element: <CustomerOnboarding />,
  },
];
