
const prisma = require("../prismaClient");

const getSummary = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalRecords = await prisma.record.count();

    const income = await prisma.record.aggregate({
      _sum: { amount: true },
      where: { type: "INCOME" },
    });

    const expense = await prisma.record.aggregate({
      _sum: { amount: true },
      where: { type: "EXPENSE" },
    });

    res.json({
      totalUsers,
      totalRecords,
      totalIncome: income._sum.amount || 0,
      totalExpense: expense._sum.amount || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSummary };