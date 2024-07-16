// & 🟢 OrdersPage: управляет состоянием и взаимодействием
// & между OrderDetails и OrderHistory.

import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Flex,
  Image,
  Spacer,
} from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import OrderDetails from './OrderDetails';
import OrderHistory from './OrderHistory';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

interface Order {
  UserId: number;
  commentUser: string;
  deliveryAddress: string;
  estimatedDate: string;
  createdAt: string;
  status?: string;
  picture: string;
  totalOrderPrice: number;
  products: Array<{
    productId: number;
    numberBasket: number;
    totalBasketPrice: number;
    category: number;
    title: string;
    description: string;
    location: string;
    price: number;
    sort: number;
    yearOfHarvest: number;
    starsRating: number;
    picture: string;
  }>;
}

interface Product {
  id: number;
  title: string;
  picture: string;
  category: number;
  sort: number;
  yearOfHarvest: number;
  price: number;
  location: string;
  starsRating: number;
  description: string;
}

interface User {
  id: number;
  userId: number;
}

interface OrdersPageComponentProps {
  user: User;
  orders: Order[];
  userId: number;
}

interface BasketItem {
  UserId: number;
  commentUser: string;
  createdAt: string;
  date: string;
  deliveryAddress: string;
  estimatedDate: string;
  id: number;
  numberBasket: number;
  orderId: number | null;
  productId: number;
  status: string;
  totalBasketPrice: number;
  updatedAt: string;
  product: Product; // Добавляем связь с продуктом
}

interface MonthlyStats {
  name: string;
  orders: number;
  totalBasketPrice: number;
}

const formatDateTime = (datetime) => {
  return dayjs(datetime).format('D MMMM (dddd) в HH:mm');
};

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

// ^ new Расчет кол-ва звезд
const ProductRating: React.FC<{ product: any }> = ({ product }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < product.starsRating; i++) {
      stars.push(
        <Image
          key={i}
          src="/icons/star_rating.png"
          alt={`Star ${i + 1}`}
          boxSize="20px"
          objectFit="cover"
          marginRight="2px" // Расстояние между звездами, можете настроить по желанию
        />
      );
    }
    return stars;
  };

  return (
    <Box display="flex" alignItems="center">
      {renderStars()}
    </Box>
  );
};

