import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import { Input, Button, Heading, Wrap, useDisclosure } from "@chakra-ui/react";
import { AddProduct, getProducts } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";
// import { Stack, HStack, VStack, Box } from "@chakra-ui/react";

import styles from "./ModalForm.module.css";
import axiosInstance from "../../axiosInstance";

const { VITE_API } = import.meta.env;

export default function ModalFormCreate({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("зашли в ModalFormCreate.tsx, id = ", id);

  const defaultInputs = {
    title: "",
    price: "",
    discountRatio: "",
    category: "",
    sort: "",
    description: "",
    yearOfHarvest: "",
    availableQuantity: "",
    picture: "",
    location: "",
  };

  const [inputs, setInputs] = useState(defaultInputs);

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(inputs);
  };

  const dispatch = useAppDispatch();

  const submitHandler = async (e): Promise<void> => {
    console.log("Заново зашли в submitHandler, inputs = ", inputs);
    e.preventDefault();
    dispatch(AddProduct(inputs));
    setInputs(() => defaultInputs);

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
    <form onSubmit={submitHandler} className={styles.wrapper}>
      {/* <h3 className={styles.head}>Заполни поля:</h3> */}
      <div className={styles.inputs}>
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="title"
          value={inputs.title}
          placeholder="Название продукта"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="price"
          value={inputs.price}
          placeholder="цена за 1 кг"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="discountRatio"
          value={inputs.discountRatio}
          placeholder="коэффициент скидки"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="category"
          value={inputs.category}
          placeholder="категория (мёд, прополис или др.)"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="sort"
          value={inputs.sort}
          placeholder="сорт (липовый, цветочный или др.)"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="description"
          value={inputs.description}
          placeholder="описание"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="yearOfHarvest"
          value={inputs.yearOfHarvest}
          placeholder="год урожая"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="availableQuantity"
          value={inputs.availableQuantity}
          placeholder="доступное количество продукта"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="picture"
          value={inputs.picture}
          placeholder="месторасположение"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="location"
          value={inputs.location}
          placeholder="загрузить фото продукта"
        />
      </div>
      <div className={styles.btns}>
        <Button type="submit" colorScheme="green" onClick={onClose}>
          Создать
        </Button>
      </div>
    </form>
  );
}
