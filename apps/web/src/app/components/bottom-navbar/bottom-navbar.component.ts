import { Component, type OnInit } from "@angular/core";
import { Bell, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-bottom-navbar",
	templateUrl: "./bottom-navbar.component.html",
	standalone: true,
	imports: [LucideAngularModule],
})
export class BottomNavbarComponent implements OnInit {
	readonly bell = Bell;

	ngOnInit(): void {}
}
