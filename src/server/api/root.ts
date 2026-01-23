import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { profileRouter } from "./routers/profile";
import { walletRouter } from "./routers/wallet";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  profile: profileRouter,
  wallet: walletRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
