import { prisma } from '../../server.js';

export const bookSeat = async (req, res) => {
    const { trainId, seatCount } = req.body;
    const userId = req.user.userId; // assuming JWT middleware attaches user to req
    
    try {
      // Start a transaction
      const result = await prisma.$transaction(async (prisma) => {
        // 1. Fetch train details inside the transaction
        const train = await prisma.train.findUnique({
          where: { id: trainId }
        });
  
        if (!train) {
          throw new Error('Train not found');
        }
  
        // 2. Check if enough seats are available
        if (train.availableSeats < seatCount) {
          throw new Error('Not enough seats available');
        }
  
        // 3. Update available seats
        const updatedTrain = await prisma.train.update({
          where: { id: trainId },
          data: { availableSeats: train.availableSeats - seatCount }
        });
  
        // 4. Create booking record
        const booking = await prisma.booking.create({
          data: {
            userId: userId,
            trainId: trainId,
            seatCount: seatCount
          }
        });
  
        // Return the booking confirmation
        return booking;
      });
  
      // If transaction succeeds, return the booking
      res.json(result);
    } catch (error) {
      console.error('Booking error:', error.message);
      return res.status(400).json({ error: error.message });
    }
  };

  export const getBookingDetails = async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.userId;
  
    try {
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId, 
          userId: userId, 
        },
        include: {
          train: true, 
        },
      });
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.json(booking);
    } catch (error) {
      console.error('Error fetching booking details:', error.message);
      return res.status(500).json({ error: error.message });
    }
  };