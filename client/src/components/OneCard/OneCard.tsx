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
  Box,
} from "@chakra-ui/react";
import { IProduct } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from "../../types/stateTypes";

import { AuthState } from "../../redux/types/states";
import ModalFormUpdate from "../ModalForm/ModalFormUpdate";
import { useNavigate } from "react-router-dom";
import { basketApp } from "../../redux/thunkbasketApp";
import "./OneCard.module.css";

export default function OneCard({
  el,
  type,
  handleRemoveProduct,
  basketId,
}: {
  el: IProduct;
  type: string;
  handleRemoveProduct: (id: number) => void;
  basketId: number;
}): JSX.Element {
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

  const productIsNew: boolean =
    todayYear === productCreationYear &&
    todayMonth === productCreationMonth &&
    todayDate === productCreationDay;

  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  // const { basket } = useAppSelector((state) => state.basketSlice);


// Компонент для отображения рейтинга продукта
const ProductRating: React.FC = () => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < starsRating; i++) {
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
    <Box display="flex" justifyContent={"center"}>
      {renderStars()}
    </Box>
  );
}


  function basketHandler(id: number): void {
    // @ts-ignore
    dispatch(basketApp({ productId: Number(id), userId: Number(user.id) }));
  }

  // interface BasketAppPayload {
  //   productId: number;
  //   userId: number;
  // }
  // const basketApp = (payload: BasketAppPayload) => ({
  //   type: 'BASKET_APP',
  //   payload,
  // });

  function deleteHandler(id: number | string): void {
    dispatch(delProduct(Number(id)));
  }

  return (
    <div>
      <WrapItem className="kartochka">
        <Card
          maxW="sm"
          variant="filled"
          _hover={{
            // Эффекты при наведении
            transform: "scale(1.01)", // Увеличение масштаба
            boxShadow: "lg", // Увеличиваем тень при наведении
          }}
          height="850px"
        >
          <CardBody>
            <Image
              // src={picture}
              alt="honey"
              borderRadius="lg"
              src={
                picture
                  ? `http://localhost:3000/productsPhoto/${picture}?t=${new Date().getTime()}`
                  : `http://localhost:3000/productsPhoto/pattern.jpeg?t=${new Date().getTime()}`
              }
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">
                {title}
                {productIsNew ? (
                  // здесь располагается метка нового продукта:
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
                  Цена: <br /> {price} руб. / 100 гр.
                </Text>
              )}
              {/* <Text>Рейтинг: {starsRating}</Text> */}
              <ProductRating />





            </Stack>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter justify="space-around">
            {type === "catalog" && (
              <>
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
                      colorScheme="green"
                    >
                      Подроб
                    </Button>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup spacing="2">
                    <Button
                      onClick={() => basketHandler(el?.id)}
                      variant="solid"
                      colorScheme="green"
                    >
                      Добавить в корзину
                    </Button>
                    <Button
                      onClick={() => oneProductPage()}
                      variant="outline"
                      colorScheme="green"
                    >
                      Подробнее
                    </Button>
                  </ButtonGroup>
                )}
              </>
            )}

            {type === "basket" && (
              <Button
                colorScheme="yellow"
                // variant="outline"
                onClick={() => handleRemoveProduct(basketId)}
              >
                убрать
              </Button>
            )}
          </CardFooter>
        </Card>
      </WrapItem>
    </div>
  );
}
