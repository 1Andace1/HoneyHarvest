import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

// import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const getProducts = createAsyncThunk("catalog/all", async () => {
  const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/catalog`);
  return data;
});

export const delProduct = createAsyncThunk(
  "catalog/del",
  async (id: number): Promise<number | void> => {
    console.log('Thunk, delProduct, получили id: ', id);
// проверить типизацию response (правильно ли указано: <number, number>):
    const response: AxiosResponse<number, number> = await axiosInstance.delete(
      `${VITE_BASE_URL}${VITE_API}/catalog/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);
