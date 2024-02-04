import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/AuthService';
import { ILoginBody, IRegistrationBody } from '../../types/authTypes';
import AuthService from '../../services/AuthService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: ILoginBody): Promise<any> => {
    const response = await api.loginUser(userData);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registrarion',
  async (userData: IRegistrationBody): Promise<any> => {
    const response = await AuthService.registerUser(userData);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (): Promise<void> => {
    const response = await api.logoutUser();
    localStorage.removeItem('token')
    console.log(response)
  }
);

export const chechAuth = createAsyncThunk(
  'auth/checkAuth',
  async (): Promise<any> => {
    const response = await api.checkAuth();
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
)


