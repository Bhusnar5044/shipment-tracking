import { loadState } from './localStorage';

export const getRoleAndPermissions = (): {
  userRole: string;
  permissions: string[];
  token: string;
} => {
  const { user: {role = '', permissions = []}, tokenData: {token= ''} } = loadState('user')?.data ?? {user:{}, tokenData:{}};
  return { userRole: role, permissions, token };
};
