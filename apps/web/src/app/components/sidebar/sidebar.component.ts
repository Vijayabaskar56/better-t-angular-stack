import { CommonModule, NgClass, NgIf } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ChevronsLeft, LucideAngularModule } from "lucide-angular";
import packageJson from "../../../../package.json";
import { environment } from "../../environments/environment.prod";
import { MenuService } from "../../services/menu.service";
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	standalone: true,
	imports: [
		NgClass,
		NgIf,
		SidebarMenuComponent,
		CommonModule,
		LucideAngularModule,
	],
})
export class SidebarComponent implements OnInit {
	public appName: string = environment.appName;
	public menuService = inject(MenuService);
	readonly chevronsLeft = ChevronsLeft;
	ngOnInit(): void {}

	public toggleSidebar() {
		this.menuService.toggleSidebar();
	}
}
