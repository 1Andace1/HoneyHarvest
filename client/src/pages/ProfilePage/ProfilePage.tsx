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
  StackDivider,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';
// import { Step, Steps, useSteps } from '@chakra-ui/react';

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
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure(); // ^ new

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
      // ^ new закрытие модальное окно после успешного обновления:
      setIsEditing(false);
      onClose();
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
    setSelectedOrder(order);
    onDetailsOpen();
  };

  return (
    <Box
      py={10}
      px={6}
      bg="RGBA(0, 0, 0, 0.24)" // Белый фон страницы
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading mb={6} color="#1e1f23">
        Профиль пользователя
      </Heading>

      <HStack spacing={6} w="full" align="flex-start" mb={8}>
        {/* <Box
          bg="RGBA(0, 0, 0, 0.24)"
          color="#f8f9fb"
          p={6}
          borderRadius="md"
          w="full"
          maxW="md"
          boxShadow="md"
          textAlign="center"
        >
          <Image
            src={user.profilePhoto || '/uploads/no-photo.jpg'}
            alt="Profile Photo"
            boxSize="150px"
            borderRadius="full"
            mx="auto"
            mb={4}
          />
          <Text fontSize="lg" fontWeight="bold">
            Имя пользователя: {user.username}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Email: {user.email}
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
        </Box> */}

        {/* Карточка для последнего заказа */}
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
                Дата заказа: <span>{orders[0].date}</span>
              </Text>
              <Text>
                Статус заказа: <span>{orders[0].status}</span>
              </Text>
              <Text>
                Ориентировочное время доставки:{' '}
                <span>{orders[0].estimatedDate}</span>
              </Text>
              <Text>
                Общая стоимость: <span>{orders[0].totalBasketPrice} руб.</span>
              </Text>
              <Text>
                Адрес доставки: <span>{orders[0].deliveryAddress}</span>
              </Text>
              <Text>
                Комментарий: <span>{orders[0].comment}</span>
              </Text>
            </VStack>
            {/* <Steps mt={4} colorScheme="teal" activeStep={0}>
          <Step label="Заказ оформлен" />
          <Step label="Заказ собирается" />
          <Step label="Заказ отправлен" />
          <Step label="Заказ получен" />
        </Steps> */}
          </Box>
          
        )}
        <Box
          bg="RGBA(0, 0, 0, 0.24)"
          color="#f8f9fb"
          p={6}
          borderRadius="md"
          w="full"
          maxW="md"
          boxShadow="md"
          textAlign="center"
        >
          <Image
            src={user.profilePhoto || '/uploads/no-photo.jpg'}
            alt="Profile Photo"
            boxSize="150px"
            borderRadius="full"
            mx="auto"
            mb={4}
          />
          <Text fontSize="lg" fontWeight="bold">
            Имя пользователя: {user.username}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Email: {user.email}
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
      </HStack>

      <Heading mt={10} mb={6} color="#1e1f23">
        История заказов
      </Heading>
      <VStack spacing={6} align="start" w="70%">
        {orders.map((order) => (
          <Box
            key={order.id}
            w="full"
            p={6}
            borderWidth="1px"
            borderRadius="md"
            // bg="#2d3748"
            bg="RGBA(0, 0, 0, 0.36)"
            color="#f8f9fb"
          >
            <Text fontWeight="bold" textAlign="left">
              Дата заказа:{' '}
              <Text as="span" fontWeight="normal">
                {order.date}
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
                {order.estimatedDate}
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
            <Button mt={2} onClick={() => handleViewDetails(order)}>
              Посмотреть детали
            </Button>
          </Box>
        ))}
      </VStack>

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isDetailsOpen}
          onClose={onDetailsClose}
          order={selectedOrder}
        />
      )}

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
    </Box>
  );
}

export default ProfilePage;

//   return (
//     <Box
//       py={10}
//       px={6}
//       bg="RGBA(0, 0, 0, 0.16)"
//       minHeight="100vh"
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//     >
//       <Heading mb={6} color="#1e1f23">
//         Профиль пользователя
//       </Heading>

