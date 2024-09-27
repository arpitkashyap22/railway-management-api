import { prisma } from '../../server.js';

export const bookSeat = async (req, res) => {
  const { trainId, seatCount } = req.body;
  const userId = req.user.userId;

  try {
    await prisma.$transaction(async (tx) => {
      const train = await tx.train.findUnique({
        where: { id: trainId },
        lock: { mode: 'PESSIMISTIC_WRITE' }
      });

      if (train.availableSeats < seatCount) {
        throw new Error('Not enough seats available');
      }

      await tx.train.update({
        where: { id: trainId },
        data: { availableSeats: train.availableSeats - seatCount }
      });

      await tx.booking.create({
        data: { userId, trainId, seatCount }
      });
    });

    res.json({ message: 'Booking successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });q
  }
};

export const getBookingDetails = async (req, res) => {
  const bookingId = parseInt(req.params.id);
  const userId = req.user.userId;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
    include: { train: true }
  });

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json(booking);
};
