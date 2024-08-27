/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { loadState, saveState } from '@/utils';

import { keyPaths } from '@/constants/globalNavItems';
import type { IAuthContext } from './types';

const initialValue = { tokenData: {}, user: {} };

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { redirectTo } = useParams();
  const [value, setValue] = useState();

  const login = useCallback(
    async (data: any) => {
      saveState('user', data);
      setValue(data.data);
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
    setValue(undefined);
    navigate('/', { replace: true });
  }, [navigate]);

  const memoValue = useMemo(() => {
    const storeValue = loadState('user')?.data ?? { user: {}, tokenData: {} };
    return {
      ...(value ?? storeValue),
      login,
      logout,
    };
  }, [login, logout, value]);

  return <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
