import {
  Text,
  IconButton,
  Highlight,
  ButtonGroup,
  Container,
  Box,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IComment } from "../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser } from "../../types/stateTypes";
import { AuthState } from "../../redux/types/states";
import { delComment } from "../../redux/thunkActionsComment";
import EditIcon from "../../ui/icons/EditIcon";
import "./OneComment.css";
import axiosInstance from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { useState } from "react";

export default function OneComment({ el }: { el: IComment }): JSX.Element {
  // const navigate = useNavigate();
  // const oneProductPage = () => {
  //   navigate(`/detail/${el.id}`);
  // };

  const {
    likesQuantity,
    createdAt,
  } = el as IComment;

  const commentCreationDate: Date = new Date(createdAt);
  const creationYear: number = commentCreationDate.getFullYear();
  const creationMonth: number = commentCreationDate.getMonth();
  const creationDay: number = commentCreationDate.getDate();

  const username = `${el?.User?.username}:`;
  const text = `${creationDay}.${creationMonth}.${creationYear} ${el?.User?.username}: ${el?.text}`;

  const dispatch = useAppDispatch();
  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );

  function deleteHandler(id: number): void {
    dispatch(delComment(id));
  }

  const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;
  const [likeCount, setLikeCount] = useState<number>(likesQuantity);
  async function addLike(): Promise<void> {
    console.log('VITE_BASE_URL----->', VITE_BASE_URL);
    console.log('VITE_API----->', VITE_API);
    try {
      const userId = user.id
      const { data }: AxiosResponse = await axiosInstance.put(`${VITE_BASE_URL}${VITE_API}/comment/putlike/${el.id}`, userId)
      console.log("data like:", data)
      setLikeCount((pre: number): number => pre + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Container maxW='container.sm' size="lg" variant="bold">
      <Flex
          maxW="5300px"
          flexWrap="wrap"
          bg="#F0FFF4"
          w='100%'
          // className={styles.boxСontainer2}
        >
        <Box w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' bg={"whiteAlpha"}>
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
            {/* <Text>Количество лайков: {likesQuantity}</Text> */}
            <button 
            onClick={addLike}
            >
          {likeCount ? `❤️️ ${likeCount}` :  '💛 0'}
        </button>
          {/* <Divider /> */}
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
              </Box>
              </Flex>
      </Container>
    </div>
  );
}
