import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { users } from "../../db/schema";
import { db } from "../../db";

export const profileRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.userId) {
        return null;
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.session.userId),
    });
    return user || null;
  }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        surname: z.string().optional(),
        age: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db
        .update(users)
        .set({ ...input })
        .where(eq(users.id, ctx.session.userId));

      return { success: true };
    }),
});
