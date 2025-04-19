import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { fromNodeHeaders } from "better-auth/node";
import type { EnhancedFastifyInstance } from "../types/fastify";

export type CreateContextOptions = {
 context: CreateFastifyContextOptions;
 fastify: EnhancedFastifyInstance;
};

export async function createContext({ req, res }: CreateFastifyContextOptions) {
 // Use our enhanced type
 const server = req.server as unknown as EnhancedFastifyInstance;

 const session = await server.auth.api.getSession({
  headers: fromNodeHeaders(req.headers),
 });
 return {
  session,
  fastify: server
 };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
