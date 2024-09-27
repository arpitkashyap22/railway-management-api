import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { bookSeat, getBookingDetails } from '../controllers/bookingController.js';
const router = Router();

router.post('/book', authMiddleware, bookSeat);
router.get('/bookings/:id', authMiddleware, getBookingDetails);

export default router;
