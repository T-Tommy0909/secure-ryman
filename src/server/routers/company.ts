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

      const companyAnswerAverage = (
        userAnswers.flat().reduce((acc, curr) => acc + curr, 0) /
        userAnswers.flat().length
      ).toFixed(1);

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
        parts.map((part) => {
          // カテゴリ内の回答から、会社の回答を抽出し、その平均得点を計算
          // flatMapでcategorysを一次元配列に変換
          const partScores = part.categorys.flatMap((category) =>
            category.answers
              .filter((answer) => answer.user.companyId === companyData.id)
              .map((answer) => answer.answerChoice.points),
          );
          const partScoreAverage =
            partScores.reduce((acc, curr) => acc + curr, 0) / partScores.length;
          return partScoreAverage.toFixed(1);
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

  myIndustryResult: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.userId },
        select: { company: { select: { industryId: true } } },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.company || !user.company.industryId) {
        throw new Error("User does not belong to any company or industry");
      }

      const industry = await prisma.industry.findUnique({
        where: { id: user.company.industryId },
        include: {
          companies: { include: { users: { include: { answers: true } } } },
        },
      });
      if (!industry) {
        throw new Error("Industry not found");
      }

      // 予算を登録している会社の予算の平均値を取得
      const validBudgets = industry.companies.flatMap((company) => {
        if (!company.budget) {
          return [];
        }
        return company.budget;
      });
      const industryBudgetAverage =
        validBudgets.reduce((acc, curr) => acc + curr, 0) / validBudgets.length;

      // 診断実施したユーザーがいる会社の回答の平均値を取得
      const companyAnswerAverages = await Promise.all(
        industry.companies.map(async (company) => {
          const userAnswers = await Promise.all(
            company.users.map(async (user) => {
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
          // その会社で診断を実施したユーザーがいない場合は、空配列を返す
          if (userAnswers.flat().length === 0) {
            return [];
          }

          const companyAnswerAverage =
            userAnswers.flat().reduce((acc, curr) => acc + curr, 0) /
            userAnswers.flat().length;
          return companyAnswerAverage;
        }),
      );
      const averageScore = (
        companyAnswerAverages.flat().reduce((acc, curr) => acc + curr, 0) /
        companyAnswerAverages.flat().length
      ).toFixed(1);

      const parts = await prisma.part.findMany({
        include: {
          questions: { select: { id: true } },
          categorys: {
            include: {
              answers: {
                include: {
                  user: {
                    include: { company: { select: { industryId: true } } },
                  },
                  answerChoice: { select: { points: true } },
                },
              },
            },
          },
        },
      });

      const industryPartScoreAverages = await Promise.all(
        parts.map((part) => {
          // カテゴリ内の回答から、会社の回答を抽出し、その平均得点を計算
          // flatMapでcategorysを一次元配列に変換
          const partScores = part.categorys.flatMap((category) =>
            category.answers
              .filter(
                (answer) =>
                  answer.user.company &&
                  answer.user.company.industryId === industry.id,
              )
              .map((answer) => answer.answerChoice.points),
          );
          const partScoreAverage =
            partScores.reduce((acc, curr) => acc + curr, 0) / partScores.length;
          return partScoreAverage.toFixed(1);
        }),
      );

      return {
        industry: industry.name,
        budget: industryBudgetAverage,
        averageScore: averageScore,
        partScoreAverages: industryPartScoreAverages,
      };
    }),

  competitorIndustryResultList: procedure
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

      const myCompanyData = await prisma.company.findUnique({
        where: { id: user.companyId },
        select: { industryId: true },
      });
      if (!myCompanyData) {
        throw new Error("Company not found");
      }
      if (!myCompanyData.industryId) {
        throw new Error("Industry not found");
      }

      const competitorData = await prisma.company.findMany({
        where: {
          id: { not: user.companyId },
          industryId: myCompanyData.industryId,
        },
        include: {
          users: {
            include: {
              answers: true,
            },
          },
        },
      });
      if (!competitorData) {
        throw new Error("Company not found");
      }

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

      const competitorResults = await Promise.all(
        competitorData.map(async (company) => {
          const userAnswers = await Promise.all(
            company.users.map(async (user) => {
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

          const companyAnswerAverage = (
            userAnswers.flat().reduce((acc, curr) => acc + curr, 0) /
            userAnswers.flat().length
          ).toFixed(1);

          const companyPartScoreAverages = await Promise.all(
            parts.map((part) => {
              const partScores = part.categorys.flatMap((category) =>
                category.answers
                  .filter((answer) => answer.user.companyId === company.id)
                  .map((answer) => answer.answerChoice.points),
              );
              const partScoreAverage =
                partScores.reduce((acc, curr) => acc + curr, 0) /
                partScores.length;
              return partScoreAverage.toFixed(1);
            }),
          );

          const industry = await prisma.industry.findUnique({
            where: { id: company.industryId! },
            select: { name: true },
          });
          if (!industry) {
            throw new Error("Industry not found");
          }

          return {
            industry: industry.name,
            employee: company.employee,
            budget: company.budget,
            averageScore: companyAnswerAverage,
            partScoreAverages: companyPartScoreAverages,
          };
        }),
      );

      return competitorResults;
    }),
});

export type MyCompanyResult = Awaited<
  ReturnType<typeof companyRouter.myCompanyResult>
>;

export type MyIndustryResult = Awaited<
  ReturnType<typeof companyRouter.myIndustryResult>
>;

export type CompetitorIndustryResultList = Awaited<
  ReturnType<typeof companyRouter.competitorIndustryResultList>
>;
