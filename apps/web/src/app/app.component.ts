import { Component, type OnInit, inject } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";
import { NgxSonnerToaster, type Theme } from "ngx-sonner";
import { ResponsiveHelperComponent } from "./components/responsive-helper/responsive-helper.component";
import { LoadingService } from "./services/loading.service";
import { ThemeService } from "./services/theme.service";
@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		NgxSonnerToaster,
		RouterModule,
		ResponsiveHelperComponent,
		LucideAngularModule,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
	title = "angular-starter-kit";
	currentTheme: Theme = "system";
	loadinService = inject(LoadingService);
	themeService = inject(ThemeService);
	ngOnInit() {
		this.themeService.theme$.subscribe((theme) => {
			this.currentTheme = theme;
		});
	}
}
