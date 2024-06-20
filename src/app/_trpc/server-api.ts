import { appRouter } from "@/server/routers";
import { createCallerFactory } from "@/server/trpc";
import { httpBatchLink } from "@trpc/client";

const createCaller = createCallerFactory(appRouter);
export const serverApi = createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.BASE_URL}/api/trpc`,
    }),
  ],
});
