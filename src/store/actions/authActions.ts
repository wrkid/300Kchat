import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

interface RegistrationData {
  login: string,
  username: string,
  password: string
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegistrationData): Promise<any> => {
    const data = await api.registerUser(userData);
    return data;
  }
)