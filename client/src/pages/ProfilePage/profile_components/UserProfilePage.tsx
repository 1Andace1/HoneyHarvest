import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import UserProfileCard from './UserProfileCard';
import EditProfileModal from './EditProfileModal';
// import LoyaltyInfo from './LoyaltyProgramComponent';
// import OrdersPage from './OrdersPageComponent';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/slices/authSlice';

interface User {
  id: number;
  username: string;
  email: string;
  telephone: string;
  userCity: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  telephone: string;
  userCity: string;
  profilePhoto: File | string;
}

interface UserProfilePageProps {
  user: User;
  userTotalSpent?: number;
}
const { VITE_API }: ImportMeta['env'] = import.meta.env;

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  user,
}: UserProfilePageProps) => {
  const dispatch = useDispatch();
  // const [loyalty, setLoyalty] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    telephone: '',
    userCity: '',
    profilePhoto: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [error, setError] = useState<Error | null>(null);
  const [initialFormData, setInitialFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    telephone: '',
    userCity: '',
    profilePhoto: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axiosInstance.get(
          `${VITE_API}/profile/user/${user.id}`
        );
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

    // const fetchLoyaltyData = async () => {
    //   try {
    //     const loyaltyData = await axiosInstance.get(
    //       `${import.meta.env.VITE_API}/profile/loyalty`
    //     );
    //     setLoyalty(loyaltyData.data);
    //   } catch (error) {
    //     console.error('Ошибка при получении данных лояльности', error);
    //   }
    // };

    fetchUserData();
  }, [user.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
         //  @ts-ignore
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ~ обработчик отправки формы редактирования профиля
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // создание объекта updatedFields для хранения измененных полей
      const updatedFields: Partial<FormData> = {};

      for (const key in formData) {
        if (
          formData[key as keyof FormData] !==
            initialFormData[key as keyof FormData] &&
          formData[key as keyof FormData] !== ''
        ) {
          {

          }
             //  @ts-ignore
          updatedFields[key as keyof FormData] =
            formData[key as keyof FormData];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        console.log('No changes detected, form not submitted.');
        return;
      }

      const formDataObj = new FormData();
      for (const key in updatedFields) {
        formDataObj.append(
          key,
          updatedFields[key as keyof FormData] as string | Blob
        );
      }

      // проверка содержимого formDataObj
      for (const pair of formDataObj.entries()) {
        console.log(
          pair[0] + ': ' + (pair[1] instanceof Blob ? 'Blob' : pair[1])
        );
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
      onClose();
    } catch (error: any) {
      // setError(error);
      console.error('Ошибка при обновлении данных пользователя', error);
    }
  };
  return (
    <Box p="0" m="0" border="none">
      {user && <UserProfileCard user={user} onEdit={onOpen} />}
      {/* {loyalty && <LoyaltyInfo userTotalSpent={userTotalSpent} />} */}
      {/* <OrdersPage user={user} /> */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        //  @ts-ignore
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default UserProfilePage;
