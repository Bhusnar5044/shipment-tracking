import RequireAuth from '@/components/auth/RequireAuth';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedRoute: FC<{ path: string }> = ({ path }) => {
  return (
    <RequireAuth redirectTo={`/login?redirectTo=${path}`}>
      <Outlet />
    </RequireAuth>
  );
};

export default ProtectedRoute;
