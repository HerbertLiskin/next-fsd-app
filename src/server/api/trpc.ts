import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import superjson from "superjson";
import { auth } from "../auth";

import { db } from "../db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

interface Session {
  userId: string;
  address: string | null;
}

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  let session: Session | null = null;

  // 1. Try NextAuth Session first
  const nextAuthSession = await auth();
  if (nextAuthSession?.user?.id) {
    session = {
      userId: nextAuthSession.user.id,
      address: nextAuthSession.user.address || null,
    };
  }
  // 2. Fallback to manual JWT (auth-token)
  else if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "supersecretdevkey123",
      );
      const { payload } = await jwtVerify(token.value, secret);
      session = payload as unknown as Session;
    } catch (err) {
      // Token invalid or expired
    }
  }

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session },
    },
  });
});
