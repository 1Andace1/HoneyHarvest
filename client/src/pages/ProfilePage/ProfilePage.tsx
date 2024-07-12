// import React, { useState, useEffect } from 'react';
// import { Container, Text, VStack, useDisclosure } from '@chakra-ui/react';
// import axiosInstance from '../../axiosInstance';
// import UserProfileCard from './UserProfileCard';
// import OrderCard from './OrderCard';
// import LoyaltyInfo from './LoyaltyInfo';
// // import Loader from '../Loader/Loader';

// const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [loyalty, setLoyalty] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderDetails, setOrderDetails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userProfileResponse = await axiosInstance.get(`${import.meta.env.VITE_API}/profile/users`);
//         setUser(userProfileResponse.data);

//         const loyaltyResponse = await axiosInstance.get(`${import.meta.env.VITE_API}/profile/loyalty-program`);
//         setLoyalty(loyaltyResponse.data);

//         const ordersResponse = await axiosInstance.get(`${import.meta.env.VITE_API}/profile/orders`);
//         setOrders(ordersResponse.data);

//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleOrderDetailsOpen = (order, details) => {
//     setSelectedOrder(order);
//     setOrderDetails(details);
//     onOpen();
//   };

//   // if (loading) {
//   //   return <Loader />;
//   // }

//   return (
//     <Container maxW="container.lg" py={8}>
//       {user && <UserProfileCard user={user} />}
//       {loyalty && <LoyaltyInfo loyalty={loyalty} onOpen={onOpen} />}
//       <Text fontSize="2xl" mt={8} mb={4} fontWeight="bold" color="#2F855A">
//         История заказов
//       </Text>
//       <VStack spacing={4} align="stretch">
//         {orders.map((order) => (
//           <OrderCard key={order.id} order={order} onDetailsOpen={handleOrderDetailsOpen} />
//         ))}
//       </VStack>
//       {/* Здесь можно добавить модальное окно для показа деталей заказа */}
//     </Container>
//   );
// };

// export default ProfilePage;

// & КОД ДО ПЕРЕНОСА ВСЕГО В МАЛЕНЬКИЕ КОМПОНЕНТЫ:

import { useAppSelector, useAppDispatch } from '../../redux/hooks'; // ^ new добавила useAppDispatch
import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
  Button,
  useDisclosure,
  StackDivider,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
// import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';
// import { Step, Steps, useSteps } from '@chakra-ui/react';
import dayjs from 'dayjs'; //  для отрисовки красиво даты
import 'dayjs/locale/ru'; // для отрисовки красиво даты Импорт русской локали для dayjs
import localizedFormat from 'dayjs/plugin/localizedFormat'; //   для отрисовки красиво даты
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';
dayjs.extend(localizedFormat); //  для отрисовки красиво даты
dayjs.locale('ru'); //  для отрисовки красиво даты
import { updateUser } from '../../redux/slices/authSlice'; // ^ new импорт action для обновления пользователя
import LoyaltyProgram from './LoyaltyProgram';
import PurchaseHistory from './PurchaseHistory';
import LoyaltyProgramComponent from './LoyaltyProgramComponent';
import Achievements from './Achievements';
import LoyaltyInfo from './LoyaltyInfo';
import OrderCard from './OrderCard';

// interface ProfilePageProps {
// ПРОПСЫ ПОТОМ СЮДА ПРОКИНУТЬ
// }

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

