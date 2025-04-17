import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import { LucideAngularModule } from "lucide-angular";
import { Eye, EyeClosed } from "lucide-angular";
import { toast } from "ngx-sonner";
import { loginSchema, reverifySchema } from "../../models/validation.schemas";
import { AuthService } from "../../services/auth.service";

@Component({
 selector: "app-passkey",
 imports: [CommonModule, RouterModule, TanStackField, LucideAngularModule],
 standalone: true,
 templateUrl: "./passkey.component.html",
 styleUrl: "./passkey.component.css",
})
export class PasskeyComponent {
 error = "";
 showPassword = false;
 readonly eyeOpen = Eye;
 readonly eyeClosed = EyeClosed;
 authService = inject(AuthService);
 router = inject(Router);
 loading = signal<boolean>(false);
 logInForm = injectForm({
  defaultValues: {
   email: "",
  },
  validators: {
   onChange: reverifySchema,
  },
  onSubmit: async (values) => {
   await this.authService.authClient.emailOtp.sendVerificationOtp(
    {
     email: values.value.email,
     type: "email-verification",
    },
    {
     onSuccess: (ctx) => {

      this.router.navigate(["/auth/otp", { email: values.value.email }]);
     },
     onError: (ctx) => {
      alert(ctx.error.message);
     },
    },
   );
  },
 });
 canSubmit = injectStore(this.logInForm, (state) => state.canSubmit);
 isSubmitting = injectStore(this.logInForm, (state) => state.isSubmitting);
}
