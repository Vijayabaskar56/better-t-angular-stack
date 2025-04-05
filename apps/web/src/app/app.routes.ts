import type { Routes } from "@angular/router";
import { AppShellComponent } from "./app-shell/app-shell.component";
import { AppComponent } from "./app.component";
import { PasskeyComponent } from "./components/passkey/passkey.component";
import { TableComponent } from "./components/table/table.component";
import { AuthGuard } from "./guard/auth.guard";
import { AccountLayoutComponent } from "./layouts/account-layout.component";
import { AppLayoutComponent } from "./layouts/app-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout.component";
import { AccountComponent } from "./screens/account/account.component";
import { Error404Component } from "./screens/error404/error404.component";
import { ForgotPasswordComponent } from "./screens/forgot-password/forgot-password.component";
import { GoogleVerificationComponent } from "./screens/google-verification/google-verification.component";
import { LoginComponent } from "./screens/login/login.component";
import { OTPComponent } from "./screens/otp/otp.component";
import { SignupComponent } from "./screens/signup/signup.component";
import { TodoComponent } from "./screens/todo-list/todo.component";
export const routes: Routes = [
	{ path: "shell", component: AppShellComponent },
	{
		path: "",
		component: AppLayoutComponent,
		children: [
			{ path: "", component: AppComponent, pathMatch: "full" },
			{ path: "todo", component: TodoComponent, pathMatch: "full" },
		],
	},
	{
		path: "account",
		component: AccountLayoutComponent,
		children: [
			{
				path: "",
				component: AccountComponent,
				canActivate: [AuthGuard],
			},
			{
				path: "passkey",
				component: PasskeyComponent,
				canActivate: [AuthGuard],
			},
			{
				path: "google-two-fa",
				component: GoogleVerificationComponent,
				canActivate: [AuthGuard],
			},
			{
				path: "table",
				component: TableComponent,
				canActivate: [AuthGuard],
			},
		],
	},
	{
		path: "auth",
		component: AuthLayoutComponent,
		children: [
			{ path: "login", component: LoginComponent },
			{ path: "signup", component: SignupComponent },
			{ path: "forgot-password", component: ForgotPasswordComponent },
			{ path: "otp", component: OTPComponent },
		],
	},
	{ path: "404", component: Error404Component },
	{ path: "**", redirectTo: "404" },
];
