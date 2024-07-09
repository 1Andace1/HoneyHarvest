import { UserState } from "./../../components/initState";
import { ActionReducerMapBuilder, Draft, createSlice } from "@reduxjs/toolkit";
// import { AuthState } from "../types/states"
import { addUser, logoutUser } from "../thunkActions";
import { getProducts } from "../thunkActionsCatalog";
// import { productSlice, RejectedAction, UserAction } from '../types/reducers';

const initialState: ProductState = { products: [], loading: true, error: {} };

const authSlice: productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>): void => {
    builder.addCase(getProducts.pending, (state: Draft<ProductState>): void => {
      state.loading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state: Draft<ProductState>, action: ProductAction): void => {
        state.products = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getProducts.rejected,
      (state: Draft<ProductState>, action: RejectedAction): void => {
        console.log("Ошибка получения каталога", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );




    
  },
});

export default authSlice.reducer;
