import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";

export const partRouter = router({
  list: procedure.query(async () => {
    return await prisma.part.findMany();
  }),
});
