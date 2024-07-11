import { Box, Text, Button, VStack, HStack, Image, StackDivider } from '@chakra-ui/react';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const OrderCard = ({ order, onDetailsOpen }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);

  const handleViewDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/profile/order-details/${order.id}`
      );
      setOrderDetails(response.data);
      onDetailsOpen(order, response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
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
      <Box>
        <Text fontWeight="bold">
          Дата заказа:{' '}
          <Text as="span" fontWeight="normal">
            {dayjs(order.date).format('D MMMM (dddd) в HH:mm')}
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
            {dayjs(order.estimatedDate).format('D MMMM (dddd) в HH:mm')}
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
        onClick={handleViewDetails}
        bg="#2F855A"
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.800' }}
        _focus={{ boxShadow: 'none' }}
      >
        Посмотреть детали
      </Button>
    </Box>
  );
};

export default OrderCard;