import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { setUser } from './slices/setUserSlice';

export const refreshUserToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_API}/tokens/refresh`);
      const user = response.data.user;
      const accessToken = response.data.accessToken;
      dispatch(setUser(user));
      setAccessToken(accessToken);
      return user;
    } catch (error) {
      return rejectWithValue('Failed to refresh token');
    }
  }
);