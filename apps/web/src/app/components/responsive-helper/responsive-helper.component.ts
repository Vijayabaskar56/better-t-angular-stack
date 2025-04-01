import { Component, type OnInit } from "@angular/core";

import { NgIf } from "@angular/common";
import { environment } from "../../environments/enviroments";

@Component({
	selector: "app-responsive-helper",
	templateUrl: "./responsive-helper.component.html",
	styleUrls: ["./responsive-helper.component.scss"],
	standalone: true,
	imports: [NgIf],
})
export class ResponsiveHelperComponent implements OnInit {
	public env: typeof environment = environment;

	ngOnInit(): void {}
}
