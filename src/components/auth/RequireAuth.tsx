import { getRoleAndPermissions } from '@/utils/getRoleAndPermissions';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
  permissions: string[];
};

const RequireAuth = ({ children, permissions, redirectTo = '/login' }: PrivateRouteProps) => {
  // add your own authentication logic here
  const { token, userRole } = getRoleAndPermissions();
  const isAuthenticated = !!token;
  if (isAuthenticated) {
    if (!permissions.includes(userRole)) return <Navigate to={'/404'} />;
    return children as React.ReactElement;
  }
  return <Navigate to={redirectTo} />;
};

export default RequireAuth;
