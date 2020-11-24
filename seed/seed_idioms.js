const { prisma } = require("../prisma/generated/prisma-client");
const Papa = require("papaparse");
const fs = require("fs");

async function main() {
  fs.readFile("./IdiomData.csv", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    Papa.parse(data, {
      complete: async function(results) {
        results.data.reduce(async (acc, curr) => {
          const dynasty = await prisma.dynasty({ code: curr[0] });
          // console.log("dynasty", dynasty);
          if (!dynasty) {
            dynasty = await prisma.createDynasty({
              code: curr[0],
              dynastyName: curr[1],
            });
            // console.log("dynasty created", dynasty);
          }
          const idiom = await prisma.createIdiom({
            idiom: curr[2],
            description: curr[3],
            dynasty: { connect: { id: dynasty.id } },
          });
          // console.log("idiom", idiom);
          return acc;
        }, []);
      },
    });
  });
  console.log("Seed idioms successfully!");
}

main().catch((e) => console.error(e));
