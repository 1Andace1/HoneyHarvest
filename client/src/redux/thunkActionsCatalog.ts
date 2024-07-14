import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import { IInputsProducts } from "../types/stateTypes";
import { DelProduct, GetProducts, NewProduct, UpdateProduct } from "./types/thunkProduct";
// import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const getProducts: GetProducts = createAsyncThunk("catalog/all", async () => {
  const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/catalog`);
  return data;
});

export const delProduct: DelProduct = createAsyncThunk(
  "catalog/del",
  async (id: number): Promise<number | void> => {
    // проверить типизацию response (правильно ли указано: <number, number>):
    const response: AxiosResponse<number, number> = await axiosInstance.delete(
      `${VITE_BASE_URL}${VITE_API}/catalog/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const AddProduct: NewProduct = createAsyncThunk("catalog/new", async (inputs: IInputsProducts) => {
  const response: AxiosResponse<number, number> = await axiosInstance.post(
    `${VITE_BASE_URL}${VITE_API}/catalog/new`,
    { inputs }
  );
  return response
});

export const UpdProduct: UpdateProduct = createAsyncThunk("catalog/put", async (inputs: IInputsProducts) => {
  const response: AxiosResponse<number, number> = await axiosInstance.put(
    `${VITE_BASE_URL}${VITE_API}/catalog/put`,
     inputs 
  );
  return response
});


