import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import { IInputsProducts } from "../types/stateTypes";
import { DelProduct, GetProducts, NewProduct, UpdateProduct } from "./types/thunkProduct";
// import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const getAllComments: GetProducts = createAsyncThunk("comment/all", async () => {
  const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/comment/all`);
  return data;
});

// export const getAllCommentsOnCard: GetProducts = createAsyncThunk("comment/all", async () => {
//   const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/comment/allcomments`);
//   return data;
// });

// export const getAllUnverifiedComments: GetProducts = createAsyncThunk("comment/all", async (id: number) => {
//   const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/comment/commentsoncard/${id}`);
//   return data;
// });

export const delComment: DelProduct = createAsyncThunk(
  "comment/del",
  async (id: number): Promise<number | void> => {
    // проверить типизацию response (правильно ли указано: <number, number>):
    const response: AxiosResponse<number, number> = await axiosInstance.delete(
      `${VITE_BASE_URL}${VITE_API}/comment/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const AddComment: NewProduct = createAsyncThunk("comment/new", async (inputs: IInputsProducts) => {
  const response: AxiosResponse<number, number> = await axiosInstance.post(
    `${VITE_BASE_URL}${VITE_API}/comment/new`,
    { inputs }
  );
  return response
});

export const UpdComment: UpdateProduct = createAsyncThunk("catalog/put", async (inputs: IInputsProducts) => {
  const response: AxiosResponse<number, number> = await axiosInstance.put(
    `${VITE_BASE_URL}${VITE_API}/comment/put`,
     inputs 
  );
  return response
});


