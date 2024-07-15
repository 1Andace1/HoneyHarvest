import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './basket.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getbasket, AddProduct, deleteProduct } from '../../redux/thunkbasketApp';
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
  estimatedDate: string; 
}

interface IUser {
  id: number;
}

const Basket: React.FC = () => {
  const { user }: { user: IUser } = useAppSelector((state) => state.authSlice);
  const defaultInputs: Omit<Product, 'productId'> = {
    id: 0,
    userId: user.id,
    numberBasket: 1,
    status: "standard",
    commentUser: "",
    totalBasketPrice: 0,
    deliveryAddress: "",
    estimatedDate: "",
  }
  const [inputs, setInputs] = useState<Omit<Product, 'productId'>>(defaultInputs);
  const [baskets, setBaskets] = useState<Product[]>([]);
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
    dispatch(AddProduct(inputs as Product))
      .unwrap()
      .then(() => {
        setInputs(prev => ({ ...prev, commentUser: '', deliveryAddress: '', estimatedDate: '' }));
      })
      .catch((error) => {
        console.error('Ошибка при добавлении продукта:', error);
      });
  };

  const navigate = useNavigate();
  const basketData = useAppSelector((state) => state.basketSlice.basketApp);
  useEffect(() => {
    if (basketData) {
      setBaskets(basketData);
    }
  }, [basketData]);

  useEffect(() => {
    dispatch(getbasket({ userId: Number(user.id) }));
  }, [dispatch, user.id]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      totalBasketPrice: baskets.reduce((total, product) => {
        const productPrice = product?.product?.price || 1;
        const productQuantity = product.numberBasket || 1;
        return total + productQuantity * productPrice;
      }, 0)
    }));
  }, [baskets]);

  const handleOrderAll = () => {
    navigate(`/checkout?basket=${encodeURIComponent(JSON.stringify(baskets))}&address=${encodeURIComponent(inputs.deliveryAddress)}&Details=${encodeURIComponent(inputs.commentUser)}&type=${encodeURIComponent(inputs.status)}&date=${encodeURIComponent(inputs.estimatedDate)}`);
  };

  const handleQuantityChange = (id: number, change: number) => {
    setBaskets(currentBaskets => currentBaskets.map(basket => {
      if (basket.id === id) {
        const newNumberBasket = parseInt(basket.numberBasket) + change;
        return { ...basket, numberBasket: newNumberBasket >= 0 ? newNumberBasket : 0 };
      }
      return basket;
    }));
  };

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

  const handleBuyOne = (product: Product) => {
    navigate(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}&address=${encodeURIComponent(inputs.deliveryAddress)}&Details=${encodeURIComponent(inputs.commentUser)}&type=${encodeURIComponent(inputs.status)}&date=${encodeURIComponent(inputs.estimatedDate)}`);
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
          <Input type="date" name="estimatedDate" value={inputs.estimatedDate} onChange={changeHandler} />
          <Button type="submit">к оформлению</Button>
        </form>
      </div>
    </div>
  );
};

export default Basket;