const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const orderSchema = require('../models/washing');

const Order = mongoose.model('Order', orderSchema);

router.get('/api/order', (req, res) => {
  Order.find((err, orders) => {
    if (err) return res.status(404).json({ message: 'krivoy frontend' });
    res.status(200).json(orders);
  });
});

router.post('/api/order', (req, res) => {
  const { surname, name, phone, paymentMethod } = req.body;
  const order = new Order({ surname, name, phone, paymentMethod });
  order.save((err) => {
	if (err) return res.status(404).json({"message": "krivoy frontend"})
	res.status(200).json({ message: 'ya bog' }
  });
});

module.exports = router;
