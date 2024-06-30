import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";

export const questionRouter = router({
  list: procedure.query(async () => {
    return await prisma.question.findMany({ include: { answerChoices: true } });
  }),
});
