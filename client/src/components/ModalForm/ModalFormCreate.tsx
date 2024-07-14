import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { AddProduct } from "../../redux/thunkActionsCatalog";
import { IInputsProducts, IInputsProductsString } from "../../types/stateTypes";

import styles from "./ModalForm.module.css";

export default function ModalFormCreate(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const defaultInputs = { picture: "./productsPhoto/pattern.jpeg" };
  const defaultInputs = {} as IInputsProductsString;
  const [inputs, setInputs] = useState(defaultInputs);

  const changeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setInputs((prev: object) => ({ ...prev, [e.target.name]: e.target.value }));
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
        inputs?.title &&
        inputs?.priceString &&
        inputs?.discountRatioString &&
        inputs?.category &&
        inputs?.sort &&
        inputs?.description &&
        inputs?.yearOfHarvestString &&
        inputs?.availableQuantityString &&
        inputs?.location
      )
    ) {
      console.log("Ошибка!!! Заполни все поля");
    } else if (
      !(
        Number(inputs?.priceString) &&
        Number(inputs?.discountRatioString) &&
        Number(inputs?.yearOfHarvestString) &&
        Number(inputs?.availableQuantityString)
      )
    ) {
      console.log(
        "Ошибка!!! Введи числа в поля: ЦЕНА, СКИДКА, ГОД УРОЖАЯ, ДОСТУПНО"
      );
    } else {
      const convertedInputs = {} as IInputsProducts;

      convertedInputs.picture =
        inputs?.picture || "./productsPhoto/pattern.jpeg";
      convertedInputs.title = inputs?.title;
      convertedInputs.price = Number(inputs?.priceString);
      convertedInputs.discountRatio = Number(inputs?.discountRatioString);
      convertedInputs.category = inputs?.category;
      convertedInputs.sort = inputs?.sort;
      convertedInputs.description = inputs?.description;
      convertedInputs.yearOfHarvest = Number(inputs?.yearOfHarvestString);
      convertedInputs.availableQuantity = Number(
        inputs?.availableQuantityString
      );
      convertedInputs.location = inputs?.location;

      console.log("Зашли в submitHandler,  convertedInputs =", convertedInputs);

      await dispatch(AddProduct(convertedInputs));
      onClose();
      setInputs(() => defaultInputs);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        // isLoading={user?.isAdmin === true}
        spinner={<p>создание записи</p>}
        variant="solid"
        colorScheme="teal"
      >
        Добавить новые продукты в каталог
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Новая запись в каталог</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className={styles.wrapper}>
              {/* <h3 className={styles.head}>Заполни поля:</h3> */}
              <div className={styles.inputs}>
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="title"
                  value={inputs?.title}
                  placeholder="Название продукта"
                />
                <NumberInput>
                  <NumberInputField
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    name="priceString"
                    value={inputs?.priceString}
                    placeholder="цена за 1 кг"
                  />
                </NumberInput>

                <NumberInput>
                  <NumberInputField
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    name="discountRatioString"
                    value={inputs?.discountRatioString}
                    placeholder="коэффициент скидки, например 0.9"
                  />
                </NumberInput>
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="category"
                  value={inputs?.category}
                  placeholder="категория (мёд, прополис или др.)"
                />
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="sort"
                  value={inputs?.sort}
                  placeholder="сорт (липовый, цветочный или др.)"
                />
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="description"
                  value={inputs?.description}
                  placeholder="описание"
                />
                <NumberInput>
                  <NumberInputField
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    name="yearOfHarvestString"
                    value={inputs?.yearOfHarvestString}
                    placeholder="год урожая"
                  />
                </NumberInput>
                <NumberInput>
                  <NumberInputField
                    onChange={changeHandler}
                    borderColor="#3f3e3e"
                    name="availableQuantityString"
                    value={inputs?.availableQuantityString}
                    placeholder="доступное количество продукта"
                  />
                </NumberInput>

                {/* <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="picture"
          value={inputs?.picture}
          placeholder="загрузить фото продукта"
        /> */}
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="location"
                  value={inputs?.location}
                  placeholder="месторасположение"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            {/* <div className={styles.btns}> */}
            <Button type="submit" colorScheme="green" onClick={submitHandler}>
              Создать
            </Button>
            {/* </div> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
