import axios from 'axios';

const baseURL = 'http://localhost:2001/';

interface IRegistrationBody {
  login: string;
  username: string;
  password: string;
};

interface ILoginBody {
  login: string,
  password: string
};

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
        userInfo: {
          login: response.data.user.login
        }
      }

      return registerPayload;
    } catch (error) {
      return error;
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
        userInfo: {
          login: response.data.user.login
        }
      }

      return loginPayload;
    } catch (error) {
      // Возвращаем ошибку, чтобы обработать в редьюсере
      return error;
    }
  },
  logoutUser: async () => {
    try {
      // Отправляем запрос на сервер для logout
      // Например, axios.post(`${baseURL}api/logout`);

      // В случае успешного logout возвращаем объект с типом "logout"
      return { type: "logout" };
    } catch (error) {
      // Возвращаем ошибку, чтобы обработать в редьюсере
      return error;
    }
  },
};

export default api;