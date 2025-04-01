import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ThemeService } from "../services/theme.service";
import { ThemeSwitcherComponent } from "./theme-switcher/theme-switcher.component";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [CommonModule, RouterLink, ThemeSwitcherComponent],
	template: `
  <header class="fixed top-0 left-0 right-0 bg-base-100 shadow-md z-50">
    <div class="navbar container mx-auto px-4">
      <div class="flex-1">
        <a routerLink="/" class="text-2xl font-bold">
          <span class="text-primary">Auth</span>Flow
        </a>
      </div>

      <div *ngIf="!(isAuthenticated$); else authenticatedUser">
        <a routerLink="/auth/login" class="btn btn-ghost">Login</a>
        <a routerLink="/auth/signup" class="btn btn-primary ml-2">Sign up</a>
      </div>
      <div class="flex-none gap-4">
        <app-theme-switcher></app-theme-switcher>
        <ng-template #authenticatedUser>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-10">
                <span>{{ userInitials }}</span>
              </div>
            </label>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a routerLink="/account" class="justify-between">
                  Account
                  <span class="badge badge-primary badge-sm">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a (click)="logout()">Logout</a></li>
            </ul>
          </div>
        </ng-template>
      </div>
    </div>
  </header>

  <!-- Spacer to prevent content from hiding under fixed header -->
  <div class="h-16"></div>`,
})
export class HeaderComponent {
	userInitials = "U"; // This could be dynamic based on user's name
	themeService = inject(ThemeService);
	authService = inject(AuthService);
	isAuthenticated$ = false;

	logout() {
		this.authService.authClient.signOut();
	}
}
