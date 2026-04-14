const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  const users = [
    {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "Pass123",
    },
    {
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      password: "Pass123",
    },
    {
      email: "michael.brown@example.com",
      firstName: "Michael",
      lastName: "Brown",
      password: "Pass123",
    },
    {
      email: "emily.johnson@example.com",
      firstName: "Emily",
      lastName: "Johnson",
      password: "Pass123",
    },
    {
      email: "daniel.wilson@example.com",
      firstName: "Daniel",
      lastName: "Wilson",
      password: "Pass123",
    },
    {
      email: "olivia.martin@example.com",
      firstName: "Olivia",
      lastName: "Martin",
      password: "Pass123",
    },
    {
      email: "liam.anderson@example.com",
      firstName: "Liam",
      lastName: "Anderson",
      password: "Pass123",
    },
    {
      email: "sophia.thomas@example.com",
      firstName: "Sophia",
      lastName: "Thomas",
      password: "Pass123",
    },
    {
      email: "noah.taylor@example.com",
      firstName: "Noah",
      lastName: "Taylor",
      password: "Pass123",
    },
    {
      email: "ava.moore@example.com",
      firstName: "Ava",
      lastName: "Moore",
      password: "Pass123",
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
