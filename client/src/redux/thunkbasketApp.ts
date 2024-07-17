import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

interface BasketItem {
  userId: number;
  productId: number;
  orderId?:number;
  numberBasket: number;
  status: string;
  commentUser: string;
  totalBasketPrice: number;
  deliveryAddress: string;
  estimatedDate:number;
}

export const basketApp = createAsyncThunk(
  "basket/App",
  async ({ userId, productId}: BasketItem) => {
    console.log(userId, productId,'ЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩ');

    const response = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/basket/catalog`,
      { userId, productId}
    );
    if (response.status === 200) {
      return response.data; // Предполагается, что сервер возвращает данные корзины
    }
  }
);

export const AddProduct = createAsyncThunk(
  "basket/Add",
  async ({ userId, numberBasket, status, commentUser, totalBasketPrice, deliveryAddress,estimatedDate }: BasketItem) => {
    console.log(userId, numberBasket, status, commentUser, totalBasketPrice, deliveryAddress ,estimatedDate,'ЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩ');
    const response = await axiosInstance.put(
      `${VITE_BASE_URL}${VITE_API}/basket/put`,
      { userId,numberBasket, status, commentUser, totalBasketPrice, deliveryAddress , estimatedDate }
    );
    if (response.status === 200) {
      return response.data; // Предполагается, что сервер возвращает данные корзины
    }
  }
);

export const getbasket = createAsyncThunk(
  "basket/get",
  async ({userId}:BasketItem) => {
    console.log(userId,"НОООООООООООООООООООООООООООООООООООООО");
    
    const response = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/basket/get`,
      { params: { userId } } 
    );
    console.log(response.data, 'ФФФФФФФФФФФФФФФФФФФФФФФФФФ');
    return response.data.entry;
  }
);

export const deleteProduct = createAsyncThunk(
  "basket/delete",
  async (id: number, { rejectWithValue }) => {
    console.log(id,"Я УДАЛЯЮ");
    try {
      const response = await axiosInstance.delete(
        `${VITE_BASE_URL}${VITE_API}/basket/delete/${id}`
      );
      if (response.status === 200) {
        return id; 
      }
    } catch (error) {
      console.log(rejectWithValue, 'Я УДАЛЕНИЕ ПРОВЕРЯЮ');
      return rejectWithValue(error.response.data);
    }
  }
);
