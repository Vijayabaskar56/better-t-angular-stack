import { Component, type OnInit, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LucideAngularModule, Menu } from "lucide-angular";
import { AuthService } from "../../services/auth.service";
import { MenuService } from "../../services/menu.service";
import { ThemeService } from "../../services/theme.service";
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { NavbarMenuComponent } from "./navbar-menu/navbar-menu.component";
import { NavbarMobileComponent } from "./navbar-mobile/navbar-mobilecomponent";
import { ProfileMenuComponent } from "./profile-menu/profile-menu.component";

@Component({
 selector: "app-navbar",
 templateUrl: "./navbar.component.html",
 standalone: true,
 imports: [
  NavbarMenuComponent,
  ProfileMenuComponent,
  NavbarMobileComponent,
  LucideAngularModule,
  ThemeSwitcherComponent,
  RouterLink,
 ],
})
export class NavbarComponent implements OnInit {
 private menuService = inject(MenuService);
 private router = inject(Router);
 themeService = inject(ThemeService);
 authService = inject(AuthService);
 isAuthenticated$ = false;
 readonly menu = Menu;
 ngOnInit(): void {
  this.authService.getUserSession().then((ctx) => {
   this.isAuthenticated$ = !!ctx.data?.session;
  });
 }
 async anaonymousLogin() {
  await this.authService.authClient.signIn.anonymous({}, {
   onSuccess: (ctx) => {
    // First reload the current route to remount the component
    this.router.navigateByUrl('/', { skipLocationChange: true });
    // Then navigate to the account page
    this.router.navigate(["/account"]);
   },
   onError: (ctx) => {
    alert(ctx.error.message);
   },
  });
 }
 public toggleMobileMenu(): void {
  this.menuService.showMobileMenu = true;
 }
}
