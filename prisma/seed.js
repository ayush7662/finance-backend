const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@finance.local";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@123456";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      name: "System Admin",
    },
    create: {
      email,
      password: passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      name: "System Admin",
    },
  });

  console.log("Seed OK. Default admin login:");
  console.log(`  email:    ${email}`);
  console.log(`  password: ${password}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
