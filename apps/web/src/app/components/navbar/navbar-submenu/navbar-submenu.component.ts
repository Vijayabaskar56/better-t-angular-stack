import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import {
	Component,
	type ElementRef,
	Input,
	type OnInit,
	ViewChild,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ChevronRight, LucideAngularModule } from "lucide-angular";
import type { SubMenuItem } from "../../../utils/menu";

@Component({
	selector: "div[navbar-submenu]",
	templateUrl: "./navbar-submenu.component.html",
	standalone: true,
	imports: [
		NgFor,
		NgTemplateOutlet,
		RouterLinkActive,
		RouterLink,
		NgIf,
		LucideAngularModule,
	],
})
export class NavbarSubmenuComponent implements OnInit {
	@Input() public submenu = <SubMenuItem[]>{};
	@ViewChild("submenuRef") submenuRef: ElementRef<HTMLDivElement> | undefined;
	readonly chevronRight = ChevronRight;
	ngOnInit(): void {}

	ngAfterViewInit() {
		/**
		 * check if component is out of the screen
		 */
		if (this.submenuRef) {
			const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
			const bounding = document.body.getBoundingClientRect();

			if (submenu.right > bounding.right) {
				const childrenElement = this.submenuRef.nativeElement
					.parentNode as HTMLElement;
				if (childrenElement) {
					childrenElement.style.left = "-100%";
				}
			}
		}
	}
}
