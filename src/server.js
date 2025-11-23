import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.json({ message: "XVAudio API is running" });  
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
// Servir archivos estaticos de la carpeta uploads
app.use("/uploads", express.static("uploads"));

// Rutas de productos
app.use('/api/products', productRoutes);
