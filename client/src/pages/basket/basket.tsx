import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './basket.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getbasket, AddProduct, deleteProduct } from '../../redux/thunkbasketApp';
import OneCard from '../../components/OneCard/OneCard';
import { Button, Input, Select } from '@chakra-ui/react';
   //  @ts-ignore
import Modal from 'react-modal';

interface Product {
  product:productType;
  id: number;
  userId: number;
  productId: number;
  numberBasket: number;
  status: string;
  commentUser: string;
  totalBasketPrice: number;
  deliveryAddress: string;
  estimatedDate: string; 
}
interface productType{
  availableQuantity:number;
category:string;
createdAt:string;
description: string;
discountRatio: number;
id: number;
location:string;
picture: string;
price: number;
sort: string;
starsRating:number ;
title: string;
updatedAt:string ;
yearOfHarvest: number;
productId:number;

}
interface IUser {
  id: number;
}

const Basket: React.FC = () => {
  const { user }: { user: IUser } = useAppSelector((state) => state.authSlice);
  const defaultInputs = {
    id: 0,
    userId: user.id,
    numberBasket: 1,
    status: "standard",
    commentUser: "",
    totalBasketPrice: 0,
    deliveryAddress: "",
    estimatedDate: "",
  }
  const [inputs, setInputs] = useState(defaultInputs);
  const [baskets, setBaskets] = useState<Product[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.deliveryAddress || !inputs.estimatedDate) {
      console.error('Необходимо заполнить все поля формы.');
      return;
    }
    //@ts-ignore
    dispatch(AddProduct(inputs))
      .unwrap()
      .then(() => {
        setInputs(prev => ({ ...prev, commentUser: '', deliveryAddress: '', estimatedDate: '' }));
        setBaskets([]); 
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении продукта:', error);
      });
  };


  // const navigate = useNavigate();
   //@ts-ignore
  const basketData: Product[] = useAppSelector((state) => state.basketSlice.basketApp);
  useEffect(() => {
    if (basketData) {
      setBaskets(basketData);
    }
  }, [basketData]);

  useEffect(() => {
    dispatch(getbasket({
      userId: Number(user.id),
      productId: 0,
      numberBasket: 0,
      status: "",
      commentUser: "",
      totalBasketPrice: 0,
      deliveryAddress: "",
      estimatedDate: 0,
    }));
  }, [dispatch, user.id]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      totalBasketPrice: baskets.reduce((total, product) => {
        const productPrice = product?.product?.price || 1;
        const productQuantity = product.numberBasket || 1;
        return total + productQuantity * productPrice / 10;
      }, 0)
    }));
  }, [baskets]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleOrderAll = () => {
  //   navigate(`/checkout?basket=${encodeURIComponent(JSON.stringify(baskets))}&address=${encodeURIComponent(inputs.deliveryAddress)}&Details=${encodeURIComponent(inputs.commentUser)}&type=${encodeURIComponent(inputs.status)}&date=${encodeURIComponent(inputs.estimatedDate)}`);
  //   setBaskets([]);
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleQuantityChange = (id: number, change: number) => {
  //   setBaskets(currentBaskets => currentBaskets.map(basket => {
  //     if (basket.id === id) {
  //       const newNumberBasket = basket.numberBasket + change;
  //       return { ...basket, numberBasket: newNumberBasket > 0 ? newNumberBasket : 1 };
  //     }
  //     return basket;
  //   }));
  // };

  const handleRemoveProduct = (id: number) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        setBaskets((currentBaskets) => currentBaskets.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error('Ошибка при удалении продукта:', error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleBuyOne = (product: Product) => {
  //   navigate(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}&address=${encodeURIComponent(inputs.deliveryAddress)}&Details=${encodeURIComponent(inputs.commentUser)}&type=${encodeURIComponent(inputs.status)}&date=${encodeURIComponent(inputs.estimatedDate)}`);
  // };

  return (
    <div className="basket-container">
      <div className="basket">
        <div className="total-price">
          Общая сумма: ₽{inputs.totalBasketPrice}
        </div>
        <ul className="scrollable-list">
          {baskets.map(basket => (
            <li key={basket.id}>
              <div className="one-card-container animate__animated animate__fadeInDown">
                <OneCard el={basket.product} />
              </div>
              <div className="product-actions animate__animated animate__fadeInDown">
                <Button colorScheme="green" onClick={() => handleRemoveProduct(basket.id)}>убрать</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="delivery-form">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <h1>оформление заказа</h1>
        <form onSubmit={submitHandler}>
          <label>Адрес доставки:</label>
          <Input name="deliveryAddress" value={inputs.deliveryAddress} onChange={changeHandler} />
          <label>Детали доставки:</label>
          <Input name="commentUser" value={inputs.commentUser} onChange={changeHandler} />
          <label>Тип доставки:</label>
          <Select name="status" value={inputs.status} onChange={changeHandler}>
            <option value="standard">Стандартная</option>
            <option value="express">Экспресс</option>
          </Select>
          <label>Дата доставки:</label>
          <Input type="date" name="estimatedDate" value={inputs.estimatedDate} onChange={changeHandler} />
          <Button type="submit" className="submit-button" colorScheme="green">оформить</Button>
          <div className="bee-background">
            <div className="sun"></div>
            <div className="cloud"></div>
            <div className="cloud" style={{ left: '50%', top: '30%' }}></div>
            <div className="grass"></div>
            <div className="flower"></div>
            <div className="flower" style={{ left: '20%' }}></div>
            <div className="flower" style={{ left: '30%' }}></div>
            <div className="hive"></div>
            <div className="bee">
              <div className="wing"></div>
              <div className="eye"></div>
              <div className="stinger"></div>
              <div className="leg"></div>
              <div className="leg"></div>
              <div className="leg"></div>
              <div className="leg"></div>
            </div>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Заказ принят"
        style={{
          content: {
            width: '500px', 
            height: '200px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h1>Ваш заказ принят</h1>
        <button onClick={() => setModalIsOpen(false)}><h2>закрыть</h2></button>
      </Modal>
    </div>
  );
};

export default Basket;