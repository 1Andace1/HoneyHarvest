import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  AuthState,
  CommentState,
} from "../../redux/types/states";
import { getAllComments } from "../../redux/thunkActionsComment";
import { Heading, VStack } from "@chakra-ui/react";
import { IComment, IProduct } from "../../types/stateTypes";
import OneComment from "./OneComment";
import ModalFormCreateComment from "../ModalForm/ModalFormCreateComment";

export default memo(function CommentsList({
  currentProduct,
}: {
  currentProduct: IProduct;
}): JSX.Element {
  const dispatch = useAppDispatch();

  const { comments } = useAppSelector(
    (state: { commentSlice: CommentState }) => state.commentSlice
  );
  const { user } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );

  useEffect((): void => {
    dispatch(getAllComments());
  }, []);

  // const [verifiedComments, setVerifiedComments] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   const filtredComments = comments.filter(
  //     (comment) => comment.isVerified === true
  //   );
  //   setVerifiedComments(filtredComments);
  // }, [comments]);

  return (
    <>
      <VStack
        // divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align="stretch"
      >
        {user?.id ? (
          <ModalFormCreateComment currentProduct={currentProduct} />
        ) : (
          false
        )}
        {comments.length ? (
          comments
            .filter(
              (comment: IComment) =>
                comment.isVerified === true &&
                currentProduct.id === comment.productId
            )
            .map((el: IComment) => (
              // @ts-ignore
              <OneComment el={el} key={el.id} currentProduct={currentProduct} />
            ))
        ) : (
          <Heading as="h2" size="2xl">
            Комментариев нет
          </Heading>
        )}
      </VStack>
    </>
  );
});
