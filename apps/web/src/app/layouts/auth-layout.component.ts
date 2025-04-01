import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeSwitcherComponent } from "../components/theme-switcher/theme-switcher.component";

interface AuthLayoutConfig {
	imageUrl: string;
	title: string;
	description: string;
	imagePosition?: "left" | "right";
	copyright?: string;
}

@Component({
	selector: "app-auth-layout",
	standalone: true,
	imports: [CommonModule, ThemeSwitcherComponent, RouterOutlet],
	template: `
    <div class="min-h-screen flex" [class.flex-row-reverse]="config.imagePosition === 'right'">
      <!-- Cover Image Section -->
      <div class="hidden lg:block w-1/2 relative">
        <div
          class="absolute inset-0 bg-cover bg-center"
          [style.background-image]="'url(' + config.imageUrl + ')'"
        >
          <div class="absolute inset-0 bg-primary/10 backdrop-blur-[2px]"></div>
          <div class="relative h-full flex flex-col justify-between p-8 text-white">
            <div>
              <h1 class="text-4xl font-bold mb-4">{{ config.title }}</h1>
              <p class="text-lg opacity-90">{{ config.description }}</p>
            </div>
            <p class="text-sm opacity-75">{{ config.copyright || '© 2025 AuthFlow. All rights reserved.' }}</p>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="w-full lg:w-1/2 min-h-screen bg-base-200">
        <!-- Theme Switcher -->
        <div class="absolute top-4" [class]="config.imagePosition === 'right' ? 'left-4' : 'right-4'">
          <app-theme-switcher></app-theme-switcher>
        </div>

        <!-- Form Container -->
        <div class="min-h-screen flex items-center justify-center p-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AuthLayoutComponent {
	@Input() config: AuthLayoutConfig = {
		imageUrl:
			"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3",
		title: "Welcome to AuthFlow",
		description:
			"Secure, simple, and seamless authentication for your applications.",
		imagePosition: "left",
	};
}
