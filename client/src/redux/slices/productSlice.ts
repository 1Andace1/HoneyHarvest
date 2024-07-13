import {
  ActionReducerMapBuilder,
  Draft,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
// import { AuthState } from "../types/states"
import {
  AddProduct,
  delProduct,
  getProducts,
  UpdProduct,
} from "../thunkActionsCatalog";
import {
  ProductAction,
  ProductSlice,
  RejectedActionProduct,
} from "../types/reducers";
import { ProductState } from "../types/states";
import { IProducts } from "../../types/stateTypes";

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
      (
        state: Draft<ProductState>,
        action: PayloadAction<number | void>
      ): void => {
        state.products = state.products.filter(
          (el): boolean => Number(el.id) !== action.payload
        );
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
    // создание записи в каталоге:
    builder.addCase(AddProduct.pending, (state: Draft<ProductState>): void => {
      state.loading = true;
    });
    builder.addCase(
      AddProduct.fulfilled,
      (state: Draft<ProductState>, action: PayloadAction<IProducts>): void => {
        state.products.push(action.payload.data);
        state.loading = false;
      }
    );
    builder.addCase(
      AddProduct.rejected,
      (state: Draft<ProductState>, action: RejectedActionProduct): void => {
        console.log("Ошибка добавления записи в каталог", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );

    // изменение записи в каталоге:
    builder.addCase(UpdProduct.pending, (state: Draft<ProductState>): void => {
      state.loading = true;
    });
    builder.addCase(
      UpdProduct.fulfilled,
      (state: Draft<ProductState>, action: PayloadAction<IProducts>): void => {
        const modifiedСard: IProducts = action.payload.data
        state.products = state.products.filter(
          (el: Draft<IProducts>): boolean => el.id !== modifiedСard.id
        );
        state.products.push(modifiedСard)
        state.products.sort((a: Draft<IProducts>, b: Draft<IProducts>) => a.id - b.id)
        state.loading = false;
      }
    );
    builder.addCase(
      UpdProduct.rejected,
      (state: Draft<ProductState>, action: RejectedActionProduct): void => {
        console.log("Ошибка изменения записи в каталог", action.error);
        state.error = action.error;
        state.loading = false;
      }
    );


    
  },
});

export default productSlice.reducer;
