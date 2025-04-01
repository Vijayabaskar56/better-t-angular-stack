import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type Theme = "light" | "dark" | "system";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	private storageKey = "app-theme";
	private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
	theme$ = this.themeSubject.asObservable();

	constructor() {
		this.initializeTheme();
		this.handleSystemThemeChange();
	}

	private getStoredTheme(): Theme {
		const storedTheme = localStorage.getItem(this.storageKey);
		return (storedTheme as Theme) || "system";
	}

	private initializeTheme() {
		const theme = this.getStoredTheme();
		this.setTheme(theme);
	}

	private handleSystemThemeChange() {
		if (typeof window !== "undefined") {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					if (this.themeSubject.value === "system") {
						this.applyTheme("system");
					}
				});
		}
	}

	setTheme(theme: Theme) {
		localStorage.setItem(this.storageKey, theme);
		this.themeSubject.next(theme);
		this.applyTheme(theme);
	}

	private applyTheme(theme: Theme) {
		const isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);

		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light",
		);
	}
}
