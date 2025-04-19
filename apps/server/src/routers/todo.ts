import { db } from "@server/db/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";

export const todoRouter = router({
 getAll: publicProcedure.query(async () => {
  return await db.todo.find();
 }),

 create: publicProcedure
  .input(z.object({ text: z.string().min(1) }))
  .mutation(async ({ input, ctx }) => {
   try {
    const data = await db.todo.create({
     text: input.text,
    });
    ctx.fastify.log.info(data);
    return data;

   } catch (error) {
    throw new TRPCError({
     code: "NOT_FOUND",
     message: "Error occurred",
    });
   }
  }),

 toggle: publicProcedure
  .input(z.object({ id: z.string(), completed: z.boolean() }))
  .mutation(async ({ input }) => {
   try {
    const data = await db.todo.findOneAndUpdate({ _id: input.id }, { completed: input.completed });
    console.log(input, "input", data);
    return data;
   } catch (error) {
    throw new TRPCError({
     code: "NOT_FOUND",
     message: "Todo not found",
    });
   }
  }),

 delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
   try {
    return await db.todo.deleteOne({ _id: input.id });
   } catch (error) {
    throw new TRPCError({
     code: "NOT_FOUND",
     message: "Todo not found",
    });
   }
  }),
});