//       <VStack spacing={6} mb={8} w="full"  align="flex-start" >
//         <Box
//           bg="#2d3748"
//           color="#f8f9fb"
//           p={6}
//           borderRadius="md"
//           w="full"
//           maxW="md"
//           boxShadow="md"
//           textAlign="center"
//         >
//           <Image
//             src={user.profilePhoto || '/uploads/no-photo.jpg'}
//             alt="Profile Photo"
//             boxSize="150px"
//             borderRadius="full"
//             mx="auto"
//             mb={4}
//           />
//           <Text fontSize="lg" fontWeight="bold">
//             Имя пользователя: {user.username}
//           </Text>
//           <Text fontSize="lg" fontWeight="bold">
//             Email: {user.email}
//           </Text>
//           <Button
//             colorScheme="blue"
//             mt={4}
//             bg="#2F855A"
//             _hover={{ bg: 'teal.700' }}
//             _active={{ bg: 'teal.800' }}
//             _focus={{ boxShadow: 'none' }}
//             onClick={() => {
//               setIsEditing(true);
//               onOpen();
//             }}
//           >
//             Редактировать профиль
//           </Button>
//         </Box>

//         {isEditing && (
//           <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader>Редактировать профиль</ModalHeader>
//               <ModalCloseButton />
//               <ModalBody>
//                 <form onSubmit={handleSubmit}>
//                   <Input
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Имя пользователя"
//                     mb={3}
//                   />
//                   <Input
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Эл.почта"
//                     mb={3}
//                   />
//                   <Input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Пароль"
//                     mb={3}
//                   />
//                   <Input
//                     type="file"
//                     name="profilePhoto"
//                     accept="image/*"
//                     onChange={handleChange}
//                     mb={3}
//                   />
//                   <Button type="submit" colorScheme="blue">
//                     Сохранить
//                   </Button>
//                 </form>
//               </ModalBody>
//             </ModalContent>
//           </Modal>
//         )}
//       </VStack>

//       <Heading mt={10} mb={6} color="#f8f9fb">
//         История заказов
//       </Heading>
//       <VStack spacing={6} align="start" w="70%">
//         {orders.map((order) => (
//           <Box
//             key={order.id}
//             w="full"
//             p={6}
//             borderWidth="1px"
//             borderRadius="md"
//             bg="#2d3748"
//             color="#f8f9fb"
//           >
//             <Text fontWeight="bold" textAlign="left">
//               Дата заказа:{' '}
//               <Text as="span" fontWeight="normal">
//                 {order.date}
//               </Text>
//             </Text>
//             <Text fontWeight="bold" textAlign="left">
//               Статус:{' '}
//               <Text as="span" fontWeight="normal">
//                 {order.status}
//               </Text>
//             </Text>
//             <Text fontWeight="bold" textAlign="left">
//               Ориентировочное время доставки:{' '}
//               <Text as="span" fontWeight="normal">
//                 {order.estimatedDate}
//               </Text>
//             </Text>
//             <Text fontWeight="bold" textAlign="left">
//               Общая стоимость:{' '}
//               <Text as="span" fontWeight="normal">
//                 {order.totalBasketPrice} руб.
//               </Text>
//             </Text>
//             <Text fontWeight="bold" textAlign="left">
//               Адрес доставки:{' '}
//               <Text as="span" fontWeight="normal">
//                 {order.deliveryAddress}
//               </Text>
//             </Text>
//             <Text fontWeight="bold" textAlign="left">
//               Комментарий:{' '}
//               <Text as="span" fontWeight="normal">
//                 {order.comment}
//               </Text>
//             </Text>
//             <Button mt={2} onClick={() => handleViewDetails(order)}>
//               Посмотреть детали
//             </Button>
//           </Box>
//         ))}
//       </VStack>

//       {selectedOrder && (
//         <OrderDetailsModal
//           isOpen={isDetailsOpen}
//           onClose={onDetailsClose}
//           order={selectedOrder}
//         />
//       )}
//     </Box>
//   );
// }

// export default ProfilePage;
