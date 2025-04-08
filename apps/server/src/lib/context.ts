import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { fromNodeHeaders } from "better-auth/node";
import type { FastifyInstance } from "fastify";

export type CreateContextOptions = {
  context: CreateFastifyContextOptions;
  fastify: FastifyInstance
};

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const session = await req.server.auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return {
    session,
    fastify: req.server
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
