import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { smartWallets } from "../../db/schema";
import { eq, and } from "drizzle-orm";

export const walletRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        salt: z.number(),
        isDeployed: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if wallet already exists
      const existing = await ctx.db.query.smartWallets.findFirst({
        where: and(
          eq(smartWallets.userId, ctx.session.user.userId),
          eq(smartWallets.salt, input.salt),
        ),
      });

      if (existing) {
        // Update if needed (e.g. status changed)
        if (existing.isDeployed !== input.isDeployed) {
          await ctx.db
            .update(smartWallets)
            .set({ isDeployed: input.isDeployed })
            .where(eq(smartWallets.id, existing.id));
        }
        return existing;
      }

      // Create new
      const [wallet] = await ctx.db
        .insert(smartWallets)
        .values({
          userId: ctx.session.user.userId,
          address: input.address,
          salt: input.salt,
          isDeployed: input.isDeployed,
        })
        .returning();

      return wallet;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.smartWallets.findMany({
      where: eq(smartWallets.userId, ctx.session.user.userId),
      orderBy: (wallets, { asc }) => [asc(wallets.salt)],
    });
  }),
});
