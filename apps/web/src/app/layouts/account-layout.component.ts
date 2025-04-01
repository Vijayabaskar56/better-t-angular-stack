import { CommonModule } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import {
	type Event,
	NavigationEnd,
	Router,
	RouterOutlet,
} from "@angular/router";
import { BottomNavbarComponent } from "../components/bottom-navbar/bottom-navbar.component";
import { FooterComponent } from "../components/footer.component";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";

@Component({
	selector: "app-app-layout",
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		SidebarComponent,
		BottomNavbarComponent,
		NavbarComponent,
	],
	template: `
  <div class="flex h-screen w-full overflow-hidden">
  <!-- Sidebar -->
  <app-sidebar></app-sidebar>
  <div class="flex grow flex-col content-start overflow-hidden bg-card">
        <!-- Header -->
        <app-navbar></app-navbar>
    <!-- main content -->
    <div
      id="main-content"
      class="scrollbar-thumb-rounded scrollbar-track-rounded grow overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
      <div class="mx-auto px-4 py-4 sm:px-8 lg:container">
        <router-outlet></router-outlet>
      </div>
    </div>

    <!-- footer -->
    <!-- <app-footer></app-footer> -->
    <!-- Bottom bar -->
    <app-bottom-navbar></app-bottom-navbar>
  </div>
</div>
  `,
})
export class AccountLayoutComponent implements OnInit {
	private mainContent: HTMLElement | null = null;
	private router = inject(Router);
	constructor() {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				if (this.mainContent) {
					this.mainContent.scrollTop = 0;
				}
			}
		});
	}

	ngOnInit(): void {
		this.mainContent = document.getElementById("main-content");
	}
}
