import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import productRouter from './routes/product';
import orderRouter from './routes/order';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Подключение к MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/weblarek')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Роуты
app.use('/product', productRouter);
app.use('/order', orderRouter);

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Server with CORS is working!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
