import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import basketSlice from './slices/basketSlice';
import commentSlice from './slices/commentSlice';
const storeOptions = {
  reducer: {
    authSlice,
    productSlice,
    basketSlice,
    commentSlice,
  }
}

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch