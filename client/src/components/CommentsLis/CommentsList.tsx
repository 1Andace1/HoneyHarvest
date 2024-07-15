import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import OneCard from "../OneCard/OneCard";
// import {  Heading,  Wrap } from "@chakra-ui/react";
// import { getProducts } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { getAllComments } from "../../redux/thunkActionsComment";
import { Heading, Wrap } from "@chakra-ui/react";
import { IProducts } from "../../types/stateTypes";
import ModalFormCreate from "../ModalForm/ModalFormCreate";
import OneComment from "./OneComment";
// import { IProducts } from "../../types/stateTypes";
// import ModalFormCreate from "../ModalForm/ModalFormCreate";

export default memo(function CommentsList({currentProduct}): JSX.Element {

  const dispatch = useAppDispatch();

  const { comments } = useAppSelector(
    (state: { commentSlice: ProductState }) => state.commentSlice
  );
  const { user } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  
  useEffect((): void => {
    dispatch(getAllComments());
  }, []);
  
    const [verifiedComments, setVerifiedComments] = useState<IProducts[]>([]);

  useEffect(() => {
    const filtredComments = comments.filter((comment) => comment.isVerified === true )
    setVerifiedComments(filtredComments);
  }, [comments]);


  return (
    <>
       {user?.id ? (
                <ModalFormCreate />
      ) : (
        false
      )}
      <Wrap spacing="30px">
        {/* {verifiedComments.length ? (
          verifiedComments.map((el: IProducts) => (
            <OneComment el={el} key={el.id} />
          ))
        ) : (
          <Heading as="h2" size="2xl">
            Комментариев нет
          </Heading>
        )} */}

{comments.length ? (
          comments.filter((comment) => comment.isVerified !== true).map((el: IProducts) => (
            <OneComment el={el} key={el.id} />
          ))
        ) : (
          <Heading as="h2" size="2xl">
            Комментариев нет
          </Heading>
        )}



      </Wrap> 
    </>
  );
});
