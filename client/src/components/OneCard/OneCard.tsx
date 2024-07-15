import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Image,
  WrapItem,
  Tag,
} from "@chakra-ui/react";
import { IProducts } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from "../../types/stateTypes";

import { AuthState } from "../../redux/types/states";
import ModalFormUpdate from "../ModalForm/ModalFormUpdate";
import { useNavigate } from "react-router-dom";



export default function OneCard({ el }: { el: IProducts }): JSX.Element {
  const navigate = useNavigate();
  const oneProductPage = () => {
    navigate(`/detail/${el.id}`);
  };
  const title = el?.title;
  const price = el?.price / 10;
  const discountRatio = el?.discountRatio;
  // const category = el?.category;
  const sort = el?.sort;
  const description = el?.description;
  const yearOfHarvest = el?.yearOfHarvest;
  // const availableQuantity = el?.availableQuantity;
  const picture = el?.picture;
  const location = el?.location;
  const starsRating = el?.starsRating;
  const createdAt = el?.createdAt;
  const priceConDiscountRatio = price * discountRatio;
  const discountIsTrue: boolean = discountRatio < 1;

  const today: Date = new Date();
  const todayYear: number = today.getFullYear();
  const todayMonth: number = today.getMonth();
  const todayDate: number = today.getDate();

  const productCreationDate: Date = new Date(createdAt);
  const productCreationYear: number = productCreationDate.getFullYear();
  const productCreationMonth: number = productCreationDate.getMonth();
  const productCreationDay: number = productCreationDate.getDate();

  const productIsNew: boolean = todayYear === productCreationYear && todayMonth === productCreationMonth && todayDate === productCreationDay



  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  // const { basket } = useAppSelector((state) => state.basketSlice);

  function basketHandler(id: number): void {
    console.log(id, user.id, "+++++++++++++++++++++++++++++++++++++----");
    dispatch(basketApp({ productId: Number(id), userId: Number(user.id) }));
  }
  interface BasketAppPayload {
    productId: number;
    userId: number;
  }
  
  const basketApp = (payload: BasketAppPayload) => ({
    type: 'BASKET_APP',
    payload,
  });
  function deleteHandler(id: number | string): void {
    dispatch(delProduct(Number(id)));
  }

  return (
    <div>
      <WrapItem>
        <Card maxW="sm">
          <CardBody>
            <Image src={picture} alt="honey" borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Heading size="md">
                {title}
                {productIsNew ? (
                <Tag
                  ml="1"
                  fontSize="sm"
                  borderRadius="full"
                  colorScheme="green"
                >
                  НОВЫЙ
                </Tag>
                ) : (
                  false
                )}
              </Heading>
              <Text>{description}</Text>
              <Text>Год урожая: {yearOfHarvest}</Text>
              <Text>Сорт: {sort}</Text>
              <Text>Местонахождение: {location}</Text>
              {discountIsTrue ? (
                <>
                  <Text as="del" color="tomato" fontSize="xl">
                    Цена: {price} руб. / 100 гр.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    Цена со скидкой: <br />
                    {priceConDiscountRatio} руб. / 100 гр.
                  </Text>
                </>
              ) : (
                <Text color="blue.600" fontSize="2xl">
                  Цена: {price} руб. / 100 гр.
                </Text>
              )}
              <Text>Рейтинг: {starsRating}</Text>
            </Stack>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter>
            {user?.isAdmin ? (
              <ButtonGroup spacing="2">
                <Button
                  onClick={() => deleteHandler(el.id)}
                  variant="solid"
                  colorScheme="red"
                >
                  Удалить
                </Button>
                <ModalFormUpdate el={el} key={el.id} />
                <Button
                  onClick={() => oneProductPage()}
                  variant="outline"
                  colorScheme="teal"
                >
                  Подроб
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup spacing="2">
                <Button
                  onClick={() => basketHandler(el.id)}
                  variant="solid"
                  colorScheme="teal"
                >
                  Добавить в корзину
                </Button>
                <Button
                  onClick={() => oneProductPage()}
                  variant="outline"
                  colorScheme="teal"
                >
                  Подробнее
                </Button>
              </ButtonGroup>
            )}
          </CardFooter>
        </Card>
      </WrapItem>
    </div>
  );
}
