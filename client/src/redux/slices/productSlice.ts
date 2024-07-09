import { UserState } from './../../components/initState';
import { ActionReducerMapBuilder, Draft, createSlice } from "@reduxjs/toolkit"
// import { AuthState } from "../types/states"
import { addUser, logoutUser } from '../thunkActions';
// import { productSlice, RejectedAction, UserAction } from '../types/reducers';


const initialState: ProdustState = { products: [], loading: true, error: {}}

const authSlice: productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProdustState>): void => {
    builder.addCase(getProducts.pending, (state: Draft<ProdustState>): void => {
      state.loading = true;
    })
    builder.addCase(getProducts.fulfilled, (state: Draft<ProdustState>, action: ProductAction): void => {
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

export default authSlice.reducer
