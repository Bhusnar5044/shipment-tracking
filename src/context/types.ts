/* eslint-disable @typescript-eslint/no-explicit-any */
export type IAuthContext = {
  tokenData?: { token?: string };
  user?: { [key: string]: string };
  login?: (data: any) => void;
  logout?: () => void;
};
