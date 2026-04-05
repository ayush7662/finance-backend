
const prisma = require("../prismaClient");

const getSummary = async () => {
  
  const totalUsers = await prisma.user.count();


  const totalIncome = await prisma.record.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" },
  });

  const totalExpense = await prisma.record.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" },
  });

  return {
    totalUsers,
    totalIncome: totalIncome._sum.amount || 0,
    totalExpense: totalExpense._sum.amount || 0,
    netBalance: (totalIncome._sum.amount || 0) - (totalExpense._sum.amount || 0),
  };
};

module.exports = { getSummary };