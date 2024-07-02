import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { CreateAnswersRequestSchema } from "@/types/answer";

export const answerRouter = router({
  createMany: procedure
    .input(CreateAnswersRequestSchema)
    .mutation(async ({ input }) => {
      return await prisma.answer.createMany({
        data: input.map((answer) => {
          return {
            ...answer,
            categoryId: BigInt(answer.categoryId),
            answerChoiceId: BigInt(answer.answerChoiceId),
          };
        }),
      });
    }),
});
