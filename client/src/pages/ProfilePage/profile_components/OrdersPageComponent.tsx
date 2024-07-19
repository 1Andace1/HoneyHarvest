import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  Flex,
  Image,
  Spacer,
  useBreakpointValue,
  Grid,
  Button,
} from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');
import BeeAnimation from './BeeAnimation';
import ProductChart from './ProductChart';
import QuoteDisplay from './QuoteDisplay'; //

interface Order {
  UserId: number;
  commentUser: string;
  deliveryAddress: string;
  estimatedDate: string;
  createdAt: string;
  status?: string;
  picture: string;
  numberBasket: number;
  totalOrderPrice: number;
  products: Array<{
    productId: number;
    numberBasket: number;
    totalBasketPrice: number;
    category: number;
    title: string;
    description: string;
    location: string;
    price: number;
    sort: number;
    yearOfHarvest: number;
    starsRating: number;
    picture: string;
    weight: number; // добавляем вес продукта
  }>;
}

interface Product {
  id: number;
  title: string;
  picture: string;
  category: number;
  sort: number;
  yearOfHarvest: number;
  price: number;
  location: string;
  starsRating: number;
  description: string;
  weight: number; // добавляем вес продукта
}

interface User {
  id: number;
}

interface OrdersPageComponentProps {
  user: User;
  orders: Order[];
}

interface BasketItem {
  UserId: number;
  commentUser: string;
  createdAt: string;
  date: string;
  deliveryAddress: string;
  estimatedDate: string;
  id: number;
  numberBasket: number;
  orderId: number | null;
  productId: number;
  status: string;
  totalBasketPrice: number;
  updatedAt: string;
  product: Product; // Добавляем связь с продуктом
}

const formatDateTime = (datetime: string): string => {
  return dayjs(datetime).format('D MMMM (dddd)');
};

// Измените, если вы используете TypeScript с Vite
const { VITE_API, VITE_BASE_URL } = import.meta.env;

// Компонент для отображения рейтинга продукта
const ProductRating: React.FC<{ product: Product }> = ({ product }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < product.starsRating; i++) {
      stars.push(
        <Image
          key={i}
          src="/icons/star_rating.png"
          alt={`Star ${i + 1}`}
          boxSize="20px"
          objectFit="cover"
          marginRight="2px" // Расстояние между звездами
        />
      );
    }
    return stars;
  };

  return (
    <Box display="flex" alignItems="center">
      {renderStars()}
    </Box>
  );
};

