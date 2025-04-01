import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-error404",
	standalone: true,
	imports: [LucideAngularModule],
	templateUrl: "./error404.component.html",
})
export class Error404Component {
	private router = inject(Router);
	goToHomePage() {
		this.router.navigate(["/"]);
	}
}
