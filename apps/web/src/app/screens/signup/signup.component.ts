import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import { Eye, EyeClosed, LucideAngularModule } from "lucide-angular";
import { toast } from "ngx-sonner";
import { signUpSchema } from "../../models/validation.schemas";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		RouterLink,
		TanStackField,
		LucideAngularModule,
	],
})
export class SignupComponent {
	showPassword = false;
	showConfirmPassword = false;
	loading = signal<boolean>(false);
	readonly eyeOpen = Eye;
	readonly eyeClosed = EyeClosed;
	#router = inject(Router);
	signUpForm = injectForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			userName: "",
			name: "",
		},
		validators: {
			onChange: signUpSchema,
		},
		onSubmit: async (values) => {
			await this.authService.authClient.signUp.email(
				{
					email: values.value.email,
					password: values.value.password,
					name: values.value.name,
					username: values.value.userName,
				},
				{
					onRequest: () => {
						this.loading.set(true);
					},
					onSuccess: async (ctx) => {
						toast.message("Verification OTP sent", {
							description: "Please check your email for the verification OTP",
						});
						this.router.navigate(["/auth/otp"], {
							queryParams: { email: values.value.email },
						});
					},
					onError: (cxt) => {
						toast.error(cxt.error.message);
						this.loading.set(false);
					},
				},
			);
		},
	});
	canSubmit = injectStore(this.signUpForm, (state) => state.canSubmit);
	isSubmitting = injectStore(this.signUpForm, (state) => state.isSubmitting);
	authService = inject(AuthService);
	router = inject(Router);

	constructor() {
		console.log("hii", this.canSubmit(), this.isSubmitting());
	}
	togglePassword() {
		this.showPassword = !this.showPassword;
	}
	toggleConfirmPassword() {
		this.showConfirmPassword = !this.showConfirmPassword;
	}

	async signupWithGoogle() {
		try {
			await this.authService.authClient.signIn.social(
				{
					provider: "google",
					callbackURL: "/account",
				},
				{
					onRequest: () => {
						this.loading.set(true);
					},
					onSuccess: (ctx) => {
						this.loading.set(false);
						window.location.href = ctx.data.url;
					},
					onError: (ctx) => {
						this.loading.set(false);
						toast.error(ctx.error.message);
					},
				},
			);
			// this.router.navigate(["/account"]);
		} catch (err) {}
	}
}
