import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { IProducts } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from '../../types/stateTypes';


export default function OneCard({ el }: { el: IProducts }): JSX.Element {
  const title = el.title;
  const price = el.price / 10;
  const discountRatio = el.discountRatio;
  // const category = el.category;
  const sort = el.sort;
  const description = el.description;
  const yearOfHarvest = el.yearOfHarvest;
  // const availableQuantity = el.availableQuantity;
  const picture = el.picture;
  const location = el.location;
  const starsRating = el.starsRating;
  const priceConDiscountRatio = price * discountRatio;

  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector((state) => state.authSlice);
  // const { basket } = useAppSelector((state) => state.basketSlice);

  function basketHandler(id: number | string): void {
    console.log(id, user.id, '+++++++++++++++++++++++++++++++++++++----');
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
            <Image
              src={picture}
              alt="honey"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{title}</Heading>
              <Text>{description}</Text>
              <Text>Год урожая: {yearOfHarvest}</Text>
              <Text>Сорт: {sort}</Text>
              <Text>Местонахождение: {location}</Text>
              <Text color="blue.600" fontSize="2xl">
                {price} руб. / 100 гр.
              </Text>
              <Text color="blue.600" fontSize="2xl">
                Цена со скидкой: {priceConDiscountRatio} руб. / 100 гр.
              </Text>
              <Text>Рейтинг: {starsRating}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            {user?.isAdmin ? (
              <ButtonGroup spacing="2">
                <Button onClick={() => deleteHandler(el.id)} variant="solid" colorScheme="red">
                  Удалить
                </Button>
                <Button variant="solid" colorScheme="green">
                  Редактировать
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Купить
                </Button>
                <Button onClick={() => basketHandler(el.id)} variant="ghost" colorScheme="blue">
                  Добавить в корзину
                </Button>
              </ButtonGroup>
            )}
          </CardFooter>
        </Card>
      </WrapItem>
    </div>
  );
}
