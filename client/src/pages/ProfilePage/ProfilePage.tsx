import { useAppSelector } from '../../redux/hooks';
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

function ProfilePage(): JSX.Element {
  // получение данных пользователей из глобального состояния сиспользованием useAppSelector
  const { user } = useAppSelector((state) => state.authSlice);
  // состояние для режима редактирования профиля
  const [isEditing, setIsEditing] = useState(false);
  // состояние для режима редактирования профиля
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    password: '',
    profilePhoto: null,
  });
  // состояние для хранения ошибок
  const [error, setError] = useState(null);
  // состояние для хранения заказов пользователя
  const [orders, setOrders] = useState([]); // ^ new состояния для истории заказов
  // useDisclosure для управления состоянием модального окна чакры для редактирования
  const { isOpen, onOpen, onClose } = useDisclosure(); // ^ new
  // состояние для просмотра деталей конкреттного заказа
  const [selectedOrder, setSelectedOrder] = useState(null); // ^ new
  // useDisclosure для модельного окна просмотра деталей заказа
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure() // ^ new

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

  // обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // объект FormData для отправки данных формы на сервер
      const formDataObj = new FormData();
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
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
    } catch (error) {
      // Устанавливаем ошибку в состоянии при неудаче
      setError(error);
    }
  };

  // ^ new  useEffect для получения заказов пользователя при загрузке компонента
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // получаем заказы пользователя с сервера
        const response = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/profile/orders/${user.id}`
        );
        setOrders(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchOrders();
  }, [user.id]);

const handleViewDetails = (order) => {
setSelectedOrder(order)
onDetailsOpen();
}
  
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      bg="#A0AEC0"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Heading> Профиль пользователя </Heading>

      <VStack spacing={6} color="white" w="full">
        {/* <Heading as="h1" size="xl">
          Приветствуем Вас, {user.username}!
        </Heading> */}
        <Image
          src={user.profilePhoto || '/uploads/no-photo.jpg'}
          alt="Profile Photo"
        />

        <HStack w="full" justifyContent="space-around">
          <VStack spacing={3} alignItems="flex-start">
            <Text fontSize="lg"> Имя пользователя: {user.username}</Text>
            <Text fontSize="lg"> Email: {user.email}</Text>
            <Button
              colorScheme="blue"
              style={{ margin: '5px' }}
              bg="#2F855A"
              _hover={{ bg: 'teal.700' }}
              _active={{ bg: 'teal.800' }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => setIsEditing(true)}
            >
              Редактировать профиль
            </Button>
          </VStack>
          {user.profilePhoto && (
            <Image
              boxSize="150px"
              borderRadius="full"
              src={`http://localhost:3100${user.profilePhoto}`}
              // `${import.meta.env.VITE_API}/profile/users/${user.id}`, // ! 2й вариант потом попробовать
              alt="Profile Photo"
            />
          )}{' '}
          // ! предыдущий ранее рабочий вариант
        </HStack>
      </VStack>

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
                />
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Эл.почта"
                />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Пароль"
                />
                <Input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleChange}
                />
                <Button type="submit">Сохранить</Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <Heading>История заказов</Heading>
      <VStack>
        {orders.map((order) => (
          <Box key={order.id}>
            <Text>Дата заказа: {order.date}</Text>
            <Text>Статус: {order.status}</Text>
            <Text>Ориентировочное время доставки: {order.estimatedDate}</Text>
            <Text>Общая стоимость: {order.totalBasketPrice}</Text>
            <Text>Адрес доставки: {order.deliveryAddress}</Text>
            <Text>Адрес доставки: {order.comment}</Text>
            <Button onClick={() => console.log('View order details')}>
              Посмотреть детали
            </Button>
          </Box>
        ))}
      </VStack>
      {selectedOrder && (
        <OrderDetailsModal isOpen={isDetailsOpen} onClose={onDetailsClose} order={selectedOrder} />
      )}
    </Box>
  );
}

export default ProfilePage;
