import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CheckoutPage.css';

interface BasketItem {
  id: number;
  userId: number;
  productId: number;
  numberBasket: number;
  status: string;
  commentUser: string;
  totalBasketPrice: number;
  deliveryAddress: string;
  estimatedDate: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  title: string;
  discountRatio: number;
  category: string
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const basketString = searchParams.get('basket');
  // const productString = searchParams.get('product');
  // const basket: Product[] = basketString ? JSON.parse(decodeURIComponent(basketString)) : [];
  // const product: Product | null = productString ? JSON.parse(decodeURIComponent(productString)) : null;// ! эТО ЗДЕСЬ НЕ ПЕРЕЖАЕТСЯ, ТК null
  const deliveryAddress = searchParams.get('address') || '';
  const Details = searchParams.get('Details') || '';
  const deliveryType = searchParams.get('type') || '';
  const deliveryDate = searchParams.get('date') || '';
  // console.log('🌸CheckoutPage=== basket', basket)
  // console.log('🌸CheckoutPage=== basket[0]', basket[0])
  // console.log('🌸CheckoutPage=== basket[0].product', basket[0].product)

  // console.log('🌸CheckoutPage=== productString', productString);
  // console.log('🌸CheckoutPage=== basketString', basketString);

  const [basket, setBasket] = useState<Product[]>([]);
  // const [product, setProduct] = useState<Product | null>(null);

  console.log('🌸CheckoutPage=== basket', basket);
  // console.log('🌸CheckoutPage=== product', product);

  useEffect(() => {
    if (basketString) {
      try {
        const parsedBasket: Product[] = JSON.parse(
          decodeURIComponent(basketString)
        );
        setBasket(parsedBasket);
      } catch (error) {
        console.error('Error parsing basket:', error);
      }
    }
  }, [basketString]);

  useEffect(() => {
    console.log('Данные из URL:', basket, deliveryAddress, Details, deliveryType, deliveryDate);
   }, [basketString, deliveryAddress, Details, deliveryType, deliveryDate]);
   
  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => {
      return total + (item.product.price * item.numberBasket);
    }, 0);
  };


  return (
    <div className="checkout-container">
      <h1>Оформление заказа</h1>
      <div className="order-details">
        <h2>Ваш заказ:</h2>
        {basket.length > 0 ? (
          <ul className="product-list">
            {basket.map(item => (
              <li key={item.id} className="product-item">
                {item.product.title} - {item.numberBasket} шт. - {item.product.price * item.numberBasket} Р
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет выбранного товара</p>
        )}
        <div className="delivery-details">
          <p>Адрес доставки: {deliveryAddress}</p>
        </div>
        <div className="delivery-details1">
          <p>Детали доставки: {Details}</p>
        </div>
        <div className="delivery-details2">
          <p>Тип доставки: {deliveryType}</p>
        </div>
        <div className="delivery-details2">
          <p>Дата доставки: {deliveryDate}</p>
        </div>
        <div className="total-price">
          Общая сумма: {calculateTotalPrice()} Р
        </div>
      </div>
      <form className="checkout-form">
        <label>
          Имя:
          <input type="text" name="name" className="form-input" />
        </label>
        <label>
          Адрес доставки:
          <input type="text" name="address" defaultValue={deliveryAddress} className="form-input" />
        </label>
        <label>
          Email:
          <input type="email" name="email" className="form-input" />
        </label>
        <button type="submit" className="submit-button">Подтвердить заказ</button>
      </form>
    </div>
  );
};
//     <div className="checkout-container">
//       <h1>Оформление заказа</h1>
//       <div className="order-details">
//         <h2>Ваш заказ:</h2>
//         {basket.length > 0 ? (
//           <ul className="product-list">
//             {basket.map((product) => (
//               <li key={product.id} className="product-item">
//                 {product.name} - {product.quantity} шт. -{' '}
//                 {product.price * product.quantity} Р
//               </li>
//             ))}
//           </ul>
//         ) : product ? (
//           <ul className="product-list">
//             <li className="product-item">
//               {product.name} - {product.quantity} шт. -{' '}
//               {product.price * product.quantity} Р
//             </li>
//           </ul>
//         ) : (
//           <p>Нет выбранного товара</p>
//         )}
//         <div className="delivery-details">
//           <p>Адрес доставки: {deliveryAddress}</p>
//         </div>
//         <div className="delivery-details1">
//           <p>Детали доставки: {Details}</p>
//         </div>
//         <div className="delivery-details2">
//           <p>Тип доставки: {deliveryType}</p>
//         </div>
//         <div className="delivery-details2">
//           <p>Дата доставки: {deliveryDate}</p>
//         </div>
//       </div>
//       <form className="checkout-form">
//         <label>
//           Имя:
//           <input type="text" name="name" className="form-input" />
//         </label>
//         <label>
//           Адрес доставки:
//           <input
//             type="text"
//             name="address"
//             defaultValue={deliveryAddress}
//             className="form-input"
//           />
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" className="form-input" />
//         </label>
//         <button type="submit" className="submit-button">
//           Подтвердить заказ
//         </button>
//       </form>
//     </div>
//   );
// };

export default CheckoutPage;