const OrdersPageComponent: React.FC<OrdersPageComponentProps> = ({
  user,
  orders,
}) => {
  const [ordersFromBasket, setOrdersFromBasket] = useState<BasketItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        const response = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/basket/get`,
          {
            params: { userId: user.id },
          }
        );
        setOrdersFromBasket(response.data.entry);
      } catch (error) {
        console.error('Ошибка при загрузке данных из корзины', error);
      }
    };

    fetchBasketData();
  }, [user.id]);

  const groupProducts = (products) => {
    return products.reduce((acc, product) => {
      const existingProduct = acc.find((p) => p.title === product.title);
      if (existingProduct) {
        existingProduct.numberBasket += product.numberBasket;
        existingProduct.totalBasketPrice += product.totalBasketPrice;
      } else {
        acc.push({ ...product });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    if (ordersFromBasket.length > 0) {
      const firstItem = ordersFromBasket[0];
      const groupedProducts = groupProducts(
        ordersFromBasket.map((item) => ({
          productId: item.productId,
          numberBasket: item.numberBasket,
          totalBasketPrice: item.totalBasketPrice,
          category: item.product.category,
          title: item.product.title,
          description: item.product.description,
          location: item.product.location,
          price: item.product.price,
          sort: item.product.sort,
          yearOfHarvest: item.product.yearOfHarvest,
          starsRating: item.product.starsRating,
          picture: item.product.picture,
          discountRatio: item.product.discountRatio,
        }))
      );

      const orderData: Order = {
        UserId: firstItem.UserId,
        commentUser: firstItem.commentUser,
        createdAt: formatDateTime(firstItem.createdAt),
        status: firstItem.status,
        deliveryAddress: firstItem.deliveryAddress,
        estimatedDate: formatDateTime(firstItem.estimatedDate),
        picture: firstItem.product.picture,
        totalOrderPrice: firstItem.totalBasketPrice,
        numberBasket: firstItem.numberBasket,
        products: groupedProducts,
      };

      setOrder(orderData);
    }
  }, [ordersFromBasket]);

  const isWideScreen = useBreakpointValue({ base: false, md: true });

  return (
    <Box p={6}>
      <Text
        fontSize="2.5rem"
        fontWeight="bold"
        mb={6}
        textAlign="center"
        color="teal.600"
      >
        Мои заказы
        {/* <Box position="relative">
          {' '}
          <BeeAnimation />
        </Box> */}
      </Text>
      {order ? (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          mb={4}
          bg="white"
          shadow="md"
          _hover={{ shadow: 'lg' }}
          transition="all 0.3s ease"
          overflow="hidden"
        >
          <Heading
            fontSize="2rem"
            mb={4}
            textAlign="center"
            color="teal.700"
            style={{ fontFamily: 'Bona Nova SC, cursive' }}
          >
            Заказ № {order.numberBasket}
          </Heading>
          <Grid templateColumns="2fr 2fr" gap={6}  paddingLeft="40px"  paddingRight="40px"   paddingTop="20px"  justifyContent="center" >
        <Box >
          <Table variant="unstyled" mb={10} maxW="600px">
            <Tbody>
              <Tr>
                <Td fontWeight="bold" fontSize="1.2rem" color="teal.600">
                  Статус
                </Td>
                <Td fontSize="1.2rem">{order.status}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="1.2rem" color="teal.600">
                  Адрес доставки:
                </Td>
                <Td fontSize="1.2rem">{order.deliveryAddress}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="1.2rem" color="teal.600">
                  Ожидаемая дата:
                </Td>
                <Td fontSize="1.2rem">{order.estimatedDate}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="1.2rem" color="teal.600">
                  Комментарий:
                </Td>
                <Td fontSize="1.2rem">{order.commentUser}</Td>
              </Tr>
              {/* <Tr>
                <Td fontWeight="bold" fontSize="1.2rem" color="teal.600">
                  Создано:
                </Td>
                <Td fontSize="1.2rem">{order.createdAt}</Td>
              </Tr> */}
              <Tr>
                <Td fontWeight="bold" fontSize="1.2rem" color="teal.600">
                  Итого:
                </Td>
                <Td fontSize="1.2rem">{order.totalOrderPrice} руб.</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box
          p={4}
           borderRadius="md"
             maxHeight="70%"
          >
          <QuoteDisplay />
        </Box>
      </Grid>

          <Text  fontSize="1.6rem" fontWeight="bold" mb={4} color="teal.700">
            Продукты:
          </Text>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={6}
            mb={4}
          >
            {order.products.map((product, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg="gray.50"
                shadow="md"
                _hover={{ shadow: 'lg' }}
                transition="all 0.3s ease"
                overflow="hidden"
              >
                <Flex
                  direction={isWideScreen ? 'row' : 'column'}
                  align="center"
                  mb={4}
                >
                  <Image
                    src={`http://localhost:3000/productsPhoto/${product.picture}`}
                    alt={product.title}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                    mr={isWideScreen ? 6 : 0}
                    mb={isWideScreen ? 0 : 4}
                  />
                  <Box flex="1">
                    <Heading fontSize="xl" color="teal.800">
                      {product.title}
                    </Heading>
                    <Text mt={2} color="gray.600">
                      {product.description}
                    </Text>
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Вес:{' '}
                      {product.numberBasket * 100 >= 1000
                        ? `${(product.numberBasket * 100) / 1000} кг`
                        : `${product.numberBasket * 100} г`}
                    </Text>
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Цена за 1 кг: {product.price * product.discountRatio} руб.
                    </Text>
                    <Flex mt={4} align="center">
                      <Text fontSize="lg" fontWeight="bold" color="teal.700">
                        Итого: {(product.price / 10) * product.numberBasket}{' '}
                        руб.
                      </Text>
                      <Spacer />
                      <ProductRating product={product} />
                    </Flex>
                  </Box>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  {product.location}
                </Text>
                {/* <Text fontSize="sm" color="gray.500">
                  СКИДКА discountRatio: {product.discountRatio}
                </Text> */}
              </Box>
            ))}
          </Grid>
        </Box>
      ) : (
        <Text fontSize="xl" textAlign="center">
          Нет заказов
        </Text>
      )}
    </Box>
  );
};

export default OrdersPageComponent;
