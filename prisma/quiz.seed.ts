import { prisma } from "../src/server/utils/prisma";

export const createQuizSeed = async () => {
  await prisma.quiz.createMany({
    data: [
      {
        text: "安全なパスワードの条件として、正しくないものはどれですか？",
        lessonId: 1,
      },
      {
        text: "メール本文に含まれるリンクについて、正しい対応は次のうちどれですか？",
        lessonId: 2,
      },
      {
        text: "未知の送信者から受信したメールに対して、最初にすべき行動は何ですか？",
        lessonId: 2,
      },
    ],
    skipDuplicates: true,
  });
};
