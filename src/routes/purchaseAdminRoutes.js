import express from 'express';
import { testPurchaseAdminController, getPendingPurchases, approvePurchase, cancelPurchase } from '../controllers/purchaseAdminController.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Ruta de prueba para el administrador de compras
router.get('/test', auth, isAdmin, testPurchaseAdminController);

// Ruta pendiente de aprobacion de compras
router.get('/pending', auth, isAdmin, getPendingPurchases);

// Ruta para aprobar una compra
router.post('/approve/:purchaseId', auth, isAdmin, approvePurchase);

// Ruta para cancelar una compra
router.post('/cancel/:purchaseId', auth, isAdmin, cancelPurchase);

export default router;