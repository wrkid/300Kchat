import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../actions/authActions';

import { AuthState } from '@/types/authTypes';

const initialState: AuthState = {
  loading: false,
  error: false,
  success: false,
  token: '',
  userInfo: {
    login: '',
    id: '',
    // username: '', 
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
          id: ''
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = false;
        state.success = true;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        // Обработка ошибки, например, сохранение текста ошибки
        state.errorMessage = action.error.message;
        console.log(action.error.message)
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.userInfo = {
          login: '',
          id: ''
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = false;
        state.success = true;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        // Обработка ошибки, например, сохранение текста ошибки
        state.errorMessage = action.error.message;
        console.log(action.error.message)
      })
      
    }
});


export default authSlice.reducer;