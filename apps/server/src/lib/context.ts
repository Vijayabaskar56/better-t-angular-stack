import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { auth } from "./auth";
import { fromNodeHeaders } from "better-auth/node";
import type { FastifyInstance } from "fastify";

export type CreateContextOptions = {
  context: CreateFastifyContextOptions;
  fastify: FastifyInstance
};

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  console.log("🚀 ~ :10 ~ createContext ~ context:", req, res)
  const session = await req.server.auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log("🚀 ~ :16 ~ createContext ~ session:", session)
  return {
    session,
    fastify: req.server
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
