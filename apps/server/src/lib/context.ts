import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { fromNodeHeaders } from "better-auth/node";
import type { FastifyInstance } from "fastify";
import { auth } from "./auth";

export type CreateContextOptions = {
  context: CreateFastifyContextOptions;
  fastify: FastifyInstance
};

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log("🚀 ~ :15 ~ createContext ~ session:", session)
  return {
    session: session,
    fastify: req.server
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
