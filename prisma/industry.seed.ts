import { prisma } from "../src/server/utils/prisma";

export const createIndustrySeed = async () => {
  await prisma.industry.createMany({
    data: [
      {
        name: "製造業",
      },
      {
        name: "運送業",
      },
      {
        name: "電気工事業",
      },
    ],
    skipDuplicates: true,
  });
};
