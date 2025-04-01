import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
	Facebook,
	Hash,
	LucideAngularModule,
	Twitter,
	Youtube,
} from "lucide-angular";
import { AuthService } from "../services/auth.service";

@Component({
	selector: "app-footer",
	standalone: true,
	imports: [CommonModule, LucideAngularModule],
	template: `<footer class="footer sm:footer-horizontal text-base-content items-center p-4">
  <aside class="grid-flow-col items-center">
  <i-lucide [img]="hashTag" class="w-5 h-5"></i-lucide>
    <p>Copyright © {{year}} - All right reserved</p>
  </aside>
  <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a>
      <i-lucide [img]="facebook" class="w-5 h-5"></i-lucide>
    </a>
    <a>
      <i-lucide [img]="twitter" class="w-5 h-5"></i-lucide>
    </a>
    <a>
      <i-lucide [img]="youtube" class="w-5 h-5"></i-lucide>
    </a>

  </nav>
</footer>`,
})
export class FooterComponent {
	userInitials = "U"; // This could be dynamic based on user's name
	year = new Date().getFullYear();
	authService = inject(AuthService);
	readonly hashTag = Hash;
	readonly twitter = Twitter;
	readonly youtube = Youtube;
	readonly facebook = Facebook;

	// isAuthenticated$ = this.authService.authClient.getSession();

	logout() {
		this.authService.authClient.signOut();
	}
}
