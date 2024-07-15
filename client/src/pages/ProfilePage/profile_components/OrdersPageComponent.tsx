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
  Image
} from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import OrderDetails from './OrderDetails';
import OrderHistory from './OrderHistory';
import ConsumptionStats from './ConsumptionStats';

// определение типов данных для заказов
interface Order {
  id: number;
  UserId: number;
  date: string;
  status: string;
  estimatedDate: string;
  totalBasketPrice: number;
  totalOrderPrice: string;
  comment: string;
  transactions: Transaction[]; // ^ new добавление связанных транзакций
}

interface Product {
  id: number;
  title: string;
  picture: string;
  category: number;
  sort: number;
  yearOfHarvest: number;
  price: number;
  locationice: string;
  starsRating: number;
  description: number;
}

interface Transaction {
  id: number;
  productId: number;
  product: Product; // ^ new добавление связанного товара
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

interface MonthlyStats {
  name: string; // месяц
  orders: number; // к-во заказов
  // totalSpent: number; // общая сумма потраченных денег
  totalBasketPrice: number; // общая сумма потраченных денег
}

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

const OrdersPageComponent: React.FC<OrdersPageComponentProps> = ({
  user,
  orders,
  userId
}) => {
  const [ordersState, setOrdersState] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState([]);
  // const [stats, setStats] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);

  useEffect(() => {
    console.log('🟠orders from OrdersPage', orders);
  }, [orders]);

  // ! ДЛЯ АДМИНА статситиска
  // useEffect(() => {
  //   if (orders && orders.length > 0) {
  //     setOrdersState(orders);
  //       const statsData = calculateStats(orders);
  //     setStats(statsData);
  //   }
  // }, [orders]);

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
          `${VITE_API}/profile/orders/${user.id}`
        );
        // console.log(' 💎 result.data from fetchOrders', result.data);
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

  // !  ДЛЯ АДМИНА:
  // const calculateStats = (orders: Order[]): any[] => {
  //   // Пример данных для демонстрации
  //   const exampleStats = [
  //     { name: 'Янв', orders: 5, totalSpent: 3000 },
  //     { name: 'Фев', orders: 4, totalSpent: 2500 },
  //     { name: 'Мар', orders: 6, totalSpent: 3200 },
  //     // добавьте другие месяцы и данные по мере необходимости
  //   ];
  //   return exampleStats;
  // };

  const calculateStats = (orders: Order[], user: User): MonthlyStats[] => {
    // фильтр заказов текущего пользователя
    console.log('💎 user=', user);
    console.log('💎 user.id=', user.id);
    console.log('💎 orders=', orders);

    const userOrders = orders.filter((order) => {
      console.log('order=================', order);
      console.log(
        'order.totalBasketPrice=================',
        order.totalBasketPrice
      );
      console.log(
        'order.totalBasketPrice=================typeof ',
        typeof order.totalBasketPrice
      );
      // console.log('user.id',user.id);
      return order.UserId === user.id;
    });

    console.log('💎 userOrders=', userOrders);
    // Инициализируем объект для хранения статистики по месяцам
    const monthlyStats: MonthlyStats[] = [];

    // Проверяем и корректируем значение totalSpent, если оно равно null
    // const totalSpent = user.totalSpent !== null ? user.totalSpent : 0;
    let totalBasketPrice = 0;
    let totalOrderPrice = 0;
    // Проходимся по отфильтрованным заказам и собираем статистику
    userOrders.forEach((order) => {
      const month = new Date(order.date).getMonth(); // Получаем номер месяца (0 - январь, 11 - декабрь)
      const monthName = getMonthName(month); // Получаем полное название месяца

      // Ищем уже существующую запись в monthlyStats для текущего месяца
      const existingMonth = monthlyStats.find(
        (stat) => stat.name === monthName
      );

      if (existingMonth) {
        // Если запись для месяца уже существует, обновляем данные
        existingMonth.orders++;
        // console.log('💎 typeof  order.totalOrderPrice=', typeof  order.totalOrderPrice);
        existingMonth.totalBasketPrice = order.totalBasketPrice; // Предположим, что totalPrice - это общая сумма заказа
        console.log('💎 existingMonth=', existingMonth);
      } else {
        // Если записи для месяца еще нет, создаем новую запись
        console.log(
          '💎 typeof  order.totalBasketPrice=',
          typeof order.totalBasketPrice
        );
        monthlyStats.push({
          name: monthName,
          orders: 1, // Начинаем с 1 заказа
          totalBasketPrice: (totalBasketPrice += order.totalBasketPrice), // И общей суммой текущего заказа
        });
      }
    });
    console.log('💎 monthlyStats2=', monthlyStats);
    // Обновляем totalSpent в каждой записи статистики
    monthlyStats.forEach((stat) => {
      stat.totalBasketPrice += totalBasketPrice; // Добавляем общую сумму потраченных средств пользователя
    });

    return monthlyStats;
  };
  // Вычисляем статистику по месяцам для текущего пользователя
  useEffect(() => {
    if (ordersState.length > 0 && user) {
      const stats = calculateStats(ordersState, user);
      setMonthlyStats(stats);
    }
  }, [ordersState, user]);

  // Функция для получения названия месяца по его номеру
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
      {/* <Flex direction="row" justifyContent="space-between" alignItems="flex-start"></Flex> */}
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Мои заказы
      </Text>
      <OrderHistory orders={ordersState} onDetailsOpen={fetchOrderDetails} userId={user.id} />
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
                <Text fontSize="xl" fontWeight="bold" >
                  Карточки товаров:
                </Text>
                  {selectedOrder.transactions.map((transaction) => (
                    <Box
                      key={transaction.id}
                      borderWidth="1px"
                      borderRadius="lg"
                      p={4}
                      mb={4}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                    >
                      
                      <Image
                        src={transaction.product.picture}
                        alt={transaction.product.title}
                        boxSize="3cm"
                        objectFit="cover"
                        marginRight="10px"
                      />
                      <Box>
                        <Text fontSize="md" mb={2} fontWeight="bold">
                          Цена: {transaction.product.price} руб.
                        </Text>
                        <Flex fontSize="md" mb={2} alignItems="center">
                          <Image
                            src="/icons/star_rating.png"
                            alt={transaction.product.title}
                            boxSize="1cm"
                            objectFit="cover"
                            marginRight="10px"
                          />
                          <Text>
                            Рейтинг: {transaction.product.starsRating}
                          </Text>
                        </Flex>
                      </Box>
                      <br />
                      <br />
                      <hr />
                      <Box flex="1">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          {transaction.product.title}
                        </Text>
                        <Text fontSize="md" mb={2}>
                          {transaction.product.description}
                        </Text>
                      </Box>
                      {/* <Box>
                        <Text fontSize="md" mb={2} fontWeight="bold">
                          Цена: {transaction.product.price} руб.
                        </Text>
                        <Flex fontSize="md" mb={2} alignItems="center">
                          <Image
                            src="/icons/star_rating.png"
                            alt={transaction.product.title}
                            boxSize="1cm"
                            objectFit="cover"
                            marginRight="10px"
                          />
                          <Text>
                            Рейтинг: {transaction.product.starsRating}
                          </Text>
                        </Flex>
                      </Box> */}
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>

      <Divider mt={6} />

      {/* Отображение статистики по месяцам */}
      <Box mt="4">
        <Heading mb="4" size="lg">
          Статистика по месяцам
        </Heading>
        <Table variant="striped" colorScheme="yellow">
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
    </Box>
  );
};

export default OrdersPageComponent;
