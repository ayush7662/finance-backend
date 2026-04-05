
const prisma = require("../prismaClient");


const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, createdBy } = req.body;

    if (amount == null || !type || !category || !date || !createdBy)
      return res.status(400).json({
        message: "amount, type, category, date, and createdBy are required",
      });

    const record = await prisma.record.create({
      data: {
        amount,
        type,
        category,
        date: new Date(date),
        createdBy,
      },
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRecord, getRecords };