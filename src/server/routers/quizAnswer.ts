import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { CreateQuizAnswersRequestSchema } from "@/types/quizAnswer";

export const quizAnswerRouter = router({
  createMany: procedure
    .input(CreateQuizAnswersRequestSchema)
    .mutation(async ({ input }) => {
      return await Promise.all(
        input.userAnswers.map(async (userAnswer) => {
          // もしユーザーがすでに回答していたら、回答を更新する
          const quizAnswers = await prisma.quizAnswer.findMany({
            where: { quizId: BigInt(userAnswer.quizId) },
            include: { users: { select: { id: true } } },
          });
          await Promise.all(
            quizAnswers.map(async (quizAnswer) => {
              if (quizAnswer.users.some((user) => user.id === input.userId)) {
                await prisma.quizAnswer.update({
                  where: { id: BigInt(quizAnswer.id) },
                  data: {
                    users: {
                      disconnect: [{ id: input.userId }],
                    },
                  },
                });
                return quizAnswer.id;
              }
              return quizAnswer.id;
            }),
          );

          // ユーザーの回答を追加する
          const response = await prisma.quizAnswer.update({
            where: { id: BigInt(userAnswer.quizAnswerId) },
            data: {
              users: {
                connect: [{ id: input.userId }],
              },
            },
          });

          return String(response.id);
        }),
      );
    }),
});
