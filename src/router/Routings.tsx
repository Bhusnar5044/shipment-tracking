/**
 * @note
 * for hook alternative of route element composition:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#use-useroutes-instead-of-react-router-config
 * - https://reactrouter.com/docs/en/v6/examples/route-objects
 *
 * might need to take notes on:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-link-to-values
 */

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import RequireAuth from '@/components/auth/RequireAuth';
import Page404 from '@/pages/404';

import DashboardLayout from '@/components/DashboardLayout';
import Layout from '@/layout';
import { privateRoutes, routes } from './routes';

const Routings = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((routeProps) => (
            <Route {...routeProps} key={routeProps.path as string} />
          ))}
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route element={<DashboardLayout />}>
          {privateRoutes.map(({ element, permissions, ...privateRouteProps }) => (
            <Route
              element={
                <RequireAuth permissions={permissions} redirectTo={`/login?redirectTo=${privateRouteProps.path}`}>
                  {element}
                </RequireAuth>
              }
              {...privateRouteProps}
              key={`privateRoute-${privateRouteProps.path}`}
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routings;
