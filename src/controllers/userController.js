// src/controllers/userController.js
const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role || !status)
      return res.status(400).json({ message: "name, email, password, role, and status are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, status },
    });

    const { password: _p, ...safe } = user;
    res.status(201).json(safe);
  } catch (err) {
    if (err.code === "P2002")
      return res.status(409).json({ message: "Email already registered" });
    res.status(500).json({ error: err.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        records: true,
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUsers };