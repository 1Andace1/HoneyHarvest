// src/pages/CheckoutPage/CheckoutPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const basketString = searchParams.get('basket');
  const basket: Product[] = basketString ? JSON.parse(decodeURIComponent(basketString)) : [];
  const deliveryAddress = searchParams.get('address') || '';
  const deliveryType = searchParams.get('type') || '';
  const deliveryDate = searchParams.get('date') || '';

  return (
    <div>
      <h1>Оформление заказа</h1>
      <div>
        <h2>Ваш заказ:</h2>
        <ul>
          {basket.map(product => (
            <li key={product.id}>
              {product.name} - {product.quantity} шт. - {product.price * product.quantity} Р
            </li>
          ))}
        </ul>
        <h2>Детали доставки:</h2>
        <p>Адрес доставки: {deliveryAddress}</p>
        <p>Тип доставки: {deliveryType}</p>
        <p>Дата доставки: {deliveryDate}</p>
      </div>
      <form>
        <label>
          Имя:
          <input type="text" name="name" />
        </label>
        <label>
          Адрес доставки:
          <input type="text" name="address" defaultValue={deliveryAddress} />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <button type="submit">Подтвердить заказ</button>
      </form>
    </div>
  );
};

export default CheckoutPage;