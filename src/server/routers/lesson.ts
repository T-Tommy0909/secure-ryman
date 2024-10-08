import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const lessonRouter = router({
  list: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const lessons = await prisma.lesson.findMany({
        include: { tags: true, users: true },
      });
      const response = lessons.map((lesson) => {
        return {
          id: String(lesson.id),
          title: lesson.title,
          description: lesson.description,
          tags: lesson.tags.map((tag) => tag.name),
          isRecommended: lesson.users.some((user) => user.id === input.userId),
        };
      });

      return response;
    }),
  get: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const lesson = await prisma.lesson.findUnique({
        where: { id: BigInt(input.id) },
        select: { title: true, fileName: true },
      });
      if (!lesson) {
        throw new Error("Lesson not found");
      }

      return lesson;
    }),
});
