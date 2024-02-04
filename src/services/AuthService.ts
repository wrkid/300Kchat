import axios , {AxiosResponse} from 'axios';
import { AuthResponse, ILoginBody, IRegistrationBody } from '@/types/authTypes';

export const baseURL = 'http://localhost:2001/auth';

const $api = axios.create({
  withCredentials: true,
  baseURL: baseURL
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

export default class AuthService {
  static async loginUser({login, password}: ILoginBody): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {login, password})
  }

  static async registerUser({login, username, password}: IRegistrationBody): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {login, username, password})
  }

  static async logoutUser(): Promise<void> {
    return $api.post('/logout')
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return await axios.get<AuthResponse>(`${baseURL}/refresh`, {withCredentials: true})
  }
};

