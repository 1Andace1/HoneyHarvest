import { ActionReducerMapBuilder, Draft, createSlice, PayloadAction  } from "@reduxjs/toolkit"
import { UserState } from './../../components/initState';
import { AuthState, IUser } from '../types/stateTypes';
import { addUser, logoutUser } from '../thunkActions';
import { AuthSlice, RejectedAction, UserAction } from '../types/reducers';
import { Draft } from '@reduxjs/toolkit';

const initialState: AuthState = { user: UserState, loading: true, error: {}}

const authSlice: AuthSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  // ^ new добавила резюсер для обновления инфо о пользователе и состоянии
  reducers: {
    updateUser(state: Draft<AuthState>, action: PayloadAction<IUser>) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(addUser.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    })
    builder.addCase(addUser.fulfilled, (state: Draft<AuthState>, action: UserAction): void => {
      state.user = action.payload
      state.loading = false;
    })
    builder.addCase(addUser.rejected, (state: Draft<AuthState>, action: RejectedAction): void => {
      console.log('Неправильно введены данные', action.error)
      state.error = action.error;
      state.loading = false;
    })
    builder.addCase(logoutUser.pending, (state: Draft<AuthState>): void => {
      state.loading = true;
    })
    builder.addCase(logoutUser.fulfilled, (state: Draft<AuthState>, action: UserAction): void => {
      state.user = UserState;
      state.loading = false;
    })
    builder.addCase(logoutUser.rejected, (state: Draft<AuthState>, action: RejectedAction): void => {
      console.log('Ошибка добавления', action.error)
      state.error = action.error;
      state.loading = false;
    })
  }
})

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
