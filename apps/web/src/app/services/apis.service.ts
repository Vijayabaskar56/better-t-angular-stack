import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { inject, Injectable, type Signal, signal } from '@angular/core';
import type { AppRouter } from '../../../../server/src/routers/index';
import { SuperJSON } from "superjson";
import { HttpClient } from '@angular/common/http';

const TRPC_URL = signal('http://localhost:3000/api/trpc')

@Injectable({
	providedIn: "root",
})
export class ApisService {
	private http = inject(HttpClient)
	public proxy = createTRPCProxyClient<AppRouter>({
		transformer: SuperJSON,
		links: [
			httpBatchLink({
				url: TRPC_URL(),
				fetch: (url, options) => {
					return fetch(url, {
						...options,
						credentials: 'include',
					})
				},
				headers: {
					credentials: 'include',
				},
			}),
		],
	});
	getTRPCURLSignal(): Signal<string> {
		return TRPC_URL;
	}
}
