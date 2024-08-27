/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { loadState, saveState } from '@/utils';

import { keyPaths } from '@/constants/globalNavItems';
import type { IAuthContext } from './types';

const initialValue = { tokens: {}, profileInfo: {} };

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { redirectTo } = useParams();

  const login = useCallback(
    async (data: any) => {
      saveState('user', data);
      const {
        user: { role },
      } = data.data;

      const path = role === 'Customer' ? keyPaths.shipments : keyPaths.dashboard;
      navigate(redirectTo ?? path, { replace: true });
    },
    [navigate, redirectTo]
  );

  const logout = useCallback(() => {
    saveState('user', {});
    navigate('/', { replace: true });
  }, [navigate]);

  const value = useMemo(() => {
    const user = loadState('user');
    return {
      ...user,
      login,
      logout,
    };
  }, [login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
