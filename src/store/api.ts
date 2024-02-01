import axios from 'axios';
import { ILoginBody, ILogoutBody, IRegistrationBody } from '@/types/authTypes';

const baseURL = 'http://localhost:2001/';

const api = {
  registerUser: async (data: IRegistrationBody) => {
    try {
      const response = await axios.post(`${baseURL}api/registration`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const registerPayload = {
        token: response.data.accessToken,
        userInfo: response.data.user
      }

      return registerPayload;
    } catch (error: any) {
      return error.response.data;
    }
  },

  loginUser: async (data: ILoginBody) => {
    try {
      const response = await axios.post(`${baseURL}api/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const loginPayload = {
        token: response.data.accessToken,
        userInfo: response.data.user
      }

      return loginPayload;
    } catch (error: any) {
      return error.response;
    }
  },
  
  logoutUser: async (data: ILogoutBody) => {
    try {
      await axios.post(`${baseURL}api/logout`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // В случае успешного logout возвращаем объект с типом "logout" но эт фигня надо править
      return { type: "logout" };
    } catch (error) {
      return error;
    }
  },
};

export default api;