import { prisma } from "../src/server/utils/prisma";

export const createPartSeed = async () => {
  await prisma.part.createMany({
    data: [
      {
        name: "Part 1 基本的対策",
      },
      {
        name: "Part 2 従業員としての対策",
      },
      {
        name: "Part 3 組織としての対策",
      },
    ],
    skipDuplicates: true,
  });
};
