import { router } from "../trpc";
import { answerRouter } from "./answer";
import { partRouter } from "./part";
import { questionRouter } from "./question";
import { userRouter } from "./user";

export const appRouter = router({
  users: userRouter,
  parts: partRouter,
  questions: questionRouter,
  answers: answerRouter,
});

export type AppRouter = typeof appRouter;
