import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const companyRouter = router({
  myCompanyResult: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.userId },
        select: { companyId: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.companyId) {
        throw new Error("User does not belong to any company");
      }

      const companyData = await prisma.company.findUnique({
        where: { id: user.companyId },
        include: {
          users: {
            include: {
              answers: true,
            },
          },
        },
      });
      if (!companyData) {
        throw new Error("Company not found");
      }
      if (!companyData.industryId) {
        throw new Error("Industry not found");
      }

      const companyIndustry = await prisma.industry.findUnique({
        where: { id: companyData.industryId },
      });
      if (!companyIndustry) {
        throw new Error("Industry not found");
      }
      const userAnswers = await Promise.all(
        companyData.users.map(async (user) => {
          if (user.answers.length === 0) return [];
          return Promise.all(
            user.answers.map(async (answer) => {
              const answerChoice = await prisma.answerChoice.findUnique({
                where: { id: answer.answerChoiceId },
                select: { points: true },
              });
              if (!answerChoice) {
                throw new Error("Answer choice not found");
              }
              return answerChoice.points;
            }),
          );
        }),
      );

      const companyAnswerAverage =
        userAnswers.flat().reduce((acc, curr) => acc + curr, 0) /
        userAnswers.flat().length;

      const parts = await prisma.part.findMany({
        include: {
          questions: { select: { id: true } },
          categorys: {
            include: {
              answers: {
                include: {
                  user: { select: { companyId: true } },
                  answerChoice: { select: { points: true } },
                },
              },
            },
          },
        },
      });

      const companyPartScoreAverages = await Promise.all(
        parts.map(async (part) => {
          // カテゴリ内の回答から、会社の回答を抽出し、その平均得点を計算
          // flatMapでcategorysを一次元配列に変換
          const partScores = part.categorys.flatMap((category) =>
            category.answers
              .filter((answer) => answer.user.companyId === companyData.id)
              .map((answer) => answer.answerChoice.points),
          );
          const partScoreAverage =
            partScores.reduce((acc, curr) => acc + curr, 0) / partScores.length;
          return partScoreAverage;
        }),
      );

      return {
        industry: companyIndustry.name,
        employee: companyData.employee,
        budget: companyData.budget,
        averageScore: companyAnswerAverage,
        partScoreAverages: companyPartScoreAverages,
      };
    }),
});

export type MyCompanyResult = Awaited<
  ReturnType<typeof companyRouter.myCompanyResult>
>;
