const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  const users = [
    {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "123456",
    },
    {
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      password: "123456",
    },
    {
      email: "michael.brown@example.com",
      firstName: "Michael",
      lastName: "Brown",
      password: "123456",
    },
    {
      email: "emily.johnson@example.com",
      firstName: "Emily",
      lastName: "Johnson",
      password: "123456",
    },
    {
      email: "daniel.wilson@example.com",
      firstName: "Daniel",
      lastName: "Wilson",
      password: "123456",
    },
    {
      email: "olivia.martin@example.com",
      firstName: "Olivia",
      lastName: "Martin",
      password: "123456",
    },
    {
      email: "liam.anderson@example.com",
      firstName: "Liam",
      lastName: "Anderson",
      password: "123456",
    },
    {
      email: "sophia.thomas@example.com",
      firstName: "Sophia",
      lastName: "Thomas",
      password: "123456",
    },
    {
      email: "noah.taylor@example.com",
      firstName: "Noah",
      lastName: "Taylor",
      password: "123456",
    },
    {
      email: "ava.moore@example.com",
      firstName: "Ava",
      lastName: "Moore",
      password: "123456",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
