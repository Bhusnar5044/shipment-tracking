/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { urls } from '@/constants/urls';
import { fetch, loadState, saveState } from '@/utils';

import { keyPaths } from '@/constants/globalNavItems';
import type { IAuthContext } from './types';

const initialValue = { tokens: {}, profileInfo: {} };

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const navigate = useNavigate();
  const { redirectTo } = useParams();

  const fetchProfileDetails = useCallback(async () => {
    const { response, error } = await fetch({ url: urls.profile });
    if (response) {
      setProfileInfo(response.data);
    }
    if (error) {
      console.error(error);
    }
  }, []);

  const login = useCallback(
    async (data: any) => {
      saveState('user', data);
      const {
        user: { role },
      } = data.data;

      fetchProfileDetails();
      const path = role === 'Customer' ? keyPaths.shipments : keyPaths.dashboard;
      navigate(redirectTo ?? path, { replace: true });
    },
    [fetchProfileDetails, navigate, redirectTo]
  );

  const logout = useCallback(() => {
    saveState('user', {});
    navigate('/', { replace: true });
  }, [navigate]);

  const value = useMemo(() => {
    const user = loadState('user');
    return {
      ...user,
      profileInfo,
      login,
      logout,
      fetchProfileDetails,
    };
  }, [fetchProfileDetails, login, logout, profileInfo]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
