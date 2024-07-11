import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './basket.css'; 
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getbasket, AddProduct } from '../../redux/thunkbasketApp';
import OneCard from '../../components/OneCard/OneCard'; // Путь к вашему компоненту OneCard
import { Button, Input, Select } from '@chakra-ui/react';

interface Product {
  id: number;
  userId: number;
  productId: number;
  numberBasket: number;
  status: number;
  commentUser: string;
  totalBasketPrice: number;
  deliveryAddress: string;
}



const Basket: React.FC = () => {
  const { user }: { user: IUser } = useAppSelector((state) => state.authSlice);
  const defaultInputs = {
  id: "",
  userId: user.id,
  // productId: "",
  numberBasket: "",
  status: "",
  commentUser: "",
  totalBasketPrice: "",
  deliveryAddress: "",
  }
const [inputs, setInputs] = useState(defaultInputs);
const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

console.log(inputs);

  };
  const dispatch = useAppDispatch()

  const submitHandler = async (e): Promise<void> => {
    console.log("зашли в submitHandler, inputs = ", inputs);
    e.preventDefault();
    dispatch(AddProduct(inputs))
    setInputs(() => defaultInputs)
  };
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [Details, setDetails] = useState('');
  const [deliveryType, setDeliveryType] = useState('standard');
  const [deliveryDate, setDeliveryDate] = useState('');

  const navigate = useNavigate();
  const basket = useAppSelector((state) => state.basketSlice.basketApp);

  useEffect(() => {
    dispatch(getbasket());
  }, [dispatch]);

  const handleOrderAll = () => {
    navigate(`/checkout?basket=${encodeURIComponent(JSON.stringify(basket))}&address=${encodeURIComponent(deliveryAddress)}&Details=${encodeURIComponent(Details)}&type=${encodeURIComponent(deliveryType)}&date=${encodeURIComponent(deliveryDate)}`);
  };

  const handleQuantityChange = (id: number, change: number) => {
  };

  const handleRemoveProduct = (id: number) => {
  };

  const handleBuyOne = (product: Product) => {
    navigate(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}&address=${encodeURIComponent(deliveryAddress)}&Details=${encodeURIComponent(Details)}&type=${encodeURIComponent(deliveryType)}&date=${encodeURIComponent(deliveryDate)}`);
  };

  const totalPrice = basket.reduce((total, product) => total + product.numberBasket * (product.price || 0), 0);

  return (
    <div className="basket-container">
      <div className="basket">
        <button className="order-all-button" onClick={handleOrderAll}>Заказать все</button>
        <div className="total-price">
          Общая сумма: Р{totalPrice}
        </div>
        <ul className="scrollable-list">
          {basket.map(product => (
            <li key={product.id}>
              <OneCard el={product} />
              <div className="product-actions">
                <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                <span>{product.numberBasket}</span>
                <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                <button onClick={() => handleRemoveProduct(product.id)}>убрать</button>
                <button onClick={() => handleBuyOne(product)}>Купить</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="delivery-form">
        <h2>Адрес и доставка</h2>
        <form>
          <label>Адрес доставки:</label>
          {/* <input type="text" name="deliveryAddress" value={deliveryAddress} onChange={(e) => changeHandler(e.target.value)} /> */}
          <Input name="deliveryAddress" value={inputs.deliveryAddress} onChange={changeHandler} />
          <label>Детали доставки:</label>
          <Input name="commentUser" value={inputs.commentUser} onChange={changeHandler} />
          <label>Тип доставки:</label>
          <Select name="status" value={inputs.status} onChange={changeHandler}>
            <option  value="standard">Стандартная</option>
            <option  value="express">Экспресс</option>
          </Select>
          <label>Дата доставки:</label>
          <Input type="date" name="deliveryDate" value={inputs.deliveryDate} onChange={changeHandler} />
        </form>
        {/* <button onClick={() => submitHandler()}>Купить</button> */}
        <Button type="submit" onClick={(e) => submitHandler(e)}>добавить</Button>
      </div>
    </div>
  );
};

export default Basket;