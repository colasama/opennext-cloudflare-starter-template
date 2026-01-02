import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(user);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.select().from(user).where(eq(user.id, input.id));
    }),

  create: publicProcedure
    .input(
      z.object({
        email: z.pipe(z.string(), z.email()),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .insert(user)
        .values({
          id: crypto.randomUUID(),
          ...input,
        })
        .returning();
    }),
});
