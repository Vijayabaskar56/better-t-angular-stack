import { NgClass, NgFor } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { MenuService } from "../../../services/menu.service";
import type { MenuItem } from "../../../utils/menu";
import { NavbarSubmenuComponent } from "../navbar-submenu/navbar-submenu.component";

@Component({
	selector: "app-navbar-menu",
	templateUrl: "./navbar-menu.component.html",
	standalone: true,
	imports: [NgFor, NgClass, NavbarSubmenuComponent],
})
export class NavbarMenuComponent implements OnInit {
	private showMenuClass = [
		"scale-100",
		"animate-fade-in-up",
		"opacity-100",
		"pointer-events-auto",
	];
	private hideMenuClass = [
		"scale-95",
		"animate-fade-out-down",
		"opacity-0",
		"pointer-events-none",
	];
	public menuService = inject(MenuService);

	ngOnInit(): void {}

	public toggleMenu(menu: MenuItem): void {
		menu.selected = !menu.selected;
	}

	public mouseEnter(event: MouseEvent): void {
		const element = (event?.target as HTMLElement)?.querySelector(
			"app-navbar-submenu",
		)?.children[0];
		if (element) {
			for (const c of this.hideMenuClass) {
				element.classList.remove(c);
			}
			for (const c of this.showMenuClass) {
				element.classList.add(c);
			}
		}
	}

	public mouseLeave(event: MouseEvent): void {
		const element = (event?.target as HTMLElement)?.querySelector(
			"app-navbar-submenu",
		)?.children[0];
		if (element) {
			for (const c of this.showMenuClass) {
				element.classList.remove(c);
			}
			for (const c of this.hideMenuClass) {
				element.classList.add(c);
			}
		}
	}
}
