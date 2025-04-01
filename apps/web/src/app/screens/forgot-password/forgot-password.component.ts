import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import { CircleCheck, LucideAngularModule } from "lucide-angular";
import { toast } from "ngx-sonner";
import { forgotPasswordSchema } from "../../models/validation.schemas";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	standalone: true,
	imports: [CommonModule, FormsModule, TanStackField, LucideAngularModule],
})
export class ForgotPasswordComponent {
	readonly circleCheck = CircleCheck;
	authService = inject(AuthService);
	router = inject(Router);
	success = signal<boolean>(false);
	forgotPasswordForm = injectForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onChange: forgotPasswordSchema,
		},
		onSubmit: async (values) => {
			await this.authService.authClient.forgetPassword(
				{
					email: values.value.email,
					redirectTo: "http://localhost:5173/reset-password",
				},
				{
					// onSuccess: () => {
					//  toast.success('Kindly, check your inbox for password reset link');
					//  this.success.set(true);
					// },
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
		},
	});
	canSubmit = injectStore(this.forgotPasswordForm, (state) => state.canSubmit);
	isSubmitting = injectStore(
		this.forgotPasswordForm,
		(state) => state.isSubmitting,
	);
}
