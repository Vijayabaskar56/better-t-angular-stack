import { CommonModule } from "@angular/common";
import { Component, ViewChild, inject, signal } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgOtpInputComponent } from "ng-otp-input";
import { toast } from "ngx-sonner";
import { AuthService } from "../../services/auth.service";
@Component({
	selector: "app-otp",
	templateUrl: "./otp.component.html",
	standalone: true,
	imports: [CommonModule, RouterLink, NgOtpInputComponent],
})
export class OTPComponent {
	timeLeft = 30;
	timerInterval: ReturnType<typeof setInterval> | undefined;
	canSubmit = signal(false);
	isSubmitting = signal(false);
	loading = signal(false);
	@ViewChild("ngOtpInput", { static: false }) ngOtpInput:
		| NgOtpInputComponent
		| undefined;
	route = inject(ActivatedRoute);
	router = inject(Router);
	authService = inject(AuthService);
	email = signal<string>("");
	otp = signal("");
	onOtpChange(otpvalue: string) {
		this.canSubmit.set(otpvalue.length === 6);
		this.otp.set(otpvalue);
		console.log(this.otp());
	}
	otpForm: FormGroup<{
		otp: FormControl<string>;
	}> = new FormGroup({
		otp: new FormControl("", { nonNullable: true }),
	});
	constructor() {
		this.startTimer();
		this.route.queryParams.subscribe((params) => {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			this.email.set(params["email"]);
		});
	}
	otpFields = Array(6).fill(0);

	ngOnDestroy() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
		}
	}

	startTimer() {
		this.timeLeft = 30;
		this.timerInterval = setInterval(() => {
			if (this.timeLeft > 0) {
				this.timeLeft--;
			} else {
				clearInterval(this.timerInterval);
			}
		}, 1000);
	}

	async resendOTP() {
		try {
			await this.authService.authClient.emailOtp.sendVerificationOtp({
				email: this.email(),
				type: "email-verification",
			});
			this.startTimer();
		} catch (error) {
			// Handle error
		}
	}

	async submitOTP() {
		if (!this.canSubmit()) return;
		this.isSubmitting.set(true);
		await this.authService.authClient.emailOtp.verifyEmail(
			{
				email: this.email(),
				otp: this.otp(),
			},
			{
				onRequest: () => {
					this.loading.set(true);
				},
				onSuccess: () => {
					this.loading.set(false);
					this.router.navigate(["/account"]);
				},
				onError: (ctx) => {
					this.loading.set(false);
					toast.error(ctx.error.message);
				},
			},
		);
	}
}
