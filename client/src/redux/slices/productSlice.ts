import { ActionReducerMapBuilder, Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { AuthState } from "../types/states"
import { delProduct, getProducts } from "../thunkActionsCatalog";
import {  ProductAction, ProductSlice, RejectedActionProduct } from "../types/reducers";
import { ProductState } from "../types/states";

const initialState: ProductState = { products: [], loading: true, error: {} };

const productSlice: ProductSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>): void => {
    // получение каталога:
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
    // удаление записи из каталога:
    builder.addCase(delProduct.pending, (state: Draft<ProductState>): void => {
      state.loading = true;
    });
    builder.addCase(
      delProduct.fulfilled,
      (state: Draft<ProductState>, action: PayloadAction<number | void>): void => {
        state.products = state.products.filter((el): boolean => el.id !== action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      delProduct.rejected,
      (state: Draft<ProductState>, action: RejectedActionProduct): void => {
        console.log("Ошибка удаления записей из каталога", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );



    
  },
});

export default productSlice.reducer;
