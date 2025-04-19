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
    <a href="https://github.com/Vijayabaskar56/better-t3-angular-stack">
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Github--Streamline-Simple-Icons" height="24" width="24"><desc>Github Streamline Icon: https://streamlinehq.com</desc><title>GitHub</title><path d="M12 0.297c-6.63 0 -12 5.373 -12 12 0 5.303 3.438 9.8 8.205 11.385 0.6 0.113 0.82 -0.258 0.82 -0.577 0 -0.285 -0.01 -1.04 -0.015 -2.04 -3.338 0.724 -4.042 -1.61 -4.042 -1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087 -0.744 0.084 -0.729 0.084 -0.729 1.205 0.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495 0.998 0.108 -0.776 0.417 -1.305 0.76 -1.605 -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 0 -1.31 0.465 -2.38 1.235 -3.22 -0.135 -0.303 -0.54 -1.523 0.105 -3.176 0 0 1.005 -0.322 3.3 1.23 0.96 -0.267 1.98 -0.399 3 -0.405 1.02 0.006 2.04 0.138 3 0.405 2.28 -1.552 3.285 -1.23 3.285 -1.23 0.645 1.653 0.24 2.873 0.12 3.176 0.765 0.84 1.23 1.91 1.23 3.22 0 4.61 -2.805 5.625 -5.475 5.92 0.42 0.36 0.81 1.096 0.81 2.22 0 1.606 -0.015 2.896 -0.015 3.286 0 0.315 0.21 0.69 0.825 0.57C20.565 22.092 24 17.592 24 12.297c0 -6.627 -5.373 -12 -12 -12" fill="#000000" stroke-width="1"></path></svg>
    </a>
    <a href="https://x.com/Vijayabaskar56">
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="X--Streamline-Simple-Icons" height="24" width="24"><desc>X Streamline Icon: https://streamlinehq.com</desc><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8 -7.584 -6.638 7.584H0.474l8.6 -9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="#000000" stroke-width="1"></path></svg>
    </a>
    <a href="https://bsky.app/profile/vijayabaskar.xyz">
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Bluesky--Streamline-Simple-Icons" height="24" width="24"><desc>Bluesky Streamline Icon: https://streamlinehq.com</desc><title>Bluesky</title><path d="M12 10.8c-1.087 -2.114 -4.046 -6.053 -6.798 -7.995C2.566 0.944 1.561 1.266 0.902 1.565 0.139 1.908 0 3.08 0 3.768c0 0.69 0.378 5.65 0.624 6.479 0.815 2.736 3.713 3.66 6.383 3.364 0.136 -0.02 0.275 -0.039 0.415 -0.056 -0.138 0.022 -0.276 0.04 -0.415 0.056 -3.912 0.58 -7.387 2.005 -2.83 7.078 5.013 5.19 6.87 -1.113 7.823 -4.308 0.953 3.195 2.05 9.271 7.733 4.308 4.267 -4.308 1.172 -6.498 -2.74 -7.078a8.741 8.741 0 0 1 -0.415 -0.056c0.14 0.017 0.279 0.036 0.415 0.056 2.67 0.297 5.568 -0.628 6.383 -3.364 0.246 -0.828 0.624 -5.79 0.624 -6.478 0 -0.69 -0.139 -1.861 -0.902 -2.206 -0.659 -0.298 -1.664 -0.62 -4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" fill="#000000" stroke-width="1"></path></svg>
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
