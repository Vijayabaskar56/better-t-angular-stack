import { protectedProcedure, publicProcedure, router } from '../lib/trpc';
import { todoRouter } from './todo';

const appRouter = router({
 healthCheck: publicProcedure.query(() => {
  return "OK";
 }),
 privateData: protectedProcedure.query(({ ctx }) => {
  return {
   message: "This is private",
   user: ctx.session.user,
  };
 }),
 greeting: publicProcedure.query(() => 'hello tRPC v10!'),
 todo: todoRouter,
});

export default appRouter;
type AppRouter = typeof appRouter;
export type { AppRouter };
