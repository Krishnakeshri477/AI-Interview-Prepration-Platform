// frontend\src\features\auth\authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user token from localStorage
const token = localStorage.getItem('token');

const initialState = {
  user: token ? true : false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;