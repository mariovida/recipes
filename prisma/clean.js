import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning database...");

  await prisma.step.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();

  console.log("Database cleaned.");
}

main().finally(() => prisma.$disconnect());
