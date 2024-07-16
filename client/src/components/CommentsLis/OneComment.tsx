import {
  Card,
  CardBody,
  CardFooter,
  Text,
  IconButton,
  Highlight,
  ButtonGroup,
  Container,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IComment } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { delProduct } from "../../redux/thunkActionsCatalog";
import { IUser } from "../../types/stateTypes";
import { AuthState } from "../../redux/types/states";
import ModalFormUpdate from "../ModalForm/ModalFormUpdate";
import { delComment } from "../../redux/thunkActionsComment";
import EditIcon from "../../ui/icons/EditIcon";
import "./OneComment.css";

export default function OneComment({ el }: { el: IComment }): JSX.Element {
  // const navigate = useNavigate();
  // const oneProductPage = () => {
  //   navigate(`/detail/${el.id}`);
  // };

  const {
    id,
    productId,
    text,
    isVerified,
    likesQuantity,
    createdAt,
    updatedAt,
  } = el as IComment;


  const commentCreationDate: Date = new Date(createdAt);
  const creationYear: number = commentCreationDate.getFullYear();
  const creationMonth: number = commentCreationDate.getMonth();
  const creationDay: number = commentCreationDate.getDate();


  const username = `${el?.User?.username}:`;
  // const text = `${creationDay}.$${creationMonth}.${creationYear} {el?.User?.username}: ${el?.text}`;
  //   console.log("el.User.username------->", el.User.username);

  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );

  function deleteHandler(id: number): void {
    dispatch(delComment(id));
  }

  return (
    <div>
      <Container size="lg" variant="bold">
        <Card className="commentCard" maxW="lg" variant="filled" align="center">
          <CardBody>
            {/* <Heading size="md">
                  {title}
                </Heading> */}
            <Text fontSize="2xl">
              <Highlight
                query={username}
                styles={{ px: "1", py: "1", bg: "orange.100" }}
              >
                {text}
              </Highlight>
            </Text>
            <Text>Количество лайков: {likesQuantity}</Text>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter>
            <ButtonGroup spacing="2">
              {el.userId === user.id ? (
                <IconButton
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="lg"
                  icon={<EditIcon />}
                />
              ) : (
                false
              )}

              {el.userId === user.id || user.isAdmin === true ? (
                <IconButton
                  onClick={() => deleteHandler(el.id)}
                  variant="solid"
                  colorScheme="red"
                  aria-label="Call Segun"
                  size="lg"
                  icon={<DeleteIcon />}
                />
              ) : (
                false
              )}
            </ButtonGroup>

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
      </Container>
    </div>
  );
}
