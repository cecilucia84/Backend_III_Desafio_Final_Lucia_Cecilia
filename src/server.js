import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor arriba en http://localhost:${PORT}`);
});