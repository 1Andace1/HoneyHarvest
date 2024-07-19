// & 🟢 OrdersPage: управляет состоянием и взаимодействием
// & между OrderDetails и OrderHistory.

import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  Flex,
  Image,
  Spacer,
} from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';

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
  numberBasket: number;
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
}

interface OrdersPageComponentProps {
  user: User;
  orders: Order[];
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



const formatDateTime = (datetime: string): string => {
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
}) => {
console.log( 'orders', orders)
  // const [ordersState, setOrdersState] = useState<Order[]>([]);// !---
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // const [orderDetails, setOrderDetails] = useState([]);
  // const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [ordersFromBasket, setOrdersFromBasket] = useState<BasketItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  // useEffect(() => {
  //   console.log('☣️ orders from OrdersPage', orders);
  // }, [orders]);


  useEffect(() => {
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
  }, []);


  useEffect(() => {
    if (ordersFromBasket.length > 0) {
      // Преобразуем данные корзины в один заказ
      const firstItem = ordersFromBasket[0];
      console.log('☣️☣️☣️firstItem: ', ordersFromBasket[0]);
      console.log('☣️☣️☣️☣️firstItem.product: ', ordersFromBasket[0].product);
      const orderData: Order = {
        UserId: firstItem.UserId,
        commentUser: firstItem.commentUser,
        createdAt: formatDateTime(firstItem.createdAt),
        status: firstItem.status,
        deliveryAddress: firstItem.deliveryAddress,
        estimatedDate: formatDateTime(firstItem.estimatedDate),
        picture: firstItem.product.picture,
        totalOrderPrice: firstItem.totalBasketPrice,
        numberBasket: firstItem.numberBasket,
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

      setOrder(orderData);
    }
  }, [ordersFromBasket]);


  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const result = await axiosInstance.get<Order[]>(
  //         `${VITE_BASE_URL}${VITE_API}/profile/orders/${user.id}`
  //       );
  //       // console.log(' 💎💎💎💎💎 result.data from fetchOrders', result.data);
  //       setOrdersState(result.data);
  //     } catch (error) {
  //       console.error('Ошибка при получении заказов:', error);
  //     }
  //   };
  //   fetchOrders();
  // }, [user.id]);

  // console.log(' 💎 ordersStates', ordersState);

  // const fetchOrderDetails = async (orderId: number) => {
  //   console.log('🟢 orderId', orderId);
  //   const result = await axiosInstance.get(
  //     `${VITE_BASE_URL}${VITE_API}/profile/order-details/${orderId}`
  //   );
  //   // console.log('💎💎💎 resultfrom fetchOrderDetails', result.data);
  //   setOrderDetails(result.data);
  //   setSelectedOrder(result.data);
  // };

  // const calculateStats = (orders: Order[], user: User): MonthlyStats[] => {
  //   const userOrders = orders.filter((order) => {
  //     return order.UserId === user.id;
  //   });
  //   console.log('💎 userOrders=', userOrders);

  //   const monthlyStats: MonthlyStats[] = [];
  //   let totalBasketPrice = 0;
  //   // проходимся по отфильтрованным заказам и собираем статистику
  //   userOrders.forEach((order) => {
  //     const month = new Date(order.createdAt).getMonth(); // Получаем номер месяца (0 - январь, 11 - декабрь)
  //     const monthName = getMonthName(month); // Получаем полное название месяца
  //     // ищем уже существующую запись в monthlyStats для текущего месяца
  //     const existingMonth = monthlyStats.find(
  //       (stat) => stat.name === monthName
  //     );

  //     if (existingMonth) {
  //       existingMonth.orders++;
  //       existingMonth.totalBasketPrice += order.products
  //         ? order.products.reduce(
  //             (sum, product) => sum + product.totalBasketPrice,
  //             0
  //           )
  //         : 0;
  //     } else {
  //       monthlyStats.push({
  //         name: monthName,
  //         orders: 1, // Начинаем с 1 заказа
  //         totalBasketPrice: order.products
  //           ? order.products.reduce(
  //               (sum, product) => sum + product.totalBasketPrice,
  //               0
  //             )
  //           : 0,
  //       });
  //     }
  //   });

  //   return monthlyStats;
  // };

  // вычисляем статистику по месяцам для текущего пользователя
  // useEffect(() => {
  //   if (ordersState.length > 0 && user) {
  //     const stats = calculateStats(ordersState, user);
  //     setMonthlyStats(stats);
  //   }
  // }, [ordersState, user]);

  // получение названия месяца по его номеру
  // const getMonthName = (month: number): string => {
  //   const months = [
  //     'Январь',
  //     'Февраль',
  //     'Март',
  //     'Апрель',
  //     'Май',
  //     'Июнь',
  //     'Июль',
  //     'Август',
  //     'Сентябрь',
  //     'Октябрь',
  //     'Ноябрь',
  //     'Декабрь',
  //   ];
  //   return months[month];
  // };

  return (
    <Box p={6}>
      <Text fontSize="2.5rem" fontWeight="bold">
        Мои заказы
      </Text>
      <div>
        {order ? (
          
          <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                    <Heading fontSize="2rem" h="70px" bg="#9AE6B4">
          Заказ № {order.numberBasket}
              </Heading>
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
                  src={`http://localhost:3000/productsPhoto/${product.picture}`}
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
                        Стоимость: <br />
                        {(product.price * product.numberBasket) / 10} руб.
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        Кол-во: {product.numberBasket * 100}г.
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        Цена за 1 кг: {product.price} руб.
                      </Text>
                    </Box>
                  </Flex>
                  <Flex alignItems="center">
                    <Text fontSize="md" color="gray.500">
                      Категория: <br />
                      {product.category}
                    </Text>
                    <Spacer />

                    <Text fontSize="md" color="gray.500">
                      Сорт:
                      <br /> {product.sort}
                    </Text>
                    <Spacer />
                    <Text fontSize="md" color="gray.500">
                      Год урожая:
                      <br /> {product.yearOfHarvest}
                    </Text>
                    <Spacer />
                    <Text fontSize="md" color="gray.500">
                      Местоположение: <br />
                      {product.location}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <p>Данных о заказах не было.</p>
        )}
      </div>
    </Box>
  );
};

export default OrdersPageComponent;
