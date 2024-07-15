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
    bg="RGBA(0, 0, 0, 0.16)"
    color="RGBA(0, 0, 0, 0.92)"
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
      divider={<StackDivider borderColor="#FEFCBF" />}
      align="flex-start"
    >
      <Text>Дата заказа: {selectedOrder.date}</Text>
      <Text>Статус заказа: {selectedOrder.status}</Text>
      <Text>Ориентировочное время доставки: {selectedOrder.estimatedDate}</Text>
      <Text>Общая стоимость: {selectedOrder.totalOrderPrice
      } руб.</Text>
      <Text>Адрес доставки: {selectedOrder.deliveryAddress}</Text>
      <Text>Комментарий: {selectedOrder.comment}</Text>
    </VStack>
  <VStack spacing={4} mt={4} align="flex-start">
    </VStack>
  </Box>
);

export default OrderDetails;
