import express from 'express';
import Product from '../models/product';
const router = express.Router();

// GET
router.get('/', async (req, res) => {
  try {
    const items = await Product.find();
    res.json({ items, total: items.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
});

export default router;