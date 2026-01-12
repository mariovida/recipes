import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning database...");

  // Deleting all rows from the Step table
  await prisma.step.deleteMany();
  // Deleting all rows from the Ingredient table
  await prisma.ingredient.deleteMany();
  // Deleting all rows from the Recipe table
  await prisma.recipe.deleteMany();

  console.log("Database cleaned.");
}

main().finally(() => prisma.$disconnect());
