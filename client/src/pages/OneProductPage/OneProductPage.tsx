import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Stack, Text, Image, WrapItem } from "@chakra-ui/react";
import { IProducts } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from "../../types/stateTypes";
import { basketApp } from "../../redux/thunkbasketApp";
import { AuthState, ProductState } from "../../redux/types/states";
import ModalFormUpdate from "../../components/ModalForm/ModalFormUpdate";
import { Params, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function OneProductPage(): JSX.Element {
  const { '*': id }: Params<string> = useParams();
  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) =>
      state.authSlice
  );
  const { products }: { product: IProducts[] } = useAppSelector(
    (state: { productSlice: ProductState }) =>
      state.productSlice
  );
  const el = products.find((prod) => prod.id === Number(id))

console.log('----------------------------------------------------------------------');
    console.log('currentProduct на собственной странице::::::::', el);





  const title = el?.title;
  const price = el?.price / 10;
  const discountRatio = el?.discountRatio;
  // const category = el?.category;
  const sort = el?.sort;
  const description = el?.description;
  const yearOfHarvest = el?.yearOfHarvest;
  // const availableQuantity = el.availableQuantity;
  const picture = el?.picture;
  const location = el?.location;
  const starsRating = el?.starsRating;
  const priceConDiscountRatio = price * discountRatio;



  function basketHandler(id: number | string): void {
    console.log(id, user.id, "+++++++++++++++++++++++++++++++++++++----");
    dispatch(basketApp({ productId: Number(id), userId: Number(user.id) }));
  }

  function deleteHandler(id: number | string): void {
    console.log('deleteHandler----55-5-5-5-5-,  typeof id: ', typeof id);
    dispatch(delProduct(Number(id)));
  }

  return (
    <div>
      <WrapItem>
        <Card maxW="sm">
          <CardBody>
            <Image src={picture} alt="honey" borderRadius="lg" />
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
                </ButtonGroup>
              )}
          </CardFooter>
        </Card>
      </WrapItem>
    </div>
  );
}
