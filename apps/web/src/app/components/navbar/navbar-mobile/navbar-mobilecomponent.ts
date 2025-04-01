import { NgClass } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { LucideAngularModule, X } from "lucide-angular";
import { MenuService } from "../../../services/menu.service";
import { NavbarMobileMenuComponent } from "./navbar-mobile-menu/navbar-mobile-menu.component";

@Component({
	selector: "app-navbar-mobile",
	templateUrl: "./navbar-mobile.component.html",
	standalone: true,
	imports: [NgClass, NavbarMobileMenuComponent, LucideAngularModule],
})
export class NavbarMobileComponent implements OnInit {
	public menuService = inject(MenuService);
	ngOnInit(): void {}
	readonly xIcon = X;
	public toggleMobileMenu(): void {
		this.menuService.showMobileMenu = false;
	}
}
