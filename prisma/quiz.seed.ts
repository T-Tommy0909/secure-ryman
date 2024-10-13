import { prisma } from "../src/server/utils/prisma";

export const createQuizSeed = async () => {
  await prisma.quiz.createMany({
    data: [
      {
        text: "安全なパスワードの条件として、正しくないものはどれですか？",
        lessonId: 1,
      },
    ],
    skipDuplicates: true,
  });
};
