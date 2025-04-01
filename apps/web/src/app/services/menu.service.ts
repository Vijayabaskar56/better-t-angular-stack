import { Injectable, type OnDestroy, inject, signal } from "@angular/core";
import { NavigationEnd, Router, type UrlTree } from "@angular/router";
import { Subscription } from "rxjs";
import { Menu, type MenuItem, type SubMenuItem } from "../utils/menu";

@Injectable({
	providedIn: "root",
})
export class MenuService implements OnDestroy {
	private _showSidebar = signal(true);
	private _showMobileMenu = signal(false);
	private _pagesMenu = signal<MenuItem[]>([]);
	private _subscription = new Subscription();
	private router = inject(Router);
	constructor() {
		/** Set dynamic menu */
		this._pagesMenu.set(Menu.pages);

		const sub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				/** Expand menu base on active route */
				// biome-ignore lint/complexity/noForEach: <explanation>
				this._pagesMenu().forEach((menu): void => {
					let activeGroup = false;
					// biome-ignore lint/complexity/noForEach: <explanation>
					menu.items.forEach((subMenu) => {
						const active = this.isActive(subMenu.route ?? "");
						subMenu.expanded = active;
						subMenu.active = active;
						if (active) activeGroup = true;
						if (subMenu.children) {
							this.expand(subMenu.children);
						}
					});
					menu.active = activeGroup;
				});
			}
		});
		this._subscription.add(sub);
	}

	get showSideBar() {
		return this._showSidebar();
	}
	get showMobileMenu() {
		return this._showMobileMenu();
	}
	get pagesMenu() {
		return this._pagesMenu();
	}

	set showSideBar(value: boolean) {
		this._showSidebar.set(value);
	}
	set showMobileMenu(value: boolean) {
		this._showMobileMenu.set(value);
	}

	public toggleSidebar() {
		this._showSidebar.set(!this._showSidebar());
	}

	public toggleMenu(menu: SubMenuItem) {
		this.showSideBar = true;
		menu.expanded = !menu.expanded;
	}

	public toggleSubMenu(submenu: SubMenuItem) {
		submenu.expanded = !submenu.expanded;
	}

	private expand(items: Array<SubMenuItem>) {
		for (const item of items) {
			item.expanded = this.isActive(item.route ?? "");
			if (item.children) this.expand(item.children);
		}
	}

	private isActive(instruction: string | UrlTree): boolean {
		return this.router.isActive(this.router.createUrlTree([instruction]), {
			paths: "subset",
			queryParams: "subset",
			fragment: "ignored",
			matrixParams: "ignored",
		});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
