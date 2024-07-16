// & 🟢 OrderHistory: отвечает за отображение списка всех заказов

import React, { useEffect } from 'react';
import { VStack, Text, Button, Box } from '@chakra-ui/react';
import OrderCard from './OrderCard';
import dayjs from 'dayjs'; 
import 'dayjs/locale/ru'
// dayjs.extend(localizedFormat); //  для отрисовки красиво даты
dayjs.locale('ru'); //  для отрисовки красиво даты


const OrderHistory = ({ orders, onDetailsOpen}) => {
 // Используйте useEffect для отслеживания изменений в orders
 useEffect(() => {
  console.log('🟠🟠🟠🟠🟠orders from OrderHistory', orders);
}, [orders]); // Передайте orders в зависимости, чтобы useEffect сработал при их изменении




 
return (
    <>
      <Text fontSize="2xl" mt={8} mb={4} fontWeight="bold" color="#2F855A">
        История заказов 
      </Text>

      <VStack spacing={4} align="stretch">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onDetailsOpen={onDetailsOpen}
            />
            
          ))
        ) : (
          <Text color="gray.500">Нет заказов для отображения</Text>
        )}
      </VStack>

    </>
  );
};

export default OrderHistory;
