import { ActionReducerMapBuilder, Draft, createSlice } from "@reduxjs/toolkit";
// import { AuthState } from "../types/states"
import { getProducts } from "../thunkActionsCatalog";
import {  ProductAction, ProductSlice, RejectedActionProduct } from "../types/reducers";
import { ProductState } from "../types/states";

const initialState: ProductState = { products: [], loading: true, error: {} };

const productSlice: ProductSlice = createSlice({
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
      (state: Draft<ProductState>, action: RejectedActionProduct): void => {
        console.log("Ошибка получения каталога", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );




    
  },
});

export default productSlice.reducer;
