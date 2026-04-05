
const prisma = require("../prismaClient");

// CREATE RECORD
const createRecord = async (data, userId) => {
  return prisma.record.create({
    data: {
      ...data,
      createdBy: userId, 
    },
  });
};


const getRecords = async (query) => {
  const filters = {};
  if (query.type) filters.type = query.type;
  if (query.category) filters.category = query.category;

  return prisma.record.findMany({
    where: filters,
  });
};

module.exports = { createRecord, getRecords };