import {
	CommonModule,
	NgClass,
	NgFor,
	NgTemplateOutlet,
} from "@angular/common";
import { Component, Input, type OnInit, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ChevronRight, LucideAngularModule } from "lucide-angular";
import { MenuService } from "../../../services/menu.service";
import type { SubMenuItem } from "../../../utils/menu";

@Component({
	selector: "app-sidebar-submenu",
	templateUrl: "./sidebar-submenu.component.html",
	styleUrls: ["./sidebar-submenu.component.scss"],
	standalone: true,
	imports: [
		NgClass,
		NgFor,
		NgTemplateOutlet,
		RouterLinkActive,
		RouterLink,
		CommonModule,
		LucideAngularModule,
	],
})
export class SidebarSubmenuComponent implements OnInit {
	@Input() public submenu = <SubMenuItem>{};
	public menuService = inject(MenuService);
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
}
