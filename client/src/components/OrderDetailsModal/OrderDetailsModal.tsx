import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react';

function OrderDetailsModal({ isOpen, onClose, order }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Детали заказа</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            <Text>Адрес доставки: {order.deliveryAddress}</Text>
            <Text>Статус: {order.status}</Text>
            <Text>Общая стоимость: {order.totalBasketPrice} руб.</Text>

            {/* ДОБАВИТЬ ВЕСЬ СПИСОК ЗАКАЗАННЫХ ТОВАРОВ */}
            {order.items && order.items.map((item, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" p={4} w="100%">
                <HStack spacing={4}>
                  <Image src={item.imageUrl} alt={item.name} boxSize="50px" />
                  <VStack align="start">
                    <Text>Название: {item.name}</Text>
                    <Text>Цена: {item.price}</Text>
                    <Text>Количество: {item.quantity}</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
       
            <Text>Дата создания: {order.createdAt}</Text>
            <Text>Адрес доставки: {order.comment}</Text>
            <Text>Последнее обновление: {order.updatedAt}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default OrderDetailsModal;