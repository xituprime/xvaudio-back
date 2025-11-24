import express from 'express';
import {testPurchaseController, createPurchase, getMyPurchases} from '../controllers/purchaseController.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

// Ruta de prueba para el controlador de compras
router.get('/test', auth, testPurchaseController);

// Ruta para crear una nueva compra
router.post('/', auth, createPurchase);

// Ruta para obtener las compras del usuario autenticado
router.get('/myPurchases', auth, getMyPurchases);

export default router;