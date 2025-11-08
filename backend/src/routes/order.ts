import express from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import validator from 'validator';

const router = express.Router();

// POST /order — создать заказ
router.post('/', async (req, res) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Items must be a non-empty array' });

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length)
      return res.status(400).json({ message: 'One or more products not found' });

    const sum = products.reduce((acc, p) => acc + (p.price || 0), 0);
    if (sum !== total)
      return res.status(400).json({ message: 'Total does not match product prices' });

    if (!['card', 'online'].includes(payment))
      return res.status(400).json({ message: 'Invalid payment type' });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: 'Invalid email' });

    if (!phone || !address)
      return res.status(400).json({ message: 'Phone and address are required' });

    const orderId = faker.string.uuid();

    res.status(201).json({ id: orderId, total });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
});

export default router;
