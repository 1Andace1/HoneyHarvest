// & 🟢 OrderCard: отображает краткую информацию о заказе и используется внутри OrderHistory.

import React, { useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
// dayjs.extend(localizedFormat); //  для отрисовки красиво даты
dayjs.locale('ru'); //  для отрисовки красиво даты
import MyCalendar from '../../../components/CalendarCard/CalendarCard';



const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

const formatDateTime = (datetime) => {
  return dayjs(datetime).format('D MMMM (dddd) в HH:mm');
};

const OrderCard = ({ key, order, onDetailsOpen }) => {
  useEffect(() => {
    console.log('🟠🟠orders fromOrderCard', order);
  }, [order]);

  const fetchOrderDetails = async (orderId) => {
    console.log('🟢 orderId', orderId);
    // setSelectedOrder(ordersState);
    const result = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/profile/order-details/${orderId}`
    );
    console.log('🟢 resultfrom fetchOrderDetails', result);
    setOrderDetails(result.data);
    setSelectedOrder(result.data);
  };

  return (
    <Box>  <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      w="50%"
      _hover={{ boxShadow: 'md', cursor: 'pointer' }}
      onClick={() => onDetailsOpen(order.id)}
    >
      <Text fontWeight="bold" textAlign="left" fontSize="xl">
        <Text fontWeight="bold">
          Дата заказа: <br />
          <Text as="span" fontWeight="normal">
            {formatDateTime(order.date)}
          </Text>
        </Text>
      </Text>

      <Text fontWeight="bold" fontSize="lg" >
      <Text fontWeight="bold" >
        Статус заказа: (ОТПРАВЛЕН/ДОСТАВЛЕН):{' '}
        <Text as="span" fontWeight="normal">
          {order.status}
        </Text>
      </Text>
      <Text fontWeight="bold" >
        Ориентировочное время доставки:{' '}
        <Text as="span" fontWeight="normal">
          {formatDateTime(order.estimatedDate)}
        </Text>
      </Text>
      <Text fontWeight="bold">
        Общая стоимость:{' '}
        <Text as="span" fontWeight="normal">
          {order.totalBasketPrice} руб.
        </Text>
      </Text>
      <Text fontWeight="bold" >
        Адрес доставки:{' '}
        <Text as="span" fontWeight="normal">
          {order.deliveryAddress}
        </Text>
      </Text>
      <Text fontWeight="bold" >
        Ваш комментарий:{' '}
        <Text as="span" fontWeight="normal">
          {order.commentUser}
        </Text>
      </Text>

      {/* <Button onClick={() => onDetailsOpen(order.id)}> Подробнее </Button> */}
      </Text>


      

      <Button
        colorScheme="blue"
        // onClick={() => fetchOrderDetails(order)}
        onClick={() => onDetailsOpen(order.id)}
        bg="#ECC94B"
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.800' }}
        _focus={{ boxShadow: 'none' }}
      >
        Посмотреть детали
      </Button>
    </Box>

    </Box>
  
  );
};

export default OrderCard;
