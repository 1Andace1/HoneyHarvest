import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosInstance, { setAccessToken } from "../axiosInstance";
import { IType, IUser } from "../types/stateTypes";
import { NewUser } from "./types/thunk";
// import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const basketApp = createAsyncThunk(
  "basket/App",
  async (userId:number ,productId:number) => {
    console.log(userId,productId,'ЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩ');
    
// проверить типизацию response (правильно ли указано: <number, number>):
    const response = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/basket/catalog`,
      {userId, productId}
    );
    if (response.status === 200) {
      return id;
    }
  }
);
export const getbasket = createAsyncThunk(
    "basket/get",
    async ()=> {

      const {data} = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/basket`
      );
      console.log(data,'ЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩЩ');
      return data

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