import { prisma } from '../../server.js';

export const createTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await prisma.train.create({
      data: { name, source, destination, totalSeats, availableSeats: totalSeats }
    });
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create train' });
  }
};

export const getAvailableTrains = async (req, res) => {
  const { source, destination } = req.query;
  const trains = await prisma.train.findMany({ where: { source, destination } });
  res.json(trains);
};
