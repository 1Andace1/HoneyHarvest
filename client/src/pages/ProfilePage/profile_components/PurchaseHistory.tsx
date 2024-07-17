import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Box, Heading, Text, VStack, StackDivider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');


interface Basket {
  createdAt: string;
  transactions: Transaction[];
}

interface Transaction {
  currentPrice: number;
}

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

const PurchaseHistory = ({ userId }) => {
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [ordersCount, setOrdersCount] = useState<number>(0); 
  const [localProductsPurchased, setLocalProductsPurchased] = useState<number>(0); 


  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/profile/purchase-history/${user.id}`
        );
        const { ordersCount, totalSpent, localProductsPurchased } =
        response.data;
        setTotalSpent(totalSpent);
        setOrdersCount(ordersCount);
        setLocalProductsPurchased(localProductsPurchased);
      } catch (error) {
        console.error('Ошибка при загрузке истории покупок:', error);
      }
    };

    fetchPurchaseHistory();
  }, [userId]);

  return (
    <Box>
      <Heading as="h3" size="lg" mb={4}>
        История покупок
      </Heading>
      <Text>Общая сумма потраченных средств: {totalSpent} руб.</Text>
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
        mt={4}
      >
        {baskets.map((basket, index) => (
          <Box
            key={index}
            bg="RGBA(0, 0, 0, 0.36)"
            p={4}
            borderRadius="md"
            color="#f8f9fb"
          >
            <Text>
              Дата заказа: {dayjs(basket.createdAt).format('D MMMM YYYY')}
            </Text>
            <Text>
              Сумма:{' '}
              {basket.transactions.reduce(
                (sum, transaction) => sum + transaction.currentPrice,
                0
              )}{' '}
              руб.
            </Text>
                     </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default PurchaseHistory;
