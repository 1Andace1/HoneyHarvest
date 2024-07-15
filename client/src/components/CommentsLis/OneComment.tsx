import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Text,
    Image,
    WrapItem,
    Tag,
    Button,
  } from "@chakra-ui/react";
  import { IProducts } from "../../types/stateTypes";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks";
  import { delProduct } from "../../redux/thunkActionsCatalog";
  import { IUser } from "../../types/stateTypes";
  import { AuthState } from "../../redux/types/states";
  import ModalFormUpdate from "../ModalForm/ModalFormUpdate";
import { delComment } from "../../redux/thunkActionsComment";
  
  export default function OneComment({ el }: { el: IProducts }): JSX.Element {
    // const navigate = useNavigate();
    // const oneProductPage = () => {
    //   navigate(`/detail/${el.id}`);
    // };
  
    const {id, productId, text, isVerified, likesQuantity, createdAt, updatedAt} = el as IProducts;
  
    const dispatch = useAppDispatch();
    const { user }: { user: IUser } = useAppSelector(
      (state: { authSlice: AuthState }) => state.authSlice
    );
  
  
    function deleteHandler(id: number): void {
      dispatch(delComment(id));
    }
  
    return (
      <div>
        <WrapItem>
          <Card maxW="sm">
            <CardBody>
              <Stack mt="6" spacing="3">
                {/* <Heading size="md">
                  {title}
                </Heading> */}
                <Text>{text}</Text>
                <Text>Количество лайков: {likesQuantity}</Text>
                <Button
                    onClick={() => deleteHandler(el.id)}
                    variant="solid"
                    colorScheme="red"
                  >
                    Удалить
                  </Button>

              </Stack>
            </CardBody>
            {/* <Divider /> */}
            <CardFooter>
              {/* {user?.isAdmin ? (
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
              )} */}
            </CardFooter>
          </Card>
        </WrapItem>
      </div>
    );
  }
  