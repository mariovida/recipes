import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.step.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();

  await prisma.recipe.create({
    data: {
      slug: "caesar-salata",
      title: "Caesar salata",
      lead: "Klasična Caesar salata s hrskavom rimskom salatom, domaćim zlatno pečenim krutonima, bogatim kremastim dressingom i svježe naribanim parmezanom.",
      prepTimeMinutes: 20,
      servings: 2,
      difficulty: "lagano",
      mealType: "SALAD",
      method: "bez_kuhanja",
      tags: ["salata", "svjeze"],
      ingredients: {
        create: [
          {
            order: 1,
            text: "1 veća glavica rimske salate, oprana i dobro osušena",
          },
          {
            order: 2,
            text: "50 g krutona (po mogućnosti domaćih, od bijelog kruha)",
          },
          {
            order: 3,
            text: "30 g svježe naribanog parmezana ili Grana Padana",
          },
          {
            order: 4,
            text: "3-4 žlice Caesar dressinga",
          },
          {
            order: 5,
            text: "Svježe mljeveni crni papar po ukusu",
          },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "Rimsku salatu temeljito operite pod mlazom hladne vode, zatim je dobro osušite pomoću centrifuge za salatu ili kuhinjskog papira kako bi ostala hrskava.",
          },
          {
            order: 2,
            text: "Listove salate narežite ili natrgajte rukama na veće komade i stavite ih u veliku zdjelu za salatu.",
          },
          {
            order: 3,
            text: "Dodajte krutone i polovicu naribanog parmezana, pa lagano promiješajte kako bi se sastojci ravnomjerno rasporedili.",
          },
          {
            order: 4,
            text: "Prelijte salatu Caesar dressingom i nježno promiješajte kako bi se listovi salate obložili umakom, pazeći da se ne zgnječe.",
          },
          {
            order: 5,
            text: "Pospite preostalim parmezanom, dodajte malo svježe mljevenog crnog papra po želji i odmah poslužite dok je salata svježa i hrskava.",
          },
        ],
      },
      imageCdnPath: "/images/recipe-placeholder.jpg",
    },
  });

  console.log("Seed complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
