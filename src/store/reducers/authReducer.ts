import { createSlice } from '@reduxjs/toolkit';
import { chechAuth, loginUser, registerUser } from '../authActions/authActions';

import { AuthState } from '@/types/authTypes';

const initialState: AuthState = {
  loading: false,
  error: false,
  success: false,
  isAuth: false,
  userInfo: {
    login: '',
    id: '',
    username: '', 
    // на бэке присылает только логин и id, 
    // добавить username на бэке
    // и потом когда-ниубдь в далеком будущем url изображения профиля
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.userInfo = {
          login: '',
          id: '',
          username: ''
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.isAuth = true;
        state.userInfo = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        // Обработка ошибки, например, сохранение текста ошибки
        state.errorMessage = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.userInfo = {
          login: '',
          id: '',
          username: ''
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.isAuth = true;
        state.userInfo = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        // Обработка ошибки, например, сохранение текста ошибки
        state.errorMessage = action.payload ? action.payload.errorMessage : 'Unknown error';
      })
      .addCase(chechAuth.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.userInfo = {
          login: '',
          id: '',
          username: ''
        }
      })
      .addCase(chechAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.isAuth = true;
        state.userInfo = action.payload.user;
      })
      // давить Unauthorized
    }
});


export default authSlice.reducer;