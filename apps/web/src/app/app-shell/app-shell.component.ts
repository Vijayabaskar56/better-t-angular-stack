import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-app-shell",
	imports: [RouterOutlet, CommonModule],
	templateUrl: "./app-shell.component.html",
	styleUrl: "./app-shell.component.css",
})
export class AppShellComponent {
	loading = false;
}
