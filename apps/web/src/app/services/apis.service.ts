import { HttpClient } from "@angular/common/http";
import { Injectable, type Signal, inject, signal } from "@angular/core";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { SuperJSON } from "superjson";
import type { AppRouter } from "@server/routers";

const TRPC_URL = signal("http://localhost:3000/api/trpc");

@Injectable({
 providedIn: "root",
})
export class ApisService {
 private http = inject(HttpClient);
 public proxy = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
   httpBatchLink({
    url: TRPC_URL(),
    fetch: (url, options) => {
     return fetch(url, {
      ...options,
      credentials: "include",
     });
    },
   }),
  ],
 });
 getTRPCURLSignal(): Signal<string> {
  return TRPC_URL;
 }
}
