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
import { basketApp } from "../../redux/thunkbasketApp";
import { AuthState } from "../../redux/types/states";
import ModalFormUpdate from "../ModalForm/ModalFormUpdate";
import { useNavigate } from "react-router-dom";

export default function OneCard({ el }: { el: IProducts }): JSX.Element {
  const navigate = useNavigate();
  const oneProductPage = () => {
    navigate(`/detail/${el.id}`);
  };

  console.log("el.createdAt", el.createdAt);

  const {
    title,
    discountRatio,
    sort,
    description,
    yearOfHarvest,
    picture,
    location,
    starsRating,
    createdAt,
  } = el as IProducts;
  const price = el?.price / 10;
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

  function basketHandler(id: number): void {
    console.log(id, user.id, "+++++++++++++++++++++++++++++++++++++----");
    dispatch(basketApp({ productId: Number(id), userId: Number(user.id) }));
  }

  function deleteHandler(id: number): void {
    console.log("deleteHandler----55-5-5-5-5-,  typeof id: ", typeof id);
    dispatch(delProduct(id));
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