const OrdersPageComponent: React.FC<OrdersPageComponentProps> = ({
  user,
  orders,
  userId,
}) => {
  const [ordersState, setOrdersState] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [ordersFromBasket, setOrdersFromBasket] = useState<BasketItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    console.log('☣️ orders from OrdersPage', orders);
  }, [orders]);

  // ^ NEW ДОБАВЛЯЮ БАСКЕТ
  useEffect(() => {
    // Пример получения данных из корзины
    console.log(
      '☣️☣️`${VITE_API}/basket/get` ',
      `${VITE_BASE_URL}${VITE_API}/basket/get`
    );
    const fetchBasketData = async () => {
      const response = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/basket/get`,
        {
          params: { userId: user.id },
        }
      );
      setOrdersFromBasket(response.data.entry);
    };

    fetchBasketData();
    console.log(
      '☣️☣️☣️fetchBasketData ===ordersFromBasket: ',
      ordersFromBasket
    );
  }, []);

  // ^ NEW ЗАКАЗ ИЗ БАСКЕТОВ
  useEffect(() => {
    if (ordersFromBasket.length > 0) {
      // Преобразуем данные корзины в один заказ
      const firstItem = ordersFromBasket[0];
      console.log('☣️☣️☣️firstItem: ', ordersFromBasket[0]);
      console.log('☣️☣️☣️☣️firstItem.product: ', ordersFromBasket[0].product);
      const orderData: Order = {
        UserId: firstItem.UserId,
        // {formatDateTime(firstItem.createdAt)}
        commentUser: firstItem.commentUser,
        createdAt: formatDateTime(firstItem.createdAt),
        status: firstItem.status,
        deliveryAddress: firstItem.deliveryAddress,
        estimatedDate: formatDateTime(firstItem.estimatedDate),
        picture: firstItem.product.picture,
        totalOrderPrice: firstItem.totalBasketPrice,
        products: ordersFromBasket.map((item) => ({
          productId: item.productId,
          numberBasket: item.numberBasket,
          totalBasketPrice: item.totalBasketPrice,
          category: item.product.category,
          title: item.product.title,
          description: item.product.description,
          location: item.product.location,
          price: item.product.price,
          sort: item.product.sort,
          yearOfHarvest: item.product.yearOfHarvest,
          starsRating: item.product.starsRating,
          picture: item.product.picture,
        })),
      };
      console.log(
        '☣️☣️☣️orderData.deliveryAddress ',
        orderData.deliveryAddress
      );
      console.log('☣️☣️☣️☣️orderData ', orderData);
      setOrder(orderData);
    }
  }, [ordersFromBasket]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setOrdersState(orders);
      // const statsData = calculateStats(orders);
      // setStats(statsData);
    }
  }, [orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axiosInstance.get<Order[]>(
          `${VITE_BASE_URL}${VITE_API}/profile/orders/${user.id}`
        );
        // console.log(' 💎💎💎💎💎 result.data from fetchOrders', result.data);
        setOrdersState(result.data);
      } catch (error) {
        console.error('Ошибка при получении заказов:', error);
      }
    };
    fetchOrders();
  }, [user.id]);

  // console.log(' 💎 ordersStates', ordersState);

  const fetchOrderDetails = async (orderId: number) => {
    console.log('🟢 orderId', orderId);
    const result = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/profile/order-details/${orderId}`
    );
    // console.log('💎💎💎 resultfrom fetchOrderDetails', result.data);
    setOrderDetails(result.data);
    setSelectedOrder(result.data);
  };

  const calculateStats = (orders: Order[], user: User): MonthlyStats[] => {
    const userOrders = orders.filter((order) => {
      return order.UserId === user.id;
    });
    console.log('💎 userOrders=', userOrders);

    const monthlyStats: MonthlyStats[] = [];
    let totalBasketPrice = 0;
    // проходимся по отфильтрованным заказам и собираем статистику
    userOrders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth(); // Получаем номер месяца (0 - январь, 11 - декабрь)
      const monthName = getMonthName(month); // Получаем полное название месяца
      // ищем уже существующую запись в monthlyStats для текущего месяца
      const existingMonth = monthlyStats.find(
        (stat) => stat.name === monthName
      );

      if (existingMonth) {
        existingMonth.orders++;
        existingMonth.totalBasketPrice += order.products
          ? order.products.reduce(
              (sum, product) => sum + product.totalBasketPrice,
              0
            )
          : 0;
      } else {
        monthlyStats.push({
          name: monthName,
          orders: 1, // Начинаем с 1 заказа
          totalBasketPrice: order.products
            ? order.products.reduce(
                (sum, product) => sum + product.totalBasketPrice,
                0
              )
            : 0,
        });
      }
    });

    return monthlyStats;
  };

  // вычисляем статистику по месяцам для текущего пользователя
  useEffect(() => {
    if (ordersState.length > 0 && user) {
      const stats = calculateStats(ordersState, user);
      setMonthlyStats(stats);
    }
  }, [ordersState, user]);

  // получение названия месяца по его номеру
  const getMonthName = (month: number): string => {
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    return months[month];
  };

  return (
    <Box p={6}>
      <Text  fontSize="2.8rem" fontWeight="bold" mb={6}>
        Мои заказы
      </Text>
      {/* "ЭТО ПРЕДЫДУЩАЯ ТАБЛИЦА ЗАКАЗОВ (где не докручена логика получения, но с кликом была) */}
      {/* <OrderHistory
        orders={ordersState}
        onDetailsOpen={fetchOrderDetails}
        userId={user.id}
      /> */}

<Flex w="100%" flexWrap="wrap" gap={6} bg="#C6F6D5">
        {/* ФЛЕКС 2 СТАРТА */}
        <Flex
          w="100%"
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
          >
            {/* Содержимое первой карточки */}
            <Box>
        {selectedOrder && (
          <Box mt={6}>
            <Box>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <OrderDetails
                  selectedOrder={selectedOrder}
                  orderDetails={orderDetails}
                />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    Карточки товаров:
                  </Text>
                  {selectedOrder.products.map((product, index) => (
                    <Box
                      key={index}
                      borderWidth="1px"
                      borderRadius="lg"
                      p={4}
                      mb={4}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                    >
                      <Image
                        src={`./productsPhoto/product.picture`}
                        alt={product.title}
                        boxSize="3cm"
                        objectFit="cover"
                        marginRight="10px"
                      />
                      <Image
                        src={product.picture}
                        alt={product.title}
                        boxSize="3cm"
                        objectFit="cover"
                        marginRight="10px"
                      />
                      <Box>
                        <Text fontSize="md" mb={2} fontWeight="bold">
                          Цена: {product.price} руб.
                        </Text>
                        <Flex fontSize="md" mb={2} alignItems="center">
                          <Image
                            src="/icons/star_rating.png"
                            alt={product.title}
                            boxSize="1cm"
                            objectFit="cover"
                            marginRight="10px"
                          />
                          <Text>Рейтинг: {product.starsRating}</Text>
                        </Flex>
                      </Box>
                      <Box flex="1">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          {product.title}
                        </Text>
                        <Text fontSize="md" mb={2}>
                          {product.description}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
            
          </Box>
          <Box
            key={2}
            p={4}
            borderWidth={1}
            borderRadius="md"
            w="30%" // Пример ширины одной карточки (можете настроить по вашему желанию)
            bg="#C6F6D5"
            h="100%" // ! Устанавливает высоту на 100% от родительского элемента
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* Содержимое второй карточки */}
           
          </Box>
          <Box
            key={2}
            p={4}
            borderWidth={1}
            borderRadius="md"
            w="200%" // Пример ширины одной карточки (можете настроить по вашему желанию)
            bg="#C6F6D5"
          >
            {/* Содержимое третьей карточки */}

          </Box>
        </Flex>
        </Flex>


      <Box>
        {selectedOrder && (
          <Box mt={6}>
            <Box>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <OrderDetails
                  selectedOrder={selectedOrder}
                  orderDetails={orderDetails}
                />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    Карточки товаров:
                  </Text>
                  {selectedOrder.products.map((product, index) => (
                    <Box
                      key={index}
                      borderWidth="1px"
                      borderRadius="lg"
                      p={4}
                      mb={4}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                    >
                      <Image
                        src={`./productsPhoto/product.picture`}
                        alt={product.title}
                        boxSize="3cm"
                        objectFit="cover"
                        marginRight="10px"
                      />
                      <Image
                        src={product.picture}
                        alt={product.title}
                        boxSize="3cm"
                        objectFit="cover"
                        marginRight="10px"
                      />
                      <Box>
                        <Text fontSize="md" mb={2} fontWeight="bold">
                          Цена: {product.price} руб.
                        </Text>
                        <Flex fontSize="md" mb={2} alignItems="center">
                          <Image
                            src="/icons/star_rating.png"
                            alt={product.title}
                            boxSize="1cm"
                            objectFit="cover"
                            marginRight="10px"
                          />
                          <Text>Рейтинг: {product.starsRating}</Text>
                        </Flex>
                      </Box>
                      <Box flex="1">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          {product.title}
                        </Text>
                        <Text fontSize="md" mb={2}>
                          {product.description}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
      {/* <Divider mt={6} /> */}

      {/* статист. по месяцам */}
      <Box mt="4"  bg="#9AE6B4">
        <Heading mb="4" fontSize="2.2rem" >
          Статистика по месяцам
        </Heading>
        <Table variant="striped"  sx={{
    'th, td': { // Стилизация строк
      borderColor: '#68D391',
    },
    'tr:nth-of-type(odd)': { // Полосатая стилизация для нечетных строк
      backgroundColor: '#C6F6D5',
    }
  }}>
          <Thead>
            <Tr>
              <Th>Месяц</Th>
              <Th>Заказов</Th>
              <Th>Потрачено</Th>
            </Tr>
          </Thead>
          <Tbody>
            {monthlyStats.map((stat) => (
              <Tr key={stat.name}>
                <Td>{stat.name}</Td>
                <Td>{stat.orders}</Td>
                <Td>{stat.totalBasketPrice} руб.</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Spacer/>
      <br />
      <Divider/>
      <div>
      <br />
        <Heading fontSize="2.2rem" h='70px'bg="#9AE6B4">Информация о заказе:</Heading>
        <br />
        {order ? (
          <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
            {/* Общая информация о заказе в виде таблицы */}
            <Table variant="simple" mb={4}>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" fontSize="1.4rem">
                    Статус
                  </Td>
                  <Td fontSize="1.4rem">{order.status}</Td>
                </Tr>{' '}
                <Tr>
                  <Td fontWeight="bold" fontSize="1.4rem">
                    Адрес доставки:
                  </Td>
                  <Td fontSize="1.4rem">{order.deliveryAddress}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" fontSize="1.4rem">
                    Ожидаемая дата:
                  </Td>
                  <Td fontSize="1.4rem">{order.estimatedDate}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" fontSize="1.4rem">
                    Комментарий:
                  </Td>
                  <Td fontSize="1.4rem">{order.commentUser}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" fontSize="1.4rem">
                    Создано:
                  </Td>
                  <Td fontSize="1.4rem">{order.createdAt}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" fontSize="1.4rem">
                    Итого:
                  </Td>
                  <Td fontSize="1.4rem">{order.totalOrderPrice} руб. </Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Блок с заголовком "Продукты" */}
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Продукты:
            </Text>

            {/* Карточки продуктов */}
            {order.products.map((product, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                mb={4}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Image
                  src={product.picture}
                  alt={product.title}
                  boxSize="150px"
                  objectFit="cover"
                  marginRight="20px"
                />
                <Box textAlign="center">
                  <Text fontSize="1.3rem" fontWeight="bold" mb={2}>
                    {product.title}
                  </Text>
                  <Flex alignItems="center" mb={2}>
                    <Text fontSize="md" color="gray.500">
                      Рейтинг:
                    </Text>
                    <Box display="flex" alignItems="center">
                      {ProductRating({ product })}
                    </Box>
                  </Flex>
                </Box>
                <Box flex="1">
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Box>

                      <Text fontSize="1.1rem" color="gray.500">
                        {product.description}
                      </Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="lg" fontWeight="bold">
                        {/* Цена0: {product.totalBasketPrice} руб. */}
                        Стоимость: <br />{product.price * product.numberBasket} руб.
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        Кол-во: {product.numberBasket} шт.
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        Цена за 1 шт: {product.price} руб.
                      </Text>
                    </Box>
                  </Flex>
                  <Flex alignItems="center">
                    <Text fontSize="md" color="gray.500">
                      Категория: <br />{product.category}
                    </Text>
                    <Spacer />

                    <Text fontSize="md" color="gray.500">
                      Сорт:<br /> {product.sort}
                    </Text>
                    <Spacer />
                    <Text fontSize="md" color="gray.500">
                      Год урожая:<br /> {product.yearOfHarvest}
                    </Text>
                    <Spacer />
                    <Text fontSize="md" color="gray.500">
                      Местоположение: <br />{product.location}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Box>
  );
};

export default OrdersPageComponent;
