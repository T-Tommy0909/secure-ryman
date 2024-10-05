import { prisma } from "../src/server/utils/prisma";

export const createLessonTagSeed = async () => {
  await prisma.lessonTag.createMany({
    data: [
      {
        name: "パスワード",
      },
      {
        name: "基本的対策",
      },
    ],
    skipDuplicates: true,
  });
};
