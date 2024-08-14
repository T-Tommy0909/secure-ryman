import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { CreateAnswersRequestSchema } from "@/types/answer";
import { z } from "zod";

export const answerRouter = router({
  myAnswerList: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const myAns = await prisma.part.findMany({
        include: {
          categorys: {
            include: {
              answers: {
                where: {
                  userId: input.userId,
                },
              },
            },
          },
        },
      });
      return await Promise.all(
        myAns.map(async (part) => {
          return {
            partName: part.name,
            category: await Promise.all(
              part.categorys.map(async (category) => {
                return {
                  categoryName: category.name,
                  points:
                    (
                      await Promise.all(
                        category.answers.map(async (answer) => {
                          const answerChoice =
                            await prisma.answerChoice.findUnique({
                              where: {
                                id: answer.answerChoiceId,
                              },
                              select: {
                                points: true,
                              },
                            });
                          if (!answerChoice) {
                            throw new Error("AnswerChoice not found");
                          }
                          return answerChoice.points;
                        }),
                      )
                    ).reduce((sum, points) => sum + points, 0) /
                    category.answers.length,
                };
              }),
            ),
          };
        }),
      );
    }),

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
