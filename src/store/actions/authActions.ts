import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { ILoginBody, ILogoutBody, IRegistrationBody } from '../../types/authTypes';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: IRegistrationBody): Promise<any> => {
    const data = await api.registerUser(userData);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: ILoginBody): Promise<any> => {
    const data = await api.loginUser(userData);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/login',
  async (userData: ILogoutBody): Promise<any> => {
    const data = await api.logoutUser(userData);
    return data;
  }
);



