import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './basket.css'; 
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getbasket, AddProduct } from '../../redux/thunkbasketApp';
import OneCard from '../../components/OneCard/OneCard'; 
import { Button, Input, Select } from '@chakra-ui/react';

interface Product {
  id: number;
  userId: number;
  productId: number;
  numberBasket: number;
  status: string;
  commentUser: string;
  totalBasketPrice: number;
  deliveryAddress: string;
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
    deliveryDate: "",
  }
  const [inputs, setInputs] = useState(defaultInputs);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const dispatch = useAppDispatch()

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(AddProduct(inputs));
    setInputs(defaultInputs);
  };

  const navigate = useNavigate();
  const baskets = useAppSelector((state) => state.basketSlice.basketApp) || [];
  if (baskets && baskets.length > 0) {
    // Теперь можно безопасно использовать map, reduce и другие методы массива
  }
console.log(baskets,'я массив бля');


  useEffect(() => {
    dispatch(getbasket({ userId: Number(user.id) }));
  }, [dispatch, user.id]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      totalBasketPrice: baskets.reduce((total, product) => {
        const productPrice = product?.product?.price || 0;
        const productQuantity = product.numberBasket || 0;
        return total + productQuantity * productPrice;
      }, 0)
    }));
  }, [baskets]);

  const handleOrderAll = () => {
    navigate(`/checkout?basket=${encodeURIComponent(JSON.stringify(baskets))}&address=${encodeURIComponent(inputs.deliveryAddress)}&Details=${encodeURIComponent(inputs.commentUser)}&type=${encodeURIComponent(inputs.status)}&date=${encodeURIComponent(inputs.deliveryDate)}`);
  };

  const handleQuantityChange = (id: number, change: number) => {
    setBaskets((currentBaskets) => currentBaskets.map((basket) => {
      if (basket.id === id) {
        const newNumberBasket = basket.numberBasket + change;
        return { ...basket, numberBasket: newNumberBasket >= 0 ? newNumberBasket : 0 };
      }
      return basket;
    }));
  };

  const handleRemoveProduct = (id: number) => {
    setInputs((prev) => ({
      ...prev,
      baskets: prev.baskets.filter((basket) => basket.id !== id),
    }));
  };

  const handleBuyOne = (product: Product) => {
    navigate(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}&address=${encodeURIComponent(inputs.deliveryAddress)}&Details=${encodeURIComponent(inputs.commentUser)}&type=${encodeURIComponent(inputs.status)}&date=${encodeURIComponent(inputs.deliveryDate)}`);
  };

  return (
    <div className="basket-container">
      <div className="basket">
        <button className="order-all-button" onClick={handleOrderAll}>Заказать все</button>
        <div className="total-price">
          Общая сумма: Р{inputs.totalBasketPrice}
        </div>
        <ul className="scrollable-list">
          {baskets.map(basket => (
            <li key={basket.id}>
              <OneCard el={basket.product} />
              <div className="product-actions">
                <button onClick={() => handleQuantityChange(basket.id, -1)}>-</button>
                <span>{basket.numberBasket}</span>
                <button onClick={() => handleQuantityChange(basket.id, 1)}>+</button>
                <button onClick={() => handleRemoveProduct(basket.id)}>убрать</button>
                <button onClick={() => handleBuyOne(basket)}>Купить</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="delivery-form">
        <h2>Адрес и доставка</h2>
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
          <Input type="date" name="deliveryDate" value={inputs.deliveryDate} onChange={changeHandler} />
          <Button type="submit">добавить</Button>
        </form>
      </div>
    </div>
  );
};

export default Basket;