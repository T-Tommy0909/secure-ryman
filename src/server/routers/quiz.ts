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
});

export type QuizList = Awaited<ReturnType<typeof quizRouter.list>>;
