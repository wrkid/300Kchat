export interface AuthState {
  loading: boolean;
  error: boolean;
  success: boolean;
  token: string;
  userInfo: {
    login: string;
    id: string;
  };
  errorMessage?: string; // опциональное свойство errorMessage
}

export interface IRegistrationBody {
  login: string;
  username: string;
  password: string;
};

export interface ILoginBody {
  login: string,
  password: string
};

export interface ILogoutBody {
  login: string,
  password: string
};

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    login: string;
    id: string;
  }
}