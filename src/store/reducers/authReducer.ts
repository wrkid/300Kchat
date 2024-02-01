import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../actions/authActions';

interface AuthState {
  loading: boolean;
  error: boolean;
  success: boolean;
  token: string;
  userInfo: {
    login: string;
  };
  errorMessage?: string; // Добавляем опциональное свойство errorMessage
}

const initialState: AuthState = {
  loading: false,
  error: false,
  success: false,
  token: '',
  userInfo: {
    login: '',
    // username: '',
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
      });
    }
});


export default authSlice.reducer;