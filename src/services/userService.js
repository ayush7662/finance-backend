
const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");


const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      status: "ACTIVE",
    },
  });
};


const getUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  });
};

module.exports = { createUser, getUsers };