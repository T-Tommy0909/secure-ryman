import { router } from "../trpc";
import { partRouter } from "./part";

export const appRouter = router({
  parts: partRouter,
});

export type AppRouter = typeof appRouter;
