import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import { Input, Button, Heading, Wrap } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";
// import { Stack, HStack, VStack, Box } from "@chakra-ui/react";

import styles from "./ModalForm.module.css";
import axiosInstance from "../../axiosInstance";

const { VITE_API } = import.meta.env;

export default function ModalFormCreate({ id }) {
console.log('зашли в FormUpdate, id = ', id);


  const [inputs, setInputs] = useState({
    title: "",
    education: "",
    experience: "",
    skills: "",
    public: false,
  });

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    console.log('зашли в submitHandler, inputs = ', inputs);
    e.preventDefault();
    const res = await axiosInstance.put(`${VITE_API}/update`, {
      ...inputs,
      id,
      //   user: user.id,
    });
    if (res.status === 200) {
      setEntries((prev) => [...prev, res.data]);
      setInputs({
        title: "",
        education: "",
        experience: "",
        skills: "",
        public: false,
      });
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>Добавь новое резюме:</h3>
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
          name="education"
          value={inputs.price}
          placeholder="цена за 1 кг"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="experience"
          value={inputs.discountRatio}
          placeholder="коэффициент скидки"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="skills"
          value={inputs.category}
          placeholder="категория (мёд, прополис или др.)"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="skills"
          value={inputs.sort}
          placeholder="сорт (липовый, цветочный или др.)"
        />
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="public"
          value={inputs.description}
          placeholder="описание"
        />



        
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="public"
          value={inputs.yearOfHarvest}
          placeholder="год урожая"
        />



        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="public"
          value={inputs.availableQuantity}
          placeholder="доступное количество продукта"
        />



        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="public"
          value={inputs.picture}
          placeholder="месторасположение"
        />



        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="public"
          value={inputs.location}
          placeholder="загрузить фото продукта"
        />





      </div>
      <div className={styles.btns}>
        <Button type="submit" colorScheme="blue">
          Создать
        </Button>
      </div>
    </form>
  );
}