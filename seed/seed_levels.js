const { prisma } = require("../prisma/generated/prisma-client");
const shuffle = require("../utils/shuffle");

async function main() {
  const dynasties = shuffle(await prisma.dynasties());
  await dynasties.reduce(async (acc, curr) => {
    const index = await acc;
    // console.log("index", index);
    const idioms = await prisma.dynasty({ id: curr.id }).idioms();
    const idiomsIds = shuffle(idioms.map((idiom) => ({ id: idiom.id }))).slice(
      0,
      5
    );
    // console.log("idiomsIds", idiomsIds);
    const level = await prisma.createLevel({
      dynasty: { connect: { id: curr.id } },
      code: index,
      name: `關卡 - ${index}`,
      idioms: { connect: idiomsIds },
    });
    // console.log("level", level);
    acc = index + 1;
    return acc;
  }, 1);
  console.log("Seed levels successfully!");
}

main().catch((e) => console.error(e));
