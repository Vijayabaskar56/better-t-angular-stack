import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { auth } from "./auth";
import { fromNodeHeaders } from "better-auth/node";

export type CreateContextOptions = {
  context: CreateFastifyContextOptions;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(context.req.headers),
  });
  console.log("🚀 ~ :13 ~ createContext ~ session:", session)

  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
