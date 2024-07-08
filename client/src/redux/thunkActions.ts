import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance, { setAccessToken } from "../axiosInstance";
import { IType, IUser } from "../types/stateTypes";
import { NewUser } from "./types/thunk";
import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export const addUser: NewUser = createAsyncThunk(
  "users/create",
  async ({ type, inputs }: IType) => {
    const res: AxiosResponse = await axiosInstance.post(
      `${VITE_BASE_URL}${VITE_API}/auth/${type}`,
      inputs
    );
    const data = res.data.user as IUser;
    setAccessToken(res.data.accessToken);
    return data;
    
    
  }
);

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const res: AxiosResponse = await axiosInstance.get(
    `${VITE_BASE_URL}${VITE_API}/auth/logout`
  );
  if (res.status === 200) {
    setAccessToken("");
  }
});
