import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import { IComment, IInputsComment } from "../types/stateTypes";
import { DelComment, getComments, NewComment, UpdateComment } from "./types/thunkComment";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const getAllComments: getComments = createAsyncThunk("comment/all", async () => {
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

export const delComment: DelComment = createAsyncThunk(
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

export const AddComment: NewComment = createAsyncThunk("comment/new", async (inputs: IInputsComment): Promise<IComment> => {
  const response: AxiosResponse<number, number> = await axiosInstance.post(
    `${VITE_BASE_URL}${VITE_API}/comment/new`,
    { inputs }
  );
  // @ts-ignore
  return response
});

export const UpdComment: UpdateComment = createAsyncThunk("catalog/put", async (inputs: IInputsComment) => {
  const response: AxiosResponse<number, number> = await axiosInstance.put(
    `${VITE_BASE_URL}${VITE_API}/comment/put`,
     inputs 
  );
  return response
});


