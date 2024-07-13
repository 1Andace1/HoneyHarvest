import {useState } from "react";

import { Input, Button} from "@chakra-ui/react";

// import { Stack, HStack, VStack, Box } from "@chakra-ui/react";

import styles from "./ModalForm.module.css";
import axiosInstance from "../../axiosInstance";

const { VITE_API } = import.meta.env;

export default function ModalFormCreate({ id }) {
console.log('зашли в FormUpdate, id = ', id);

interface Inputs {
  title: string;
    price: number;
    discountRatio: number;
    category: string;
    sort: string;
    description: string;
    yearOfHarvest: number;
    availableQuantity: number;
    picture: string;
    location: string;
}

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    price: 0,
    discountRatio: 0,
    category: "",
    sort: "",
    description: "",
    yearOfHarvest: 0,
    availableQuantity: 0,
    picture: "",
    location: ""
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
      
    });
    if (res.status === 200) {
      setInputs({
        title: "",
        price: 0,
        discountRatio: 0,
        category: "",
        sort: "",
        description: "",
        yearOfHarvest: 0,
        availableQuantity: 0,
        picture: "",
        location: ""
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