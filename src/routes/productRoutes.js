import express from 'express';
import { upload } from '../middlewares/upload.js';

import{
    testProductController,
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Ruta de prueba del controlador de productos
router.get('/test', testProductController);

// Crear producto con subida de imagenes
router.post('/', upload.array('images', 10), createProduct); // Maximo 10 imagenes

// Listar productos
router.get('/', getProducts);

// Obtener producto por ID
router.get('/:id', getProductById);

// Actualizar producto con subida de imagenes
router.put('/:id', upload.array('images', 10), updateProduct);

// Eliminar producto
router.delete('/:id', deleteProduct);

export default router;