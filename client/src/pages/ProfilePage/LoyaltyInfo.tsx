import { Box, Text, Button } from '@chakra-ui/react';

  // ^ new  функция для получения уровня лояльности и вознаграждения пользователя
  const getUserLoyaltyInfo = () => {
    const userLevel = loyaltyProgram.getUserLevel(userTotalSpent); // Получаем уровень пользователя
    const reward = loyaltyProgram.getReward(userTotalSpent); // Получаем вознаграждение пользователя
    return { userLevel, reward };
  };

const LoyaltyInfo = ({ loyalty, onOpen }) => (
  <Box
    w="full"
    p={6}
    borderWidth="1px"
    borderRadius="md"
    bg="RGBA(0, 0, 0, 0.36)"
    color="#f8f9fb"
  >
    <Text fontSize="lg" fontWeight="bold" mb={2}>
      Информация о программе лояльности
    </Text>
    <Text mb={2}>Ваша скидка: {loyalty.discount} %</Text>
    <Text mb={2}>Количество заказов: {loyalty.totalOrders}</Text>
    <Text mb={2}>Количество рефералов: {loyalty.referrals}</Text>
    <Button
      colorScheme="blue"
      onClick={onOpen}
      bg="#2F855A"
      _hover={{ bg: 'teal.700' }}
      _active={{ bg: 'teal.800' }}
      _focus={{ boxShadow: 'none' }}
    >
      Подробнее
    </Button>
      <Box
        bg="RGBA(0, 0, 0, 0.36)"
        color="#f8f9fb"
        p={6}
        borderRadius="md"
        w="full"
        maxW="md"
        boxShadow="md"
        textAlign="left"
        mb={8}
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Программа лояльности
        </Text>
        <Text>
          Уровень: <span>{getUserLoyaltyInfo().userLevel}</span>
        </Text>
        <Text>
          Вознаграждение: <span>{getUserLoyaltyInfo().reward}</span>
        </Text>
      </Box>
      <HStack spacing={6} w="full" align="flex-start" mb={8}>
        {/* 🟪 БЛОК ОТОБРАЖЕНИЯ ПОСЛЕДНЕГО ЗАКАЗА И ЕГО СТАТУСА */}
        {/* {orders.length > 0 && (
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
              Последний заказ
            </Text>
            <VStack
              spacing={4}
              divider={<StackDivider borderColor="gray.200" />}
              align="flex-start"
            >
              <Text>
                Дата заказа: <span>{formatDateTime(orders[0].date)}</span>
              </Text>
              <Text>
                Статус заказа: <span>{orders[0].status}</span>
              </Text>
              <Text>
                Ориентировочное время доставки:{' '}
                <span>{formatDateTime(orders[0].estimatedDate)}</span>
              </Text>
              <Text>
                Общая стоимость: <span>{orders[0].totalBasketPrice} руб.</span>
              </Text>
              <Text>
                Адрес доставки: <span>{orders[0].deliveryAddress}</span>
              </Text>
              <Text>
                Комментарий: <span>{orders[0].comment}</span>
              </Text>
            </VStack>
          </Box>
          
        )} */}
  </HStack>
  </Box>
);

export default LoyaltyInfo;