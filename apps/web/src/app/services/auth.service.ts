import { Injectable, OnInit } from "@angular/core";
import { reverifyClientPlugin } from "@better-auth-kit/reverify/client";
import { createAuthClient } from "better-auth/client";
import {
	anonymousClient,
	customSessionClient,
	emailOTPClient,
	passkeyClient,
	phoneNumberClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { environment } from "../environments/enviroments";
@Injectable({
	providedIn: "root",
})
export class AuthService {
	isLoggedIn = false;
	authClient = createAuthClient({
		baseURL: environment.baseUrl,
		fetchOptions: {
			credentials: "include",
		},
		disableDefaultFetchPlugins: true,
		plugins: [
			customSessionClient(),
			emailOTPClient(),
			twoFactorClient(),
			usernameClient(),
			passkeyClient(),
			phoneNumberClient(),
			reverifyClientPlugin(),
			anonymousClient(),
		],
	});
	async getUserSession() {
		return await this.authClient.getSession();
	}

	getIsLoggedIn = () => {
		this.isLoggedIn = true;
	};
}
