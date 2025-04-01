import { Injectable, inject } from "@angular/core";
import {
	type ActivatedRouteSnapshot,
	type CanActivate,
	Router,
	type RouterStateSnapshot,
	type UrlTree,
} from "@angular/router";
import type { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	#router = inject(Router);
	authService = inject(AuthService);

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		this.authService.getIsLoggedIn();
		if (this.authService.isLoggedIn) {
			return true;
		}
		this.#router.navigate(["/auth/login"]);
		return false;
	}
}
