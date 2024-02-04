export interface RootState {
  auth: AuthState;
}

export interface AuthState {
  loading: boolean;
  error: boolean;
  success: boolean;
  isAuth: boolean;
  userInfo: IUser;
  errorMessage?: string; // опциональное свойство errorMessage
}

export interface ILoginBody {
  login: string,
  password: string
};

export interface IRegistrationBody extends ILoginBody{
  username: string;
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  login: string;
  username: string;
  id: string;
}