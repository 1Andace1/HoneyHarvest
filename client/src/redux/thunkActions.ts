import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { IType, IUser } from '../types/stateTypes';
import { NewUser } from './types/thunk';
// import { useNavigate } from "react-router-dom";

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

export const addUser: NewUser = createAsyncThunk(
  'users/create',
  async ({ type, inputs }: IType, { rejectWithValue }) => {
    // добавлено: функция rejectWithValue от Redux Toolkit для возврата ошибок из thunk-действия
    // добавлено: проверка достаточности введенных данных 
    if (!inputs.email || !inputs.password) {
      return rejectWithValue('Пожалуйста, укажите почту и пароль');
    }

    // добавлено: если это регистрация, проверка длины пароля
    if (type === 'signup' && inputs.password.length < 3) {
      return rejectWithValue('Пароль должен быть не менее 3 символов');
    }

    // добавлено: использование FormData для отправки данных, включая файлы
    const formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key]);
    });

    // добавлено: добавление фото профиля в FormData
    if (inputs.profilePhoto) {
      formData.append('profilePhoto', inputs.profilePhoto);
    }

    try {
      const res: AxiosResponse = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/auth/${type}`,
        // inputs
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = res.data.user as IUser;
      setAccessToken(res.data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(
        'Авторизация не завершена. Пожалуйста, проверьте свои учетные данные'
      );
    }
  }
);

// использование Thunk для выхода пользователя
export const logoutUser = createAsyncThunk('users/logout', async () => {
  const res: AxiosResponse = await axiosInstance.get(
    `${VITE_BASE_URL}${VITE_API}/auth/logout`
  );
  if (res.status === 200) {
    setAccessToken('');
  }
});