function ProfilePage(): JSX.Element {
  const dispatch = useAppDispatch(); // ^ new инициализация useAppDispatch
  // получение данных пользователей из глобального состояния сиспользованием useAppSelector
  const { user } = useAppSelector((state) => state.authSlice);
  console.log('🟪 user============', user);
  // состояние для режима редактирования профиля
  const [isEditing, setIsEditing] = useState(false);
  // состояние для режима редактирования профиля
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    telephone: user?.telephone,
    userCity: user?.userCity,
    password: '',
    profilePhoto: null,
  });
  // состояние для хранения ошибок
  const [error, setError] = useState(null);
  // состояние для хранения заказов пользователя
  const [orders, setOrders] = useState([]); //  состояния для истории заказов
  // useDisclosure для управления состоянием модального окна чакры для редактирования
  const { isOpen, onOpen, onClose } = useDisclosure();
  // состояние для просмотра деталей конкреттного заказа
  const [selectedOrder, setSelectedOrder] = useState(null);
  // useDisclosure для модельного окна просмотра деталей заказа
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  // состояние для хранения выбранного заказа
  const [orderDetails, setOrderDetails] = useState([]);

  // ^ new ИНИЦИАЛИЗАЦИЯ ПРОГРАММЫ ЛОЯЛЬНОСТ (класса LoyaltyProgram )
  const loyaltyProgram = new LoyaltyProgram();
  // const [loyaltyProgram] = useState(new LoyaltyProgram()); // инициализация нового класса LoyaltyProgram
  const [userTotalSpent, setUserTotalSpent] = useState(0); // сумма, потраченная пользователем
  const [loyalty, setLoyalty] = useState(null); // ^

  // Допустим, у вас есть способ получения общей суммы, потраченной пользователем, например, через API или из другого источника данных.
  // Для целей демонстрации, предположим, что у вас есть функция, которая возвращает эту информацию.
  const fetchUserTotalSpent = async () => {
    try {
      // Здесь происходит запрос на сервер или другой способ получения информации
      // const totalSpent = await getTotalSpentFromAPI(); // Ваш метод для получения суммы потраченной пользователем
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/profile/purchase-history/${user.id}`
      );
      const { totalSpent, baskets } = response.data;

      setOrders(baskets); // сохраняем корзины пользователя для отображения истории покупок
      setUserTotalSpent(totalSpent); // ? может убрать Устанавливаем сумму потраченную пользователем
    } catch (error) {
      console.error(
        'Ошибка при получении суммы потраченной пользователем:',
        error
      );
    }
  };
  useEffect(() => {
    fetchUserTotalSpent(); //
  }, [user.id]);

  // // ^ new  функция для получения уровня лояльности и вознаграждения пользователя
  // const getUserLoyaltyInfo = () => {
  //   const userLevel = loyaltyProgram.getUserLevel(userTotalSpent); // Получаем уровень пользователя
  //   const reward = loyaltyProgram.getReward(userTotalSpent); // Получаем вознаграждение пользователя
  //   return { userLevel, reward };
  // };

  // ^ Получение всей суммы заказов (PurchaseHistory) за всю историю для программы лояльности:
  // обработчик изменения полей формы
  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      // eсли меняется фото профиля, сохраняем файл в состояние
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    } else {
      // иначе обновление соответствующего поле состояния
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // РЕДАКТИРОВАНИЕ: обработчик отправки формы для обновления профайла
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
      // console.log('========formDataObj.userCity', formDataObj.userCity )
      // Object.keys(formDataObj).forEach((key) => {
      //   formDataObj.append(key, res[key]);
      // });

      // ^ Обновляем состояние пользователя на клиенте (тк Сервер вмдит изменения, а клиент нет)
      const updatedUser = res.data.user;
      dispatch(updateUser(updatedUser)); // Замените на ваш метод обновления пользователя в redux или в другом state management

      // ^ new закрытие модальное окно после успешного обновления:
      setIsEditing(false);
      onClose();
    } catch (error) {
      // Устанавливаем ошибку в состоянии при неудаче
      setError(error);
    }
  };
  // ^ new очистка и обновления состояния после обновления
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

  // ^ new  useEffect для получения заказов пользователя при загрузке компонента
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // получаем заказы пользователя с сервера
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/profile/orders/${user.id}`
        );
        setOrders(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchOrders();
  }, [user.id]);

  // const handleViewDetails = (order) => {
  //   setSelectedOrder(order);
  //   onDetailsOpen();
  // };
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

  const formatDateTime = (datetime) => {
    return dayjs(datetime).format('D MMMM (dddd) в HH:mm');
  };

  return (
    <>
      {' '}
      <Box
  py={10}
  px={6}
  bg="RGBA(0, 0, 0, 0.24)"
  width="100%"   // установка ширины на 100% экрана
  display="flex"
  flexDirection="column"
  alignItems="center"
  overflowX="hidden"
>

        {/* {loyalty && <LoyaltyInfo loyalty={loyalty} onOpen={onOpen} />} */}
        {/* 🟪🟪 КАРТОЧКА ДЛЯ ПРОГРАММЫ ЛОЯЛЬНОСТИ */}
        {/* <Box>
      <PurchaseHistory userId={user.id} />
      // <LoyaltyProgramComponent totalSpent={userTotalSpent} />
   
    </Box> */}

        <Heading mb={6} color="#1e1f23">
          Профиль пользователя
        </Heading>
        {/* 🟪 БЛОК ПРОГРАММЫ ЛОЯЛЬНОСТИ ПОЛЬЗОВАТЕЛЯ */}
        {/* <Box
      bg="RGBA(0, 0, 0, 0.36)"
      color="#f8f9fb"
      p={6}
      borderRadius="md"
      w="full"
      maxW="md"
      boxShadow="md"
      textAlign="left"
      mb={8}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Программа лояльности
      </Text>
      <Text>
        Уровень: <span>{getUserLoyaltyInfo().userLevel}</span>
      </Text>
      <Text>
        Вознаграждение: <span>{getUserLoyaltyInfo().reward}</span>
      </Text>
    </Box> */}

        <HStack spacing={6} w="full" align="flex-start" mb={8}>
          🟪 БЛОК ОТОБРАЖЕНИЯ ПОСЛЕДНЕГО ЗАКАЗА И ЕГО СТАТУСА
          {orders.length > 0 && (
            <Box
              bg="RGBA(0, 0, 0, 0.36)"
              color="#f8f9fb"
              p={6}
              borderRadius="md"
              w="full"
              maxW="md"
              boxShadow="md"
              textAlign="left"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Последний заказ
              </Text>
              <VStack
                spacing={4}
                divider={<StackDivider borderColor="gray.200" />}
                align="flex-start"
              >
                <Text>
                  Дата заказа: <span>{formatDateTime(orders[0].date)}</span>
                </Text>
                <Text>
                  Статус заказа: <span>{orders[0].status}</span>
                </Text>
                <Text>
                  Ориентировочное время доставки:{' '}
                  <span>{formatDateTime(orders[0].estimatedDate)}</span>
                </Text>
                <Text>
                  Общая стоимость:{' '}
                  <span>{orders[0].totalBasketPrice} руб.</span>
                </Text>
                <Text>
                  Адрес доставки: <span>{orders[0].deliveryAddress}</span>
                </Text>
                <Text>
                  Комментарий: <span>{orders[0].comment}</span>
                </Text>
              </VStack>
            </Box>
          )}
          {/* 🟪 БЛОК ПРОФИЛЯ  */}
          <Box
            bg="RGBA(0, 0, 0, 0.24)"
            color="#f8f9fb"
            p={6}
            borderRadius="md"
            w="full"
            maxW="md"
            boxShadow="md"
            // textAlign="left"
            textAlign="center"
          >
            <Image
              // src={user.photo ? `http://localhost:3000/${user.photo}` : 'http://localhost:3000/no-photo.jpg'}
              // ^ new добавktybt случайный параметр к URL изображения t=${new Date().getTime()}? tckb dlehu ghj,jktvf bp-0pf ['ibhjdyfbz]
              src={
                user.photo
                  ? `http://localhost:3000/${user.photo}?t=${new Date().getTime()}`
                  : 'http://localhost:3000/no-photo.jpg'
              } // ^
              alt="Profile Photo"
              boxSize="150px"
              borderRadius="full"
              mx="auto"
              mb={4}
            />
            <Text fontSize="lg" fontWeight="bold">
              Имя: {user.username}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Ваш email: {user.email}
            </Text>
            <Button
              colorScheme="blue"
              mt={4}
              bg="#2F855A"
              _hover={{ bg: 'teal.700' }}
              _active={{ bg: 'teal.800' }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                setIsEditing(true);
                onOpen();
              }}
            >
              Редактировать профиль
            </Button>
          </Box>
          <LoyaltyProgramComponent userTotalSpent={userTotalSpent} />
        </HStack>

        {/* 🟪🟪🟪 ____ КОМПОНЕНТ ДОСТИЖЕНИЙ */}
        <Achievements userId={user.id} />
        {/* 🟪🟪🟪 ____ КОМПОНЕНТ ЛОЯЛЬНОСТИ */}
        <LoyaltyProgramComponent userTotalSpent={userTotalSpent} />

        {/* 🟪 БЛОК ОТОБРАЖЕНИЯ заказа из Истории Заказов */}
        {selectedOrder && (
          <Box
            bg="RGBA(0, 0, 0, 0.36)"
            color="#f8f9fb"
            p={6}
            borderRadius="md"
            w="full"
            maxW="md"
            boxShadow="md"
            textAlign="left"
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              🟢 Детали заказа
            </Text>
            <VStack
              spacing={4}
              divider={<StackDivider borderColor="gray.200" />}
              align="flex-start"
            >
              <Text>
                Дата заказа: <span>{selectedOrder.date}</span>
              </Text>
              <Text>
                Статус заказа: <span>{selectedOrder.status}</span>
              </Text>
              <Text>
                Ориентировочное время доставки:{' '}
                <span>{selectedOrder.estimatedDate}</span>
              </Text>
              <Text>
                Общая стоимость:{' '}
                <span>{selectedOrder.totalBasketPrice} руб.</span>
              </Text>
              <Text>
                Адрес доставки: <span>{selectedOrder.deliveryAddress}</span>
              </Text>
              <Text>
                Комментарий: <span>{selectedOrder.comment}</span>
              </Text>
            </VStack>
            <VStack spacing={4} mt={4} align="flex-start">
              {orderDetails.map((item) => (
                <HStack key={item.id} w="full" justify="space-between">
                  <Image
                    src={item.product.picture || '/uploads/no-photo.jpg'}
                    alt={item.product.title}
                    boxSize="50px"
                  />
                  <Text>{item.product.title}</Text>
                  <Text>{item.quantity} шт.</Text>
                  <Text>{item.currentPrice} руб.</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        )}

        {/*  🟪 БЛОК ОТОБРАЖЕНИЯ ВЫБРАННОГО ЗАКАЗА */}
        {selectedOrder && (
          <OrderDetailsModal
            isOpen={isDetailsOpen}
            onClose={onDetailsClose}
            order={selectedOrder}
          />
        )}

        {/*  🟪 МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ */}
        {isEditing && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Редактировать профиль</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Имя пользователя"
                    mb={3}
                  />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Эл.почта"
                    mb={3}
                  />
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    mb={3}
                  />
                  <Input
                    type="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Номер телефона"
                    mb={3}
                  />
                  <Input
                    type="userCity"
                    name="userCity"
                    value={formData.userCity}
                    onChange={handleChange}
                    placeholder="Город"
                    mb={3}
                  />
                  <Input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleChange}
                    mb={3}
                  />

                  <Button type="submit" colorScheme="blue">
                    Сохранить
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {/*  🟪БЛОК ИСТОРИИ ВСЕХ ЗАКАЗОВ */}
        {/* <Heading mt={10} mb={6} color="#1e1f23">
      История заказов
    </Heading> */}
        <Heading mt={10} mb={6} color="#1e1f23" fontSize="3xl">
          История заказов
        </Heading>
        {/* <VStack spacing={6} align="start" w="70%"> */}
        <VStack spacing={6} align="start" w="full">
          {orders.map((order) => (
            <Box
              key={order.id}
              w="full"
              p={6}
              borderWidth="1px"
              borderRadius="md"
              bg="RGBA(0, 0, 0, 0.36)"
              color="#f8f9fb"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* <Text fontWeight="bold" textAlign="left">
            Дата заказа:{' '}
            <Text as="span" fontWeight="normal">
              {order.date}
            </Text>
          </Text> */}
              <Box>
                <Text fontWeight="bold">
                  Дата заказа:{' '}
                  <Text as="span" fontWeight="normal">
                    {formatDateTime(order.date)}
                  </Text>
                </Text>

                <Text fontWeight="bold" textAlign="left">
                  Статус:{' '}
                  <Text as="span" fontWeight="normal">
                    {order.status}
                  </Text>
                </Text>
                <Text fontWeight="bold" textAlign="left">
                  Ориентировочное время доставки:{' '}
                  <Text as="span" fontWeight="normal">
                    {formatDateTime(order.estimatedDate)}
                  </Text>
                </Text>
                <Text fontWeight="bold" textAlign="left">
                  Общая стоимость:{' '}
                  <Text as="span" fontWeight="normal">
                    {order.totalBasketPrice} руб.
                  </Text>
                </Text>
                <Text fontWeight="bold" textAlign="left">
                  Адрес доставки:{' '}
                  <Text as="span" fontWeight="normal">
                    {order.deliveryAddress}
                  </Text>
                </Text>
                <Text fontWeight="bold" textAlign="left">
                  Комментарий:{' '}
                  <Text as="span" fontWeight="normal">
                    {order.comment}
                  </Text>
                </Text>
              </Box>
              <Button
                colorScheme="blue"
                onClick={() => handleViewDetails(order)}
                bg="#2F855A"
                _hover={{ bg: 'teal.700' }}
                _active={{ bg: 'teal.800' }}
                _focus={{ boxShadow: 'none' }}
              >
                Посмотреть детали
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
      
        {/* 🟪🟪🟪 ____ КОМПОНЕНТ ДОСТИЖЕНИЙ */}
        <Achievements userId={user.id} />
        <Box borderBottom="1px solid #cbd5e0" mb={8} />
        {/* 🟪🟪🟪 ____ КОМПОНЕНТ ЛОЯЛЬНОСТИ */}
        <LoyaltyProgramComponent userTotalSpent={userTotalSpent} />
    </>
  );
}

export default ProfilePage;
