import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { verifyMessage } from "viem";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "../../db/schema";
import { db } from "../../db";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        address: z.string(),
        signature: z.string(),
        message: z.string(), // "Sign in with..."
      })
    )
    .mutation(async ({ input }) => {
      const { address, signature, message } = input;

      // 1. Verify Signature
      const valid = await verifyMessage({
        address: address as `0x${string}`,
        message,
        signature: signature as `0x${string}`,
      });

      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid signature",
        });
      }

      // 2. Find or Create User
      let user = await db.query.users.findFirst({
        where: eq(users.address, address),
      });

      if (!user) {
        // Create new user
        const id = crypto.randomUUID();
        await db.insert(users).values({
          id,
          address,
        });
        user = await db.query.users.findFirst({
            where: eq(users.address, address),
        });
      }

      if (!user) {
          throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create user",
          });
      }
      
      // 3. Create Session Token (JWT)
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "supersecretdevkey123"
      );
      const token = await new SignJWT({ userId: user.id, address: user.address })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

      // 4. Set Cookie
      const cookieStore = await cookies();
      
      cookieStore.set("auth-token", token, {
        httpOnly: false, // Allow client JS access for debugging
        path: "/",
        secure: false, // Forcing false for debugging
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { success: true, user, token };
    }),

  logout: publicProcedure.mutation(async () => {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    return { success: true };
  }),
});
