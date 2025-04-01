import { NgClass, NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ChevronRight, LucideAngularModule } from "lucide-angular";
import { MenuService } from "../../../../services/menu.service";
import type { SubMenuItem } from "../../../../utils/menu";
import { NavbarMobileSubmenuComponent } from "../navbar-mobile-submenu/navbar-mobile-submenu.component";

@Component({
	selector: "app-navbar-mobile-menu",
	templateUrl: "./navbar-mobile-menu.component.html",
	standalone: true,
	imports: [
		NgFor,
		NgClass,
		NgTemplateOutlet,
		RouterLink,
		RouterLinkActive,
		NgIf,
		NavbarMobileSubmenuComponent,
		LucideAngularModule,
	],
})
export class NavbarMobileMenuComponent implements OnInit {
	public menuService = inject(MenuService);
	readonly chevronRight = ChevronRight;
	public toggleMenu(subMenu: SubMenuItem) {
		this.menuService.toggleMenu(subMenu);
	}

	public closeMenu() {
		this.menuService.showMobileMenu = false;
	}

	ngOnInit(): void {}
}
