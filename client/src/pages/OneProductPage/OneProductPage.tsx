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
} from "@chakra-ui/react";
import { IProducts } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from "../../types/stateTypes";
import { basketApp } from "../../redux/thunkbasketApp";
import { AuthState, ProductState } from "../../redux/types/states";
import ModalFormUpdate from "../../components/ModalForm/ModalFormUpdate";
import { Params, useNavigate, useParams } from "react-router-dom";
import CommentsList from "../../components/CommentsLis/CommentsList";
import './OneProductPage.css'


export default function OneProductPage(): JSX.Element {
  const { "*": idString }: Params<string> = useParams();
  const id = Number(idString);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );
  const currentProduct = products.find((prod: IProducts) => prod.id === id);

  console.log(
    "Загрузилась страница OneProductPage: /detail/",
    id,
    ",  ",
    currentProduct?.title,
    ", id №",
    currentProduct?.id
  );

  const title = currentProduct?.title
  const discountRatio = currentProduct?.discountRatio
  const category = currentProduct?.category
  const sort = currentProduct?.sort
  const description = currentProduct?.description
  const yearOfHarvest = currentProduct?.yearOfHarvest
  const availableQuantity = currentProduct?.availableQuantity
  const picture = currentProduct?.picture
  const location = currentProduct?.location
  const starsRating = currentProduct?.starsRating
  const createdAt = currentProduct?.createdAt
  const updatedAt = currentProduct?.updatedAt

  // const {title, discountRatio, category, sort, description, yearOfHarvest,
  //   availableQuantity, picture, location, starsRating, createdAt,
  //   updatedAt} = currentProduct as IProducts;

  const price = (currentProduct?.price || 0) / 10;
  const priceConDiscountRatio = price * (discountRatio || 0);
  const availableQuantityForBuyers: number | string | undefined =
    availableQuantity <= 10 ? availableQuantity : "более 10 ";
  const discountIsTrue: boolean = !(discountRatio === undefined || discountRatio >= 1);

  const productCreationDate: Date = new Date(createdAt);
  const productCreationYear: number = productCreationDate.getFullYear();
  const productCreationMonth: number = productCreationDate.getMonth() + 1;
  const productCreationDay: number = productCreationDate.getDate();

  const productUpdateDate: Date = new Date(updatedAt);
  const productUpdateYear: number = productUpdateDate.getFullYear();
  const productUpdateMonth: number = productUpdateDate.getMonth() + 1;
  const productUpdateDay: number = productUpdateDate.getDate();


  function basketHandler(id: number): void {
    console.log(
      "На странице OneProductPage юзер №",
      user.id,
      "добавил в корзину продукт №",
      id
    );
    dispatch(basketApp({ productId: id, userId: user.id }));
  }

  function deleteHandler(id: number): void {
    console.log(
      "На странице OneProductPage админ №",
      user.id,
      "удаляет продукт №",
      id
    );
    dispatch(delProduct(id));
    navigate("/catalog");
  }

  return (
    <div>
        <Card 
        className="card"
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'>
            <Image src={`/${picture}`} alt="honey" borderRadius="lg"
            objectFit='cover'
            maxW={{ base: '100%', sm: '500px' }} />
            <Stack mt="6" spacing="3">
          <CardBody>
              <Heading size="lg">{title}</Heading>
              <Text fontSize='2xl'>Категория: {category}</Text>
              <Text fontSize='2xl'>Сорт: {sort}</Text>
              <Text fontSize='2xl'>{description}</Text>
              <Text fontSize='2xl'>Год урожая: {yearOfHarvest}</Text>
              <Text fontSize='2xl'>Местонахождение: {location}</Text>
              {user?.isAdmin ? (
                <Text fontSize='2xl'>Для продажи доступно: {availableQuantity} кг</Text>
              ) : (
                <Text fontSize='2xl'>
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
              <Text fontSize='2xl'>Рейтинг: {starsRating}</Text>
              {user?.isAdmin ? (
                <>
                  <Text>
                    {" "}
                    Добавлен в каталог: {productCreationDay}.
                    {productCreationMonth}.{productCreationYear}{" "}
                  </Text>
                  <Text>
                    {" "}
                    Обновлён в каталоге: {productUpdateDay}.
                    {productUpdateMonth}.{productUpdateYear}{" "}
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
              <ButtonGroup spacing="2">
                <Button
                  onClick={() => deleteHandler(currentProduct?.id)}
                  variant="solid"
                  colorScheme="red"
                >
                  Удалить
                </Button>
                <ModalFormUpdate el={currentProduct} key={currentProduct?.id} />
              </ButtonGroup>
            ) : (
              <ButtonGroup spacing="2">
                <Button
                  onClick={() => basketHandler(currentProduct?.id)}
                  variant="solid"
                  colorScheme="teal"
                >
                  Добавить в корзину
                </Button>
              </ButtonGroup>
            )}
          </CardFooter>
        </Card>
        <CommentsList currentProduct={currentProduct} />
    </div>
  );
}
