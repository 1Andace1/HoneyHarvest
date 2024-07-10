import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { IType, IUser } from '../types/stateTypes';
import { NewUser } from './types/thunk';
// import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;


export const getProducts = createAsyncThunk('catalog/all', async() => {
    const { data } = await axios.get(`${VITE_BASE_URL}${VITE_API}/catalog`)
    return data
})
