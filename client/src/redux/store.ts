import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';

const storeOptions = {
  reducer: {
    authSlice,
    productSlice
  }
}

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch