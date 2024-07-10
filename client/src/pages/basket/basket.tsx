import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './basket.css'; 

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Basket: React.FC = () => {
  const [basket, setBasket] = useState<Product[]>([
    { id: 1, name: 'мёд 1', price: 10, quantity: 2 },
    { id: 2, name: 'мёд 2', price: 20, quantity: 1 },
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [Details, setDetails] = useState('');
  const [deliveryType, setDeliveryType] = useState('standard');
  const [deliveryDate, setDeliveryDate] = useState('');

  const navigate = useNavigate();

  const handleQuantityChange = (id: number, change: number) => {
    setBasket(prevBasket =>
      prevBasket.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity + change, 1) }
          : product
      )
    );
  };

  const handleRemoveProduct = (id: number) => {
    setBasket(prevBasket => prevBasket.filter(product => product.id !== id));
  };

  const totalPrice = basket.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleOrderAll = () => {
    navigate(`/checkout?basket=${encodeURIComponent(JSON.stringify(basket))}&address=${encodeURIComponent(deliveryAddress)}&Details=${encodeURIComponent(Details)}&type=${encodeURIComponent(deliveryType)}&date=${encodeURIComponent(deliveryDate)}`);
  };

  const handleBuyOne = (product: Product) => {
    navigate(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}&address=${encodeURIComponent(deliveryAddress)}&Details=${encodeURIComponent(Details)}&type=${encodeURIComponent(deliveryType)}&date=${encodeURIComponent(deliveryDate)}`);
  };

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
              <div className="product-info">
                <span>{product.name}</span>
                <span>Р{product.price}</span>
              </div>
              <div className="product-actions">
                <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                <span>{product.quantity}</span>
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
          <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
          <label>Детали доставки:</label>
          <input type="text" value={Details} onChange={(e) => setDetails(e.target.value)} />
          <label>Тип доставки:</label>
          <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
            <option value="standard">Стандартная</option>
            <option value="express">Экспресс</option>
          </select>
          <label>Дата доставки:</label>
          <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
        </form>
      </div>
    </div>
  );
};

export default Basket;