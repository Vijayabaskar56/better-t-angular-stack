import {
	animate,
	state,
	style,
	transition,
	trigger,
} from "@angular/animations";
import { NgClass } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";
import { ClickOutsideDirective } from "../../../../../shared/directives/click-outside.directive";
import { AuthService } from "../../../services/auth.service";

@Component({
	selector: "app-profile-menu",
	templateUrl: "./profile-menu.component.html",
	standalone: true,
	imports: [ClickOutsideDirective, RouterLink, LucideAngularModule],
	animations: [
		trigger("openClose", [
			state(
				"open",
				style({
					opacity: 1,
					transform: "translateY(0)",
					visibility: "visible",
				}),
			),
			state(
				"closed",
				style({
					opacity: 0,
					transform: "translateY(-20px)",
					visibility: "hidden",
				}),
			),
			transition("open => closed", [animate("0.2s")]),
			transition("closed => open", [animate("0.2s")]),
		]),
	],
})
export class ProfileMenuComponent implements OnInit {
	public isOpen = false;
	authService = inject(AuthService);
	public profileMenu = [
		{
			title: "Your Profile",
			icon: "./assets/icons/heroicons/outline/user-circle.svg",
			link: "/account",
		},
		{
			title: "Settings",
			icon: "./assets/icons/heroicons/outline/cog-6-tooth.svg",
			link: "/account",
		},
		{
			title: "Sign out",
			icon: "./assets/icons/heroicons/outline/logout.svg",
			action: () => this.authService.authClient.signOut(),
		},
	];

	public themeMode = ["light", "dark", "system"];

	ngOnInit(): void {}

	public toggleMenu(): void {
		this.isOpen = !this.isOpen;
	}

	toggleThemeMode() {
		// this.themeService.theme.update((theme) => {
		//   const mode = !this.themeService.isDark ? 'dark' : 'light';
		//   return { ...theme, mode: mode };
		// });
	}

	toggleThemeColor(color: string) {
		// this.themeService.theme.update((theme) => {
		//   return { ...theme, color: color };
		// });
	}
}
