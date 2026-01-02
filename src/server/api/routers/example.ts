import { z } from "zod/v3";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z
        .object({
          name: z.string().min(1).optional(),
        })
        .optional(),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input?.name ?? "friend"}!`,
      };
    }),
  randomNumber: publicProcedure.query(() => {
    return {
      value: Math.floor(Math.random() * 1000),
      generatedAt: new Date().toISOString(),
    };
  }),
});
