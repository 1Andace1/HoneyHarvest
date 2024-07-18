import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddProduct, deleteProduct, getbasket } from '../thunkbasketApp';

// Создаем асинхронные thunk для загрузки и добавления данных в корзину

export const basketApp = createAsyncThunk<Product>('basket/basketApp', async (product) => {
  const response = await axios.post<Product>('/api/basket', product);
  return response.data;
});

// export const getbasket = createAsyncThunk('basket/getbasket', async () => {
//   const response = await axios.get('/api/basket');
//   return response.data;
// });
interface Product {
  // Define the properties of your product here
  // For example:
  id: number;
  name: string;
  price: number;
  // ...
}
const initialState: {
  basketApp: Product[];
  loading: boolean;
  error: string | null | undefined;
} = {
  basketApp: [],
  loading: false,
  error: null,
};


const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка состояний для basketApp
    builder.addCase(basketApp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(basketApp.fulfilled, (state, action) => {
      state.basketApp.push(action.payload);
      state.loading = false;
    });
    builder.addCase(basketApp.rejected, (state, action) => {
      console.log('Ошибка добавления в корзину', action.error);
      state.error = action.error.message;
      state.loading = false;
    });
    //перезапись данных в бд
    builder.addCase(AddProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddProduct.fulfilled, (state, action) => {
      const index = state.basketApp.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.basketApp[index] = action.payload;
      } else {
        state.basketApp.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(AddProduct.rejected, (state, action) => {
      console.log('Ошибка перезапись в корзину', action.error);
      state.error = action.error.message;
      state.loading = false;
    });

    // Обработка состояний для getbasket
    builder.addCase(getbasket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getbasket.fulfilled, (state, action) => {
      state.basketApp = action.payload;
      state.loading = false;
    });
    builder.addCase(getbasket.rejected, (state, action) => {
      console.log('Ошибка чтения корзины', action.error);
      state.error = action.error.message;
      state.loading = false;
    });
    
  builder.addCase(deleteProduct.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(deleteProduct.fulfilled, (state, action) => {
    state.basketApp = state.basketApp.filter((product: Product) => product.id !== action.payload);
    state.loading = false;
  });
  builder.addCase(deleteProduct.rejected, (state, action) => {
    state.error = action.error.message;
    state.loading = false;
  });
  },
});


export default basketSlice.reducer;