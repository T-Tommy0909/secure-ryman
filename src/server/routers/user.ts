import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { GetUserTypeRequestSchema } from "@/types/user";

export const userRouter = router({
  fetchUserType: procedure
    .input(GetUserTypeRequestSchema)
    .query(async ({ input }) => {
      const userType = await prisma.user.findUnique({
        where: { id: input.id },
        select: { role: true },
      });
      if (!userType) {
        throw new Error("User not found");
      }

      return userType.role;
    }),
});
