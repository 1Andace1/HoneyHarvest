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
} from "@chakra-ui/react";
import { UpdProduct } from "../../redux/thunkActionsCatalog";
// import { AuthState, ProductState } from "../../redux/types/states";
// import { ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";

import styles from "./ModalForm.module.css";

export default function ModalFormUpdate({ el }: { el: IProducts}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("Загрузилось модальное окно редактирования продукта с id №", el.id);

  // const { products } = useAppSelector(
  //   (state: { productSlice: ProductState }) => state.productSlice
  // );
  // const { user } = useAppSelector(
  //   (state: { authSlice: AuthState }) => state.authSlice
  // );

  const priceNumberToString = String(el.price);
  const discountNumberToString = String(el.discountRatio);
  const yearOfHarvestNumberToString = String(el.yearOfHarvest);
  const availableQuantityNumberToString = String(el.availableQuantity);
  const initialInputs = {
    id: el.id,
    title: el.title,
    priceString: priceNumberToString,
    discountRatioString: discountNumberToString,
    category: el.category,
    sort: el.sort,
    description: el.description,
    yearOfHarvestString: yearOfHarvestNumberToString,
    availableQuantityString: availableQuantityNumberToString,
    location: el.location,
  };

  console.log("initialInputs---------++", initialInputs);

  const [inputs, setInputs] = useState( initialInputs );

  // const { products } = useAppSelector(
  //   (state: { productSlice: ProductState }) => state.productSlice
  // );

  // useEffect(() => {
  //   setInputs(initialInputs)
  // }, [products]);


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
        inputs?.id &&
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
      await dispatch(UpdProduct(inputs));
      onClose();
      setInputs(() => initialInputs);
    }
  };



  return (
    <>
      <Button
        onClick={onOpen}
        // isLoading={user?.isAdmin === true}
        spinner={<p>редактирование записи</p>}
        variant="solid"
        colorScheme="teal"
      >
        Редактировать
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактирование записи в каталоге</ModalHeader>
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
                  colorScheme="teal"
                  onClick={submitHandler}
                >
                  Изменить
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
