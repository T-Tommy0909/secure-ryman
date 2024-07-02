import { router } from "../trpc";
import { answerRouter } from "./answer";
import { partRouter } from "./part";
import { questionRouter } from "./question";

export const appRouter = router({
  parts: partRouter,
  questions: questionRouter,
  answers: answerRouter,
});

export type AppRouter = typeof appRouter;
