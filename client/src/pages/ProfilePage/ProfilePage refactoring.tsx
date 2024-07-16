// ! 2й вариант

import { useAppSelector, useAppDispatch } from '../../redux/hooks'; // ^ new добавила useAppDispatch
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Grid,
  GridItem,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import dayjs from 'dayjs'; //  для отрисовки красиво даты
import 'dayjs/locale/ru'; // для отрисовки красиво даты Импорт русской локали для dayjs
import { useDispatch } from 'react-redux'; // Импортируйте useDispatch, если используете Redux
import { updateUser } from '../../redux/slices/authSlice'; // импорт action для обновления пользователя

import UserProfileCard from './profile_components/UserProfileCard';
import LoyaltyProgramComponent from './profile_components/LoyaltyProgramComponent';
import OrderHistory from './profile_components/OrderHistory';
import OrderDetails from './profile_components/OrderDetails';
import EditProfileModal from './profile_components/EditProfileModal';
import LoyaltyProgram from './LoyaltyProgram';

// * Я ДОПОЛНИТЕЛЬНО ДОБАВЛЯЮ СТАРЫЕ КОМПОНЕНТЫ:
import PurchaseHistory from './profile_components/PurchaseHistory';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import WeatherCard_2 from '../../components/WeatherCard/WeatherCard NEW';
import WeatherForecast from '../../components/WeatherForecast NEW/WeatherForecast';
import MyCalendar from '../../components/CalendarCard/CalendarCard';
import Achievements from './profile_components/Achievements';

import localizedFormat from 'dayjs/plugin/localizedFormat'; //   для отрисовки красиво даты
import UserProfilePage from './profile_components/UserProfilePage';
import OrdersPageComponent from './profile_components/OrdersPageComponent'; // новое имя компонента, чтобы избежать конфликта с переменной
dayjs.extend(localizedFormat); //  для отрисовки красиво даты
dayjs.locale('ru'); //  для отрисовки красиво даты
import styles from './ProfilePage.module.css';

// ! это все старые импорты, подумаьт(их там нет):
// import LoyaltyProgram from './LoyaltyProgram';
// import Achievements from './profile_components/Achievements';

// import styles from './ProfilePage.module.css';

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

