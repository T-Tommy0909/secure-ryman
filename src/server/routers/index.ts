import { router } from "../trpc";
import { partRouter } from "./part";
import { questionRouter } from "./question";

export const appRouter = router({
  parts: partRouter,
  questions: questionRouter,
});

export type AppRouter = typeof appRouter;
