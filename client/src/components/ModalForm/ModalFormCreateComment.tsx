import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IInputsComment, IProduct, IUser } from "../../types/stateTypes";

import styles from "./ModalForm.module.css";
import { AddComment } from "../../redux/thunkActionsComment";
import { AuthState } from "../../redux/types/states";

export default function ModalFormCreateComment({currentProduct}: {currentProduct: IProduct}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const defaultInputs = { picture: "./productsPhoto/pattern.jpeg" };
  const defaultInputs = {} as IInputsComment;
  const [inputs, setInputs] = useState(defaultInputs);

  const { user }: { user: IUser } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: IInputsComment) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log("[e.target.name]: e.target.value", e.target.name, e.target.value);
  };

  const dispatch = useAppDispatch();

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log("Зашли в submitHandler, inputs = ", inputs);
    e.preventDefault();
    if (
      !(
        inputs?.text
      )
    ) {
      console.log("Ошибка!!! Введи текст комментария");
    } else {
      const convertedInputs = {} as IInputsComment;
      convertedInputs.text = inputs?.text
      convertedInputs.productId = currentProduct?.id;
      convertedInputs.userId = user.id

      console.log("Зашли в submitHandler,  convertedInputs =", convertedInputs);

      await dispatch(AddComment(convertedInputs));
      onClose();
      setInputs(() => defaultInputs);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        isLoading={Boolean(user?.id) === true}
        spinner={<p>создание комментария</p>}
        variant="solid"
        colorScheme="green"
      >
        Добавить комментарий
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Новая запись в каталог</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {/* <h3 className={styles.head}>Заполни поля:</h3> */}
              <div className={styles.inputs}>
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="text"
                  value={inputs?.text}
                  placeholder="Напишите свой комментарий продукта"
                />
              </div>
          </ModalBody>
          <ModalFooter>
            <form onClick={submitHandler} >
            <Button type="submit" colorScheme="green" >
              Создать
            </Button>
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
