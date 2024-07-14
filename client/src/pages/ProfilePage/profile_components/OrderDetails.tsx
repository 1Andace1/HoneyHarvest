// & 🟢 OrderDetails: отвечает за отображение деталей выбранного заказаimport React from 'react';

import {
  Box,
  VStack,
  Text,
  HStack,
  Image,
  StackDivider,
} from '@chakra-ui/react';


const OrderDetails = ({ selectedOrder, orderDetails }) => (
  // if (!selectedOrder) return null;

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
     Детали заказа
    </Text>
    <VStack
      spacing={4}
      divider={<StackDivider borderColor="gray.200" />}
      align="flex-start"
    >
      <Text>Дата заказа: {order.date}</Text>
      <Text>Статус заказа: {order.status}</Text>
      <Text>Ориентировочное время доставки: {order.estimatedDate}</Text>
      <Text>Общая стоимость: {order.totalBasketPrice} руб.</Text>
      <Text>Адрес доставки: {order.deliveryAddress}</Text>
      <Text>Комментарий: {order.comment}</Text>
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
);

export default OrderDetails;
