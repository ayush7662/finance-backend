// src/controllers/userController.js
const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, status },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { records: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUsers };