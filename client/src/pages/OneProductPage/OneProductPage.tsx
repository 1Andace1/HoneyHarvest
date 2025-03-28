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
  Box,
} from "@chakra-ui/react";
import { IProduct } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from "../../types/stateTypes";
import { basketApp } from "../../redux/thunkbasketApp";
import { AuthState, ProductState } from "../../redux/types/states";
import ModalFormUpdate from "../../components/ModalForm/ModalFormUpdate";
import { Params, useNavigate, useParams } from "react-router-dom";
import CommentsList from "../../components/CommentsLis/CommentsList";
import "./OneProductPage.css";

export default function OneProductPage(): JSX.Element {
  const navigate = useNavigate();
  const { "*": idString }: Params<string> = useParams();

  const id = Number(idString);

  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );
  const currentProduct = products.find((prod: IProduct) => prod.id === id);

  if (currentProduct === undefined) {
    navigate("/catalog");
  }
  // console.log("Загрузилась страница OneProductPage: /detail/", id, ",  ", currentProduct?.title, ", id №", currentProduct?.id);

  const title = currentProduct?.title;
  const discountRatio = currentProduct?.discountRatio;
  const category = currentProduct?.category;
  const sort = currentProduct?.sort;
  const description = currentProduct?.description;
  const yearOfHarvest = currentProduct?.yearOfHarvest;
  const availableQuantity = currentProduct?.availableQuantity;
  const picture = currentProduct?.picture;
  const location = currentProduct?.location;
  const starsRating = currentProduct?.starsRating || 0;
  const createdAt = currentProduct?.createdAt;
  const updatedAt = currentProduct?.updatedAt;

  const price = (currentProduct?.price || 0) / 10;
  const priceConDiscountRatio = price * (discountRatio || 0);
  let availableQuantityForBuyers: number | string | undefined;
  if (availableQuantity) {
    availableQuantityForBuyers =
      availableQuantity <= 10 ? availableQuantity : "более 10 ";
  }
  const discountIsTrue: boolean = !(
    discountRatio === undefined || discountRatio >= 1
  );
// @ts-ignore
  const productCreationDate: Date = new Date(createdAt);
  const productCreationYear: number = productCreationDate.getFullYear();
  const productCreationMonth: number = productCreationDate.getMonth() + 1;
  const productCreationDay: number = productCreationDate.getDate();
// @ts-ignore
  const productUpdateDate: Date = new Date(updatedAt);
  const productUpdateYear: number = productUpdateDate.getFullYear();
  const productUpdateMonth: number = productUpdateDate.getMonth() + 1;
  const productUpdateDay: number = productUpdateDate.getDate();


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
    console.log(
      "На странице OneProductPage юзер №",
      user.id,
      "добавил в корзину продукт №",
      id
    );
    // @ts-ignore
    dispatch(basketApp({ productId: id, userId: user.id }));
  }

  // const deleteThisProductById = currentProduct?.id
  // function deleteHandler(id: number): void {
  function deleteHandler(): void {
    // dispatch(delProduct(id));

    if (currentProduct) {
      dispatch(delProduct(currentProduct?.id));
      // dispatch(delProduct(deleteThisProductById));
      navigate("/catalog");
    }
  }

  return (
    <div>
      <Card
        className="card"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          // src={`/${picture}`}
          src={
            picture
              ? `http://localhost:3000/productsPhoto/${picture}?t=${new Date().getTime()}`
              : `http://localhost:3000/productsPhoto/pattern.jpeg?t=${new Date().getTime()}`
          }
          alt="honey"
          borderRadius="lg"
          objectFit="cover"
          maxW={{ base: "100%", sm: "500px" }}
          // Эффекты при наведении:
          _hover={{
            transform: "scale(1.02)", // Увеличение масштаба
            boxShadow: "lg", // Увеличиваем тень при наведении
          }}
        />
        <Stack mt="6" spacing="3">
          <CardBody>
            <Heading size="lg">{title}</Heading>
            <Text fontSize="2xl">Категория: {category}</Text>
            <Text fontSize="2xl">Сорт: {sort}</Text>
            <Text fontSize="2xl">{description}</Text>
            <Text fontSize="2xl">Год урожая: {yearOfHarvest}</Text>
            <Text fontSize="2xl">Местонахождение: {location}</Text>
            {user?.isAdmin ? (
              <Text fontSize="2xl">
                Для продажи доступно: {availableQuantity} кг
              </Text>
            ) : (
              <Text fontSize="2xl">
                Для покупки доступно: {availableQuantityForBuyers} кг
              </Text>
            )}
            {discountIsTrue ? (
              <>
                <Text as="del" fontSize="2xl">
                  Цена: {price} руб. / 100 гр.
                </Text>
                <Text color="blue.600" fontSize="3xl">
                  Цена со скидкой: {priceConDiscountRatio} руб. / 100 гр.
                </Text>
              </>
            ) : (
              <Text color="blue.600" fontSize="3xl">
                Цена: {price} руб. / 100 гр.
              </Text>
            )}
            {/* <Text fontSize="2xl">Рейтинг: {starsRating}</Text> */}
            <ProductRating />



            {user?.isAdmin ? (
              <>
                <Text>
                  {" "}
                  Добавлен в каталог: {productCreationDay}.
                  {productCreationMonth}.{productCreationYear}{" "}
                </Text>
                <Text>
                  {" "}
                  Обновлён в каталоге: {productUpdateDay}.{productUpdateMonth}.
                  {productUpdateYear}{" "}
                </Text>
              </>
            ) : (
              false
            )}
          </CardBody>
        </Stack>
        {/* <Divider /> */}
        <CardFooter>
          {user?.isAdmin ? (
            <ButtonGroup
              flexDirection={["column"]}
              spacing="2"
              justifyContent={"flex-end"}
            >
              <form onClick={deleteHandler}>
                <Button
                  // onClick={() => deleteHandler(currentProduct?.id)}
                  variant="solid"
                  colorScheme="red"
                  marginBottom={7}
                  type="submit"
                >
                  Удалить
                </Button>
              </form>

              {currentProduct ? (
                <ModalFormUpdate el={currentProduct} key={currentProduct?.id} />
              ) : (
                false
              )}
            </ButtonGroup>
          ) : (
            <ButtonGroup spacing="2">
              {currentProduct ? (
                <Button
                  onClick={() => basketHandler(currentProduct?.id)}
                  variant="solid"
                  colorScheme="green"
                  type="submit"
                >
                  Добавить в корзину
                </Button>
              ) : (
                false
              )}
            </ButtonGroup>
          )}
        </CardFooter>
      </Card>

      {currentProduct ? (
        <CommentsList currentProduct={currentProduct} />
      ) : (
        false
      )}
    </div>
  );
}
