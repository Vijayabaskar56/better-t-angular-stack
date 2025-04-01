import { CommonModule } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { Laptop, LucideAngularModule, Moon, Sun } from "lucide-angular";
import { type Theme, ThemeService } from "../../services/theme.service";

@Component({
	selector: "app-theme-switcher",
	standalone: true,
	imports: [CommonModule, LucideAngularModule],
	template: `
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <!-- Sun icon -->
         @if  (currentTheme === 'light') {
          <i-lucide [img]="Sun" class="my-icon"></i-lucide>
         } @else if(currentTheme === 'dark') {
          <i-lucide [img]="Moon" class="my-icon"></i-lucide>
        } @else {
          <i-lucide [img]="Moon" class="my-icon"></i-lucide>
        }
      </label>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52">
        <li>
          <button
            [class.active]="currentTheme === 'light'"
            (click)="changeTheme('light')"
          >
            <i-lucide [img]="Sun" class="my-icon"></i-lucide>
            Light
          </button>
        </li>
        <li>
          <button
            [class.active]="currentTheme === 'dark'"
            (click)="changeTheme('dark')"
          >
            <i-lucide [img]="Moon" class="my-icon"></i-lucide>
            Dark
          </button>
        </li>
        <li>
          <button
            [class.active]="currentTheme === 'system'"
            (click)="changeTheme('system')"
          >
            <i-lucide [img]="System" class="my-icon"></i-lucide>
            System
          </button>
        </li>
      </ul>
    </div>
  `,
	styles: [
		`

  `,
	],
})
export class ThemeSwitcherComponent implements OnInit {
	currentTheme: Theme = "system";
	themeService = inject(ThemeService);
	readonly Sun = Sun;
	readonly Moon = Moon;
	readonly System = Laptop;

	ngOnInit() {
		this.themeService.theme$.subscribe((theme) => {
			this.currentTheme = theme;
		});
	}

	changeTheme(theme: Theme) {
		this.themeService.setTheme(theme);
	}
}
