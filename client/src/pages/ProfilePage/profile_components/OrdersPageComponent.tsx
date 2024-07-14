// & 🟢 OrdersPage: управляет состоянием и взаимодействием
// & между OrderDetails и OrderHistory.

import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import OrderDetails from './OrderDetails';
import OrderHistory from './OrderHistory';
import ConsumptionStats from './ConsumptionStats';

  // определение типов данных для заказов
  interface Order {
    id: number;
    date: string;
    status: string;
    estimatedDate: string;
    totalBasketPrice: number;
    deliveryAddress: string;
    comment: string;
  }
  
  
  interface User {
    id: number;
  }
  
  interface OrdersPageComponentProps {
    user: User;
    orders: Order[];
  }
 

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

const OrdersPageComponent : React.FC<OrdersPageComponentProps> = ({ user, orders }) =>  {
  const [ordersState, setOrdersState] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState([]);
  // const [stats, setStats] = useState<Stat[]>([]);
  const [stats, setStats] = useState<any[]>([]);


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
        const statsData = calculateStats(orders);
      setStats(statsData);
    }
  }, [orders]);


  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axiosInstance.get<Order[]>(
        `${import.meta.env.VITE_API}/profile/orders/${user.id}`
      );
      console.log('⚠️⚠️⚠️result.data from fetchOrders', result.data);
       setOrdersState(result.data);
    };

    fetchOrders();
  }, [user.id]);

  console.log('⚠️⚠️⚠️ordersStates',ordersState);

  const fetchOrderDetails = async (orderId: number) => {
    console.log('🟢 orderId', orderId);
    // setSelectedOrder(ordersState);
    const result = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/profile/order-details/${orderId}`
    );
    console.log('🟢 resultfrom fetchOrderDetails', result);
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

  const calculateStats = (orders: Order[]): any[] => {
    // Здесь нужно фильтровать заказы только для текущего пользователя
    const userOrders = orders.filter(order => order.userId === user.id);

    // ! УБРАТЬ ПОТОМ МОКОВЫЕ ДАННЫЕ
    // Пример данных для демонстрации статистики
    const exampleStats = [
      { name: 'Янв', orders: 5, totalSpent: 3000 },
      { name: 'Фев', orders: 4, totalSpent: 2500 },
      { name: 'Мар', orders: 6, totalSpent: 3200 },
      // Добавьте другие месяцы и данные по мере необходимости
    ];
    return exampleStats;
  };


  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Мои заказы
      </Text>
      <OrderHistory orders={orders} onDetailsOpen={fetchOrderDetails} />
      {selectedOrder && (
        <OrderDetails
          selectedOrder={selectedOrder}
          orderDetails={orderDetails}
        />
      )}
      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Статистика потребления (ПОКА ЧТО ЭТО ДЛЯ АДМИНА! все заказы)
        </Text>
        <ConsumptionStats stats={stats} />
      </Box>
    </Box>
  );
};

export default OrdersPageComponent;
