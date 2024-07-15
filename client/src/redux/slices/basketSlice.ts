
import {  createSlice, PayloadAction  } from "@reduxjs/toolkit"

import { basketApp, getbasket } from '../thunkbasketApp';


const initialState = { basketApp: [], loading: true, error: {}}
interface BasketItem {
  id: number;
  name: string;
  price: number;
  
 
}


const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {

    builder.addCase(basketApp.pending, (state): void => {
      state.loading = true;
    })
    builder.addCase(basketApp.fulfilled, (state, action: PayloadAction<BasketItem>): void => {
      // @ts-ignore
      state.basketApp.push(action.payload)
      state.loading = false;
    })
    builder.addCase(basketApp.rejected, (state, action): void => {
      console.log('Ошибка добавление в корзину', action.error)
      state.error = action.error;
      state.loading = false;
    })
        //добавление данных в корзину 
        builder.addCase(getbasket.pending, (state): void => {
            state.loading = true;
          })
          builder.addCase(getbasket.fulfilled, (state, action): void => {
            state.basketApp = action.payload
            state.loading = false;
          })
          builder.addCase(getbasket.rejected, (state, action): void => {
            console.log('Ошибка чтение корзины', action.error)
            state.error = action.error;
            state.loading = false;
          })





    // builder.addCase(logoutUser.pending, (state: Draft<AuthState>): void => {
    //   state.loading = true;
    // })
    // builder.addCase(logoutUser.fulfilled, (state: Draft<AuthState>, action: UserAction): void => {
    //   state.user = UserState;
    //   state.loading = false;
    // })
    // builder.addCase(logoutUser.rejected, (state: Draft<AuthState>, action: RejectedAction): void => {
    //   console.log('Ошибка добавления', action.error)
    //   state.error = action.error;
    //   state.loading = false;
    // })
  }
})

export default basketSlice.reducer