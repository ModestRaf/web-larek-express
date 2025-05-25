import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server with CORS is working!');
});

app.listen(PORT, () => {
  console.log(`Server with CORS started on http://localhost:${PORT}`);
});
