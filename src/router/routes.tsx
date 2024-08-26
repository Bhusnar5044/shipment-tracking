import React from 'react';

import DashboardPage from '@/pages/dashboard';
import { Login } from '@/pages/login/login';
import Register from '@/pages/register';
import { PathRouteProps } from 'react-router-dom';
import Shipments from '@/pages/shipments';
import { keyPaths } from '@/constants/globalNavItems';
import CreateUpdateShipmentPage from '@/pages/createUpdateShipment';
import ShipmentTrackingPage from '@/pages/shipmentTracking';
import CustomerOnboarding from '@/pages/customerOnboarding';

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
    element: <ShipmentTrackingPage />
  },
  {
    path: keyPaths.shipments,
    element: <Shipments />,
  },
  {
    path: keyPaths.createShipment,
    element: <CreateUpdateShipmentPage />
  },
  {
    path: keyPaths.updateShipment,
    element: <CreateUpdateShipmentPage />
  },
  {
    path: keyPaths.customerManagement,
    element: <CustomerOnboarding />
  }
];