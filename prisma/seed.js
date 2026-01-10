import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, Method, Difficulty } from "@prisma/client";

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
      slug: "varivo-od-krumpira",
      title: "Varivo od krumpira",
      lead: "Jednostavno i toplo domaće varivo od krumpira, mrkve i lagane zaprške - savršeno za brz i ukusan ručak.",
      prepTimeMinutes: 50,
      servings: 4,
      difficulty: "lagano",
      mealType: "varivo",
      method: "kuhanje",
      tags: ["domace", "varivo", "brzo"],
      ingredients: {
        create: [
          { order: 1, text: "600 g krumpira" },
          { order: 2, text: "1 veći luk" },
          { order: 3, text: "2 mrkve" },
          { order: 4, text: "2 žlice ulja" },
          { order: 5, text: "1 žličica slatke paprike" },
          { order: 6, text: "1 lovorov list" },
          { order: 7, text: "1 žlica brašna" },
          { order: 8, text: "800 ml vode ili temeljca" },
          { order: 9, text: "sol i papar po ukusu" },
          { order: 10, text: "malo svježeg peršina" },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "Ogulite krumpir, mrkvu i luk. Luk sitno nasjeckajte, mrkvu narežite na kolutiće ili polukolutiće, a krumpir na srednje velike kockice.",
          },
          {
            order: 2,
            text: "U većem loncu zagrijte ulje na srednjoj vatri. Dodajte nasjeckani luk i pirjajte ga uz povremeno miješanje dok ne omekša i postane staklast.",
          },
          {
            order: 3,
            text: "Dodajte narezanu mrkvu i nastavite kratko pirjati nekoliko minuta, dok mrkva lagano ne omekša i pusti aromu.",
          },
          {
            order: 4,
            text: "Maknite lonac na trenutak s vatre, dodajte slatku papriku i brzo promiješajte kako paprika ne bi zagorjela.",
          },
          {
            order: 5,
            text: "U lonac dodajte krumpir i lovorov list, zatim sve podlijte vodom ili temeljcem toliko da povrće bude prekriveno. Pustite da zavrije.",
          },
          {
            order: 6,
            text: "Kuhajte varivo na umjerenoj vatri oko 20 minuta, dok krumpir ne omekša, ali zadrži oblik.",
          },
          {
            order: 7,
            text: "U manjoj tavi pripremite laganu zapršku: na malo ulja kratko popržite brašno dok ne dobije svijetlo zlatnu boju, zatim je umiješajte u varivo uz stalno miješanje.",
          },
          {
            order: 8,
            text: "Kuhajte još 5 minuta da se varivo zgusne, začinite solju i paprom po ukusu te na kraju pospite svježim nasjeckanim peršinom.",
          },
        ],
      },

      imageCdnPath: "/recipes/varivo-od-krumpira/image.jpg",
    },
  });

  await prisma.recipe.create({
    data: {
      slug: "chocolate-cake",
      title: "Čokoladni kolač",
      lead: "Sočan i bogat čokoladni kolač intenzivnog okusa, savršen za posebne prilike, obiteljska slavlja ili kad vam se jednostavno jede nešto slatko.",
      prepTimeMinutes: 90,
      servings: 8,
      difficulty: Difficulty.srednje_zahtjevno,
      mealType: "desert",
      method: Method.pecenje,
      tags: ["cokolada", "kolac", "slatko"],
      ingredients: {
        create: [
          {
            order: 1,
            text: "200 g glatkog pšeničnog brašna",
          },
          {
            order: 2,
            text: "50 g kvalitetnog kakaa u prahu",
          },
          {
            order: 3,
            text: "150 g šećera",
          },
          {
            order: 4,
            text: "1 prašak za pecivo",
          },
          {
            order: 5,
            text: "Prstohvat soli",
          },
          {
            order: 6,
            text: "2 jaja, sobne temperature",
          },
          {
            order: 7,
            text: "100 ml mlijeka",
          },
          {
            order: 8,
            text: "100 ml biljnog ulja ili otopljenog maslaca",
          },
          {
            order: 9,
            text: "1 žličica ekstrakta vanilije (po želji)",
          },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "Zagrijte pećnicu na 180 °C (gornje i donje grijanje) te pripremite kalup za pečenje tako da ga premažete maslacem i lagano pobrašnite ili obložite papirom za pečenje.",
          },
          {
            order: 2,
            text: "U većoj zdjeli pomiješajte brašno, kakao u prahu, prašak za pecivo, sol i šećer, te dobro izmiješajte kako bi se suhi sastojci ravnomjerno rasporedili.",
          },
          {
            order: 3,
            text: "U drugoj zdjeli umutite jaja, zatim dodajte mlijeko, ulje ili otopljeni maslac i ekstrakt vanilije, pa kratko izmiješajte.",
          },
          {
            order: 4,
            text: "Postupno dodajte mokre sastojke u suhe i lagano miješajte pjenjačom ili kuhačom dok ne dobijete glatku smjesu bez grudica.",
          },
          {
            order: 5,
            text: "Smjesu izlijte u pripremljeni kalup i poravnajte površinu.",
          },
          {
            order: 6,
            text: "Pecite kolač u prethodno zagrijanoj pećnici oko 30-35 minuta, odnosno dok čačkalica umetnuta u sredinu kolača ne izađe čista.",
          },
          {
            order: 7,
            text: "Pečeni kolač ostavite da se kratko ohladi u kalupu, zatim ga izvadite i potpuno ohladite na rešetki prije posluživanja.",
          },
        ],
      },
      imageCdnPath: "/recipes/chocolate-cake/image.jpg",
    },
  });

  await prisma.recipe.create({
    data: {
      slug: "spaghetti-bolognese",
      title: "Spaghetti Bolognese",
      lead: "Klasični talijanski špageti u bogatom umaku od mljevene junetine, rajčice i aromatičnog povrća, savršeni za obiteljski ručak ili večeru.",
      prepTimeMinutes: 45,
      servings: 4,
      difficulty: "lagano",
      mealType: "tjestenina",
      method: "kuhanje",
      tags: ["pasta", "italian", "klasik"],
      ingredients: {
        create: [
          {
            order: 1,
            text: "300 g špageta od durum pšenice",
          },
          {
            order: 2,
            text: "250 g mljevene junetine",
          },
          {
            order: 3,
            text: "1 manji luk, sitno nasjeckan",
          },
          {
            order: 4,
            text: "1 češanj češnjaka, sitno nasjeckan",
          },
          {
            order: 5,
            text: "400 ml pasirane rajčice ili kvalitetnog umaka od rajčice",
          },
          {
            order: 6,
            text: "2 žlice maslinovog ulja",
          },
          {
            order: 7,
            text: "Sol i svježe mljeveni crni papar po ukusu",
          },
          {
            order: 8,
            text: "Prstohvat suhog origana ili bosiljka",
          },
          {
            order: 9,
            text: "Svježe naribani parmezan za posluživanje",
          },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "U velikom loncu zakuhajte obilnu količinu posoljene vode i skuhajte špagete prema uputama na pakiranju dok ne budu al dente.",
          },
          {
            order: 2,
            text: "Dok se tjestenina kuha, u širokoj tavi zagrijte maslinovo ulje na srednje jakoj vatri te dodajte nasjeckani luk i kratko pirjajte dok ne postane staklast.",
          },
          {
            order: 3,
            text: "Dodajte mljevenu junetinu i pržite uz miješanje dok meso ne dobije lijepu zlatnosmeđu boju i ne ispari višak tekućine.",
          },
          {
            order: 4,
            text: "Umiješajte češnjak i kratko ga popržite, zatim dodajte pasiranu rajčicu, sol, papar i suhe začine.",
          },
          {
            order: 5,
            text: "Smanjite vatru i pustite da se umak lagano krčka 15-20 minuta, povremeno miješajući, dok se okusi ne povežu i umak lagano zgusne.",
          },
          {
            order: 6,
            text: "Ocijedite špagete i dodajte ih izravno u umak ili ih poslužite s umakom preko tjestenine, prema želji.",
          },
          {
            order: 7,
            text: "Poslužite toplo, posuto svježe naribanim parmezanom i po želji s malo svježeg bosiljka.",
          },
        ],
      },
      imageCdnPath: "/recipes/spaghetti-bolognese/image.jpg",
    },
  });

  await prisma.recipe.create({
    data: {
      slug: "caesar-salata",
      title: "Caesar salata",
      lead: "Klasična Caesar salata s hrskavom rimskom salatom, domaćim zlatno pečenim krutonima, bogatim kremastim dressingom i svježe naribanim parmezanom.",
      prepTimeMinutes: 20,
      servings: 2,
      difficulty: "lagano",
      mealType: "salata",
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
      imageCdnPath: "/recipes/caesar-salata/image.jpg",
    },
  });

  await prisma.recipe.create({
    data: {
      slug: "kolac-od-jabuka",
      title: "Kolač od jabuka",
      lead: "Mirisni domaći kolač od jabuka s mekanim biskvitom i blagim notama cimeta, savršen uz šalicu kave ili čaja.",
      prepTimeMinutes: 75,
      servings: 8,
      difficulty: Difficulty.srednje_zahtjevno,
      mealType: "desert",
      method: Method.pecenje,
      tags: ["jabuke", "kolac", "slatko"],
      ingredients: {
        create: [
          {
            order: 1,
            text: "250 g glatkog pšeničnog brašna",
          },
          {
            order: 2,
            text: "150 g šećera",
          },
          {
            order: 3,
            text: "1 prašak za pecivo",
          },
          {
            order: 4,
            text: "Prstohvat soli",
          },
          {
            order: 5,
            text: "2 jaja, sobne temperature",
          },
          {
            order: 6,
            text: "100 ml mlijeka",
          },
          {
            order: 7,
            text: "100 ml biljnog ulja ili otopljenog maslaca",
          },
          {
            order: 8,
            text: "3 srednje velike jabuke, oguljene i naribane",
          },
          {
            order: 9,
            text: "1 žličica mljevenog cimeta",
          },
          {
            order: 10,
            text: "Šećer u prahu za posipanje (po želji)",
          },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "Zagrijte pećnicu na 180 °C te pripremite kalup za pečenje tako da ga premažete maslacem i pobrašnite ili obložite papirom za pečenje.",
          },
          {
            order: 2,
            text: "U većoj zdjeli pomiješajte brašno, prašak za pecivo, sol i šećer.",
          },
          {
            order: 3,
            text: "U drugoj zdjeli umutite jaja, dodajte mlijeko i ulje ili otopljeni maslac te kratko izmiješajte.",
          },
          {
            order: 4,
            text: "Mokre sastojke postupno dodajte u suhe i lagano miješajte dok ne dobijete glatku smjesu.",
          },
          {
            order: 5,
            text: "Umiješajte naribane jabuke i cimet te kratko promiješajte kako bi se ravnomjerno rasporedili u smjesi.",
          },
          {
            order: 6,
            text: "Smjesu izlijte u pripremljeni kalup i poravnajte površinu.",
          },
          {
            order: 7,
            text: "Pecite kolač 35-40 minuta, dok ne dobije zlatnosmeđu boju i čačkalica umetnuta u sredinu ne izađe čista.",
          },
          {
            order: 8,
            text: "Pečeni kolač ostavite da se kratko ohladi, a prije posluživanja ga po želji pospite šećerom u prahu.",
          },
        ],
      },
      imageCdnPath: "/recipes/kolac-od-jabuka/image.jpg",
    },
  });

  await prisma.recipe.create({
    data: {
      slug: "leskovacka-muckalica",
      title: "Leskovačka mućkalica",
      lead: "Tradicionalno jelo snažnog okusa, nastalo kao savršen način da se iskoriste sočni komadi pečenog mesa s roštilja. Priprema se s bogatom kombinacijom luka, pečenih paprika, rajčice i aromatičnih začina, a dugim laganim krčkanjem svi se sastojci povezuju u gusto, mirisno i pikantno jelo.",
      prepTimeMinutes: 60,
      servings: 4,
      difficulty: "srednje_zahtjevno",
      mealType: "varivo",
      method: "kuhanje",
      tags: ["muckalica", "varivo"],
      ingredients: {
        create: [
          { order: 1, text: "4 odreska svinjskog vrata" },
          { order: 2, text: "malo soli" },
          { order: 3, text: "2 luka" },
          { order: 4, text: "malo ulja" },
          { order: 5, text: "4 pečene crvene paprike" },
          { order: 6, text: "200 g Podravka Passate" },
          { order: 7, text: "2-3 češnja češnjaka" },
          { order: 8, text: "2 lista lovora" },
          { order: 9, text: "malo crnog papra" },
          { order: 10, text: "1 žličica ljute paprike" },
          { order: 11, text: "2 žličice slatke paprike" },
          { order: 12, text: "1 žlica nasjeckanog peršina" },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "Meso posoliti (po želji i lagano začiniti vegetom), narezati najprije na deblje odreske, a zatim na srednje velike kocke.",
          },
          {
            order: 2,
            text: "Meso ispeći na roštilju ili grill tavi dok ne dobije lijepu boju. Najbolje je peći ga na ražnjićima, a nakon pečenja skinuti sa štapića. Po želji se meso može omotati slaninom ili slaninu posebno ispeći i kasnije dodati.",
          },
          {
            order: 3,
            text: "Dok se meso peče, luk sitno nasjeckati i utrljati s 2 žlice soli kako bi omekšao i izgubio ljutinu.",
          },
          {
            order: 4,
            text: "Na malo ulja dinstati luk na srednjoj vatri uz stalno miješanje. Po potrebi dodavati malo tople vode kako ne bi zagorio, dok se potpuno ne rastopi i postane staklast.",
          },
          {
            order: 5,
            text: "Dodati narezane pečene crvene paprike, pasiranu rajčicu (passatu) i sitno nasjeckani češnjak. Sve zajedno kratko dinstati.",
          },
          {
            order: 6,
            text: "Kuhati dok višak tekućine ne ispari i povrće se ne poveže u gušću smjesu.",
          },
          {
            order: 7,
            text: "U smjesu dodati pečeno meso, lovorov list i malo vode. Lagano krčkati na tihoj vatri dok se povrće ne pretvori u kompaktnu, gustu masu.",
          },
          {
            order: 8,
            text: "Začiniti slatkom i ljutom paprikom, crnim paprom i po potrebi dodatno posoliti. Kuhati još nekoliko minuta uz povremeno miješanje.",
          },
          {
            order: 9,
            text: "Na kraju umiješati nasjeckani peršin, maknuti s vatre i ostaviti da kratko odstoji prije posluživanja.",
          },
        ],
      },

      imageCdnPath: "/recipes/leskovacka-muckalica/image.jpg",
    },
  });

  await prisma.recipe.create({
    data: {
      slug: "piletina-na-paprici",
      title: "Piletina na paprici",
      lead: "Klasično domaće jelo s mekanim komadima piletine, bogatim umakom od paprike i kiselog vrhnja - savršeno za ručak uz rižu ili tjesteninu.",
      prepTimeMinutes: 45,
      servings: 4,
      difficulty: "srednje_zahtjevno",
      mealType: "meso",
      method: "kuhanje",
      tags: ["domace", "paprika", "comfort-food"],
      ingredients: {
        create: [
          { order: 1, text: "500 g pilećeg filea" },
          { order: 2, text: "1 veći luk" },
          { order: 3, text: "2 žlice ulja" },
          { order: 4, text: "1 crvena paprika" },
          { order: 5, text: "1 žlica slatke paprike" },
          { order: 6, text: "1/2 žličice dimljene paprike" },
          { order: 7, text: "200 ml pilećeg temeljca" },
          { order: 8, text: "150 ml kiselog vrhnja" },
          { order: 9, text: "sol i papar po ukusu" },
          { order: 10, text: "1 žlica nasjeckanog peršina" },
        ],
      },
      steps: {
        create: [
          {
            order: 1,
            text: "Pileći file narežite na manje, podjednake komade. Lagano ih posolite i popaprite te ostavite sa strane.",
          },
          {
            order: 2,
            text: "Luk sitno nasjeckajte. U većoj tavi ili loncu zagrijte ulje na srednjoj vatri i pirjajte luk uz povremeno miješanje dok ne omekša i postane staklast.",
          },
          {
            order: 3,
            text: "Dodajte komade piletine u luk i kratko ih pržite sa svih strana dok ne dobiju laganu zlatnu boju.",
          },
          {
            order: 4,
            text: "Maknite posudu na trenutak s vatre, dodajte slatku i dimljenu papriku te brzo promiješajte kako paprika ne bi zagorjela.",
          },
          {
            order: 5,
            text: "Dodajte narezanu crvenu papriku, sve dobro promiješajte i podlijte pilećim temeljcem.",
          },
          {
            order: 6,
            text: "Kuhajte na laganoj vatri oko 20 minuta, povremeno miješajući, dok piletina ne omekša i umak se lagano ne zgusne.",
          },
          {
            order: 7,
            text: "Umiješajte kiselo vrhnje, smanjite vatru i kuhajte još 5 minuta, pazeći da umak ne zavrije.",
          },
          {
            order: 8,
            text: "Po potrebi dodatno začinite solju i paprom, pospite nasjeckanim peršinom i poslužite toplo.",
          },
        ],
      },

      imageCdnPath: "/recipes/piletina-na-paprici/image.jpg",
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