function ProfilePag_refactoring(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  console.log('🟪 user============', user);

  const [formData, setFormData] = useState({
    // состояние для режима редактирования профиля
    username: user?.username || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    userCity: user?.userCity || '',
    password: '',
    profilePhoto: null,
  });
  const [isEditing, setIsEditing] = useState(false); // состояние для режима редактирования профиля
  const [ordersData, setOrdersData] = useState([]); // new = изменено имя переменной на ordersData, чтобы избежать конфликта//  состояния для истории заказов
  const [selectedOrder, setSelectedOrder] = useState(null); // состояние для просмотра деталей конкреттного заказа
  const [orderDetails, setOrderDetails] = useState([]); // состояние для хранения выбранного заказа
  const [userTotalSpent, setUserTotalSpent] = useState(0); // сумма, потраченная пользователем
  const [error, setError] = useState(null); // состояние для хранения ошибок
  const { isOpen, onOpen, onClose } = useDisclosure(); // ? useDisclosure для управления состоянием модального окна чакры для редактирования

  const loyaltyProgram = useState(new LoyaltyProgram());
  // ! это все старое, подумаьт(их там нет):
  // const [loyalty, setLoyalty] = useState(null); // ?
  // const [loading, setLoading] = useState(true); // ?

  console.log('🟪 user============', user);

  useEffect(() => {
    fetchUserTotalSpent();
    fetchOrders();
  }, []);

  // ~ fetchUserTotalSpent = Загрузка общей суммы, потраченной пользователем:
  const fetchUserTotalSpent = async () => {
    if (!user) return;
    try {
      // Здесь происходит запрос на сервер или другой способ получения информации
      // const totalSpent = await getTotalSpentFromAPI(); // Ваш метод для получения суммы потраченной пользователем
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/profile/purchase-history/${user.id}`
      );
      const { totalSpent, baskets } = response.data;

      setOrdersData(baskets); // сохраняем корзины пользователя для отображения истории покупок
      console.log('ordersData, setOrdersData baskets', baskets);
      console.log('ordersData, setOrdersData baskets', ordersData);
      setUserTotalSpent(totalSpent); // ? может убрать Устанавливаем сумму потраченную пользователем
    } catch (error) {
      console.error(
        'Ошибка при получении суммы потраченной пользователем:',
        error
      );
    }
  };

  // ~  useEffect fetchOrders = Загрузка истории заказов пользователя

  const fetchOrders = async () => {
    try {
      // получаем заказы пользователя с сервера
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/profile/orders/${user.id}`
      );
      setOrdersData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  // ~  useEffect handleViewDetails = Загрузка деталей конкретного заказа
  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    try {
      const response = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/profile/order-details/${order.id}`
      );
      setOrderDetails(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserTotalSpent();
      fetchOrders();
    }
  }, [user?.id]);

  // ~ useEffect isEditing = Инициализация формы редактирования == обновление  данные юзера после изменений
  useEffect(() => {
    if (!isEditing) {
      setFormData({
        username: user?.username,
        email: user?.email,
        telephone: user?.telephone,
        userCity: user?.userCity,
        password: '',
        profilePhoto: null,
      });
    }
  }, [isEditing, user]);

  // useDisclosure для модельного окна просмотра деталей заказа
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();

  // ~ formatDateTime = Форматирование даты и времени:
  const formatDateTime = (datetime) => {
    return dayjs(datetime).format('D MMMM (dddd) в HH:mm');
  };

  // ~ обработчик изменения полей формы  профиля
  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      // eсли меняется фото профиля, сохраняем файл в состояние
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    } else {
      // иначе обновление соответствующего поле состояния
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // ~ обработчик отправки формы редактирования профиля
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // объект FormData для отправки данных формы на сервер
      const formDataObj = new FormData();
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
      formDataObj.append('telephone', formData.telephone);
      formDataObj.append('userCity', formData.userCity);
      if (formData.password) {
        formDataObj.append('password', formData.password);
      }
      if (formData.profilePhoto) {
        formDataObj.append('profilePhoto', formData.profilePhoto);
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
      // new закрытие модальное окно после успешного обновления:
      setIsEditing(false);
      onClose();
    } catch (error) {
      // Устанавливаем ошибку в состоянии при неудаче
      setError(error);
    }
  };

  {
    /* <Text fontSize="1.1rem" color="gray.500" bg="#C6F6D5" color="gray.500">
                        {product.description}
                      </Text> */
  }
  return (
    <Container maxW="100%" pt={10} bg="#F0FFF4"   className={styles.bodyProfile}>
      {/* ФЛЕКС ОДИН СТАРТА */}
      <Flex maxW="1300px" flexWrap="wrap" gap={6} bg="#C6F6D5" >
        {/* ФЛЕКС 2 СТАРТА */}
        <Flex
          maxW="100%"
          alignItems="flex-start"
          justifyContent="space-between"
          bg="#F0FFF4"
          
        >
          <Box
            key={1}
            p={4}
            borderWidth={1}
            borderRadius="md"
            w="30%" // Пример ширины одной карточки (можете настроить по вашему желанию)
            bg="#C6F6D5"
            className={styles.boxСontainer}
          >
            <UserProfilePage
              user={user}
              onEdit={onOpen}
              userTotalSpent={userTotalSpent}
            />
            {/* Содержимое первой карточки */}
          </Box>

          <Box
            key={2}
            p={4}
            borderWidth={1}
            borderRadius="md"
            w="200%" // Пример ширины одной карточки (можете настроить по вашему желанию)
            bg="#C6F6D5"
            className={styles.boxСontainer}
          >
            {/* Содержимое третьей карточки */}
            <Achievements userId={user.id} />
          </Box>
        </Flex>

        <Flex
          w="100%"
          alignItems="flex-start"
          justifyContent="space-between"
          bg="#F0FFF4"
          className={styles.boxСontainer}
        >
          <Box
            key={1}
            p={4}
            borderWidth={1}
            borderRadius="md"
            w="100%" // Пример ширины одной карточки (можете настроить по вашему желанию)
            bg="#C6F6D5"
            className={styles.boxСontainer}
            flex-direction="column"
            
          >
            <WeatherForecast />
            {/* Содержимое первой карточки */}
          </Box>
        </Flex>

        {/* Левая колонка - UserProfilePage и MyCalendar */}

        <Box flexBasis={{ base: '100%', md: '80%' }} >
          <Flex direction={{ base: 'column', md: 'row' }} gap={6}></Flex>
        </Box>

        <Box flexBasis="100%">
          <MyCalendar />
        </Box>
        {/* Правая боковая колонка - WeatherForecast */}
        <Box
          flexBasis={{ base: '100%', md: '100%' }}
          alignSelf={{ base: 'auto', md: 'flex-start' }}
        ></Box>

        {/* Правая колонка - Achievements, OrderHistory, OrderDetails, OrdersPageComponent */}

        {selectedOrder && (
          <Box flexBasis="100%"  className={styles.boxСontainer}>
            <OrderDetails
              selectedOrder={selectedOrder}
              orderDetails={orderDetails}
            />
          </Box>
        )}
        <Box flexBasis="100%">
          <OrdersPageComponent
            user={user}
            userId={user.id}
            orders={ordersData}
          />
        </Box>
      </Flex>

      {/* Модальное окно редактирования профиля */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <Box flexBasis={{ base: '100%', md: '100%' }}  className={styles.boxСontainer}>
        <MyCalendar />
      </Box>
    </Container>
  );
}

export default ProfilePag_refactoring;
