import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

interface BasketItem {
  userId: number;
  productId: number;
  numberBasket: number;
  status: number;
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
    console.log(userId,numberBasket, status, commentUser, totalBasketPrice, deliveryAddress ,estimatedDate,'ЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩ');
    const response = await axiosInstance.put(
      `${VITE_BASE_URL}${VITE_API}/basket/put`,
      { userId,numberBasket, status, commentUser, totalBasketPrice, deliveryAddress , estimatedDate}
    );
    if (response.status === 200) {
      return response.data; // Предполагается, что сервер возвращает данные корзины
    }
  }
);

export const getbasket = createAsyncThunk(
  "basket/get",
  async ({userId}:BasketItem) => {
    console.log(userId,"гоВНОООООООООООООООООООООООООООООООООООООО");
    
    const response = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/basket/get`,
      { params: { userId } } 
    );
    console.log(response.data, 'ФФФФФФФФФФФФФФФФФФФФФФФФФФ');
    return response.data;
  }
);





// export const getProducts = createAsyncThunk("catalog/all", async () => {
//   const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/catalog`);
//   return data;
// });

// export const delProduct = createAsyncThunk(
//   "catalog/del",
//   async (id: number): Promise<number | void> => {
// // проверить типизацию response (правильно ли указано: <number, number>):
//     const response: AxiosResponse<number, number> = await axiosInstance.delete(
//       `${VITE_BASE_URL}${VITE_API}/catalog/${id}`
//     );
//     if (response.status === 200) {
//       return id;
//     }
//   }
// );