export interface IUser {
  _id?: string;
  name?: string;
  password?: string;
  email: string;
  role?: string;
  token?: string;
}

export interface IUserInfo {
  userInformation: IUser | null;
}

// RootState interface=> used for state type in useSelector hook

export interface IUserInfoRootState {
  userInfo: IUserInfo;
}
