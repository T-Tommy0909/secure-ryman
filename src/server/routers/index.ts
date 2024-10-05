import { router } from "../trpc";
import { answerRouter } from "./answer";
import { lessonRouter } from "./lesson";
import { partRouter } from "./part";
import { questionRouter } from "./question";
import { userRouter } from "./user";

export const appRouter = router({
  users: userRouter,
  parts: partRouter,
  questions: questionRouter,
  answers: answerRouter,
  lessons: lessonRouter,
});

export type AppRouter = typeof appRouter;
