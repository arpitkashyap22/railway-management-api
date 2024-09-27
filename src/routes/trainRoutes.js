import { Router } from 'express';
import { createTrain, getAvailableTrains } from '../controllers/trainController.js';
import { adminApiMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/trains', adminApiMiddleware, createTrain);
router.get('/trains', authMiddleware, getAvailableTrains);

export default router;
