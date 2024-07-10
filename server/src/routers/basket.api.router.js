const express = require('express');
const router = express.Router();
let basket = {
  id: 1,
  UserId: 123,
  totalBasketPrice: 30,
  deliveryAddress: '123 Main St',
  status: 1,
  comment: 'Please deliver fast',
  createdAt: new Date(),
  updatedAt: new Date()
};

let products = [
  { id: 1, name: 'Product 1', price: 10, quantity: 2 },
  { id: 2, name: 'Product 2', price: 20, quantity: 1 }
];

// Маршрут для получения данных корзины
router.get('/', (req, res) => {
  res.json(basket);
});

// Маршрут для получения продуктов в корзине
router.get('/products', (req, res) => {
  res.json(products);
});

// Маршрут для добавления продукта в корзину
router.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Маршрут для обновления количества продукта в корзине
router.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Маршрут для удаления продукта из корзины
router.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;