import { NgClass, NgFor, NgTemplateOutlet } from "@angular/common";
import { Component, Input, type OnInit, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ChevronRight, LucideAngularModule } from "lucide-angular";
import { MenuService } from "../../../../services/menu.service";
import type { SubMenuItem } from "../../../../utils/menu";

@Component({
	selector: "app-navbar-mobile-submenu",
	templateUrl: "./navbar-mobile-submenu.component.html",
	standalone: true,
	imports: [
		NgClass,
		NgFor,
		NgTemplateOutlet,
		RouterLinkActive,
		RouterLink,
		LucideAngularModule,
	],
})
export class NavbarMobileSubmenuComponent implements OnInit {
	@Input() public submenu = <SubMenuItem>{};
	private menuService = inject(MenuService);
	readonly chevronRight = ChevronRight;

	ngOnInit(): void {}

	public toggleMenu(menu: SubMenuItem) {
		this.menuService.toggleSubMenu(menu);
	}

	private collapse(items: Array<SubMenuItem>) {
		for (const item of items) {
			item.expanded = false;
			if (item.children) this.collapse(item.children);
		}
	}

	public closeMobileMenu() {
		this.menuService.showMobileMenu = false;
	}
}
