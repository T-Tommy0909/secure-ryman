import { prisma } from "../src/server/utils/prisma";

export const createQuizAnswerSeed = async () => {
  await prisma.quizAnswer.createMany({
    data: [
      {
        text: "パスワードは最低10文字以上、できれば12文字以上にする",
        isCorrect: false,
        quizId: 1,
      },
      {
        text: "大文字、小文字、数字、記号を組み合わせて使用する",
        isCorrect: false,
        quizId: 1,
      },
      {
        text: "誕生日や住所など個人情報を含めると覚えやすい",
        isCorrect: true,
        quizId: 1,
      },
      {
        text: "意味のない文字列やランダムな単語を組み合わせる",
        isCorrect: false,
        quizId: 1,
      },
    ],
    skipDuplicates: true,
  });
};
