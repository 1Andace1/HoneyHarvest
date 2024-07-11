import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import {
  Input,
  Button,
  Heading,
  Wrap,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AddProduct } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";

import styles from "./ModalForm.module.css";
import axiosInstance from "../../axiosInstance";

export default function ModalFormCreate({ id }: { id: number }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultInputs = {
    title: "",
    priceString: "",
    discountRatioString: "",
    category: "",
    sort: "",
    description: "",
    yearOfHarvestString: "",
    availableQuantityString: "",
    // picture: "",
    location: "",
  };

  const [inputs, setInputs] = useState({});

  const changeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setInputs((prev: object) => ({ ...prev, [e.target.name]: e.target.value }));
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
      await dispatch(AddProduct(inputs));
      onClose();
      setInputs(() => {});
    }

    // const res = await axiosInstance.post(`${VITE_API}/update`, {
    //   ...inputs,
    //   id,
    //   //   user: user.id,
    // });
    // if (res.status === 200) {
    //   setEntries((prev) => [...prev, res.data]);
    //   setInputs({
    //     title: "",
    //     price: "",
    //     discountRatio: "",
    //     category: "",
    //     sort: "",
    //     description: "",
    //     yearOfHarvest: "",
    //     availableQuantity: "",
    //     picture: "",
    //     location: "",
    //   });
    // }
  };

  //   const submitHandler = async (e) => {
  //     console.log("зашли в submitHandler, inputs = ", inputs);
  //     e.preventDefault();
  //     const res = await axiosInstance.post(`${VITE_API}/update`, {
  //       ...inputs,
  //       id,
  //       //   user: user.id,
  //     });
  //     if (res.status === 200) {
  //       setEntries((prev) => [...prev, res.data]);
  //       setInputs({
  //         title: "",
  //         price: "",
  //         discountRatio: "",
  //         category: "",
  //         sort: "",
  //         description: "",
  //         yearOfHarvest: "",
  //         availableQuantity: "",
  //         picture: "",
  //         location: "",
  //       });
  //     }
  //   };

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
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="priceString"
                  value={inputs?.priceString}
                  placeholder="цена за 1 кг"
                />
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="discountRatioString"
                  value={inputs?.discountRatioString}
                  placeholder="коэффициент скидки, например 0.9"
                />
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
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="yearOfHarvestString"
                  value={inputs?.yearOfHarvestString}
                  placeholder="год урожая"
                />
                <Input
                  onChange={changeHandler}
                  borderColor="#3f3e3e"
                  name="availableQuantityString"
                  value={inputs?.availableQuantityString}
                  placeholder="доступное количество продукта"
                />
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
              <div className={styles.btns}>
                <Button
                  type="submit"
                  colorScheme="green"
                  onClick={submitHandler}
                >
                  Создать
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            {/* <Button variant="ghost" mr={3} onClick={onClose}>
                  Закрыть
                </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
