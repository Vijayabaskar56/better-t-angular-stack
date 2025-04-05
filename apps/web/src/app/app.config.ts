import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import {
	provideClientHydration,
	withEventReplay,
} from "@angular/platform-browser";
import {
	QueryClient,
	provideTanStackQuery,
	withDevtools,
} from "@tanstack/angular-query-experimental";
import { routes } from "./app.routes";
import { provideTrpcClient } from "./utils/trpc-client";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimations(),
		provideTrpcClient(),
		provideTanStackQuery(
			new QueryClient(),
			withDevtools(() => ({ loadDevtools: "auto" })),
		),
	],
};
