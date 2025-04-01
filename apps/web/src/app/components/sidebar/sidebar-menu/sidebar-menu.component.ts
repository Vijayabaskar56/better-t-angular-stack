import {
	ChangeDetectionStrategy,
	Component,
	type OnInit,
	inject,
} from "@angular/core";

import { RouterLink, RouterLinkActive } from "@angular/router";
import { SidebarSubmenuComponent } from "../sidebar-submenu/sidebar-submenu.component";

import { NgClass, NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { ChevronRight, LucideAngularModule } from "lucide-angular";
import { MenuService } from "../../../services/menu.service";
import type { SubMenuItem } from "../../../utils/menu";

@Component({
	selector: "app-sidebar-menu",
	templateUrl: "./sidebar-menu.component.html",
	styleUrls: ["./sidebar-menu.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		NgFor,
		NgClass,
		NgTemplateOutlet,
		RouterLink,
		RouterLinkActive,
		NgIf,
		SidebarSubmenuComponent,
		LucideAngularModule,
	],
})
export class SidebarMenuComponent implements OnInit {
	public menuService = inject(MenuService);
	readonly chevronRight = ChevronRight;
	public toggleMenu(subMenu: SubMenuItem) {
		this.menuService.toggleMenu(subMenu);
	}

	ngOnInit(): void {}
}
