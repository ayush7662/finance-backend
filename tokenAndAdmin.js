
require('dotenv').config();
const jwt = require('jsonwebtoken');
const prisma = require('./src/prismaClient'); 
const bcrypt = require('bcryptjs');

async function main() {
 
  let admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });


  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin123", 10); 
    admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
        status: "ACTIVE"
      }
    });
    console.log("✅ Admin user created!");
  } else {
    console.log("✅ Admin user already exists!");
  }

  
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  console.log("\n JWT Token (use this in Postman Authorization header):\n");
  console.log(token);
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); });