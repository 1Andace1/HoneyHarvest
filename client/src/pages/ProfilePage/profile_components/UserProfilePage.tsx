import React, { useState, useEffect } from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import UserProfileCard from './UserProfileCard';
import EditProfileModal from './EditProfileModal';
import LoyaltyInfo from './LoyaltyProgramComponent';
import OrdersPage from './OrdersPageComponent';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/slices/authSlice'; // Замените на правильный путь
import styles from '../ProfilePage.module.css';

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

const UserProfilePage = ({ user, userTotalSpent }) => {
  const dispatch = useDispatch();
  const [loyalty, setLoyalty] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    telephone: '',
    userCity: '',
    profilePhoto: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState(null);
  const [initialFormData, setInitialFormData] = useState({}); // ^ new чтобы хранить начальные данные формы

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axiosInstance.get(
          `${import.meta.env.VITE_API}/profile/user/${user.id}`
        );
        // setFormData({
        //   username: userData.data.username,
        //   email: userData.data.email,
        //   password: '',
        //   telephone: userData.data.telephone,
        //   userCity: userData.data.userCity,
        //   profilePhoto: '',
        // });
        const initialData = {
          username: userData.data.username,
          email: userData.data.email,
          password: '',
          telephone: userData.data.telephone,
          userCity: userData.data.userCity,
          profilePhoto: '',
        };
        setFormData(initialData);
        setInitialFormData(initialData);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя', error);
      }
    };

    const fetchLoyaltyData = async () => {
      try {
        const loyaltyData = await axiosInstance.get(
          `${import.meta.env.VITE_API}/profile/loyalty`
        );
        setLoyalty(loyaltyData.data);
      } catch (error) {
        console.error('Ошибка при получении данных лояльности', error);
      }
    };

    fetchUserData();
    fetchLoyaltyData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ~ обработчик отправки формы редактирования профиля
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // создание объекта updatedFields для хранения измененных полей
      const updatedFields = {};

      for (const key in formData) {
        if (formData[key] !== initialFormData[key] && formData[key] !== '') {
          updatedFields[key] = formData[key];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        console.log('No changes detected, form not submitted.');
        return;
      }

      const formDataObj = new FormData();
      for (const key in updatedFields) {
        formDataObj.append(key, updatedFields[key]);
      }

      // проверка содержимого formDataObj
      for (const pair of formDataObj.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      // отправка PUT запрос на сервер для обновления профиля
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/profile/users/${user.id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Обновляем состояние пользователя на клиенте (тк Сервер вмдит изменения, а клиент нет)
      const updatedUser = res.data.user;
      dispatch(updateUser(updatedUser)); // Замените на ваш метод обновления пользователя в redux или в другом state management
;      onClose();
    } catch (error) {
      setError(error);
      console.error('Ошибка при обновлении данных пользователя', error);
    }
  };

  return (
    <Box p={6}  className={styles.boxСontainer}>
      {user && <UserProfileCard user={user} onEdit={onOpen} />}
      {loyalty && <LoyaltyInfo userTotalSpent={userTotalSpent} />}
      {/* <OrdersPage user={user} /> */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default UserProfilePage;
