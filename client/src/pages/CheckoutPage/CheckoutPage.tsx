import React from 'react';
import { useLocation } from 'react-router-dom';
import './CheckoutPage.css';

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
  const productString = searchParams.get('product');
  const basket: Product[] = basketString ? JSON.parse(decodeURIComponent(basketString)) : [];
  const product: Product | null = productString ? JSON.parse(decodeURIComponent(productString)) : null;
  const deliveryAddress = searchParams.get('address') || '';
  const commentUser = searchParams.get('Details') || '';
  const deliveryType = searchParams.get('type') || '';
  const estimatedDate = searchParams.get('date') || '';

  return (
    <div className="checkout-container">
      <h1>Оформление заказа</h1>
      <div className="order-details">
        <h2>Ваш заказ:</h2>
        {basket.length > 0 ? (
          <ul className="product-list">
            {basket.map(product => (
              <li key={product.id} className="product-item">
                {product.name} - {product.quantity} шт. - {product.price * product.quantity} Р
              </li>
            ))}
          </ul>
        ) : product ? (
          <ul className="product-list">
            <li className="product-item">
              {product.name} - {product.quantity} шт. - {product.price * product.quantity} Р
            </li>
          </ul>
        ) : (
          <p>Нет выбранного товара</p>
        )}
        <div className="delivery-details">
          <p>Адрес доставки: {deliveryAddress}</p>
          <p>Детали доставки: {commentUser}</p>
          <p>Тип доставки: {deliveryType}</p>
          <p>Дата доставки: {estimatedDate}</p>
        </div>
      </div>
      <form className="checkout-form">
        <label>
          Имя:
          <input type="text" name="name" className="form-input" required />
        </label>
        <label>
          Адрес доставки:
          <input type="text" name="address" defaultValue={deliveryAddress} className="form-input" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" className="form-input" required />
        </label>
        <button type="submit" className="submit-button">Подтвердить заказ</button>
      </form>
    </div>
  );
};

export default CheckoutPage;