import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const quizRouter = router({
  list: procedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.quiz.findMany({
        where: { lessonId: BigInt(input.lessonId) },
        include: { quizAnswer: true },
      });
    }),

  myAnswers: procedure
    .input(z.object({ lessonId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      const myAnswers = await prisma.quiz.findMany({
        where: { lessonId: BigInt(input.lessonId) },
        include: {
          quizAnswer: {
            where: { users: { some: { id: input.userId } } },
          },
        },
      });
      const quizWithAnswer = await prisma.quiz.findMany({
        where: { lessonId: BigInt(input.lessonId) },
        include: {
          quizAnswer: {
            where: { isCorrect: true },
            select: { text: true },
          },
        },
      });

      // 問題と、その問題に対する回答をマージ
      return myAnswers.map((myAnswer) => {
        const quiz = quizWithAnswer.find((quiz) => quiz.id === myAnswer.id);
        return {
          quizText: myAnswer.text,
          userAnswer: {
            text: myAnswer.quizAnswer[0].text,
            isCorrect: myAnswer.quizAnswer[0].isCorrect,
          },
          quizAnswer: quiz!.quizAnswer[0].text,
        };
      });
    }),
});

export type QuizList = Awaited<ReturnType<typeof quizRouter.list>>;

export type MyAnswers = Awaited<ReturnType<typeof quizRouter.myAnswers>>;
