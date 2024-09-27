import { Router } from 'express';
import authRoutes from './authRoutes.js';
import trainRoutes from './trainRoutes.js';
import bookingRoutes from './bookingRoutes.js';

const router = Router();

router.use(authRoutes);
router.use(trainRoutes);
router.use(bookingRoutes);

export default router;
