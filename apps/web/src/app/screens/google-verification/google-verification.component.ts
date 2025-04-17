import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import { QrCodeComponent } from "ng-qrcode";
import { toast } from "ngx-sonner";
import { totpSchema } from "../../models/validation.schemas";
import { AuthService } from "../../services/auth.service";
@Component({
 selector: "app-google-verification",
 imports: [QrCodeComponent, TanStackField, CommonModule],
 templateUrl: "./google-verification.component.html",
 styleUrl: "./google-verification.component.css",
})
export class GoogleVerificationComponent {
 authService = inject(AuthService);
 _activeRoute = inject(ActivatedRoute);
 _router = inject(Router);
 code$ = signal("");
 async ngOnInit() {
  this._activeRoute.queryParams.subscribe((params) => {
   // biome-ignore lint/complexity/useLiteralKeys: <explanation>
   this.code$.set(params["totpURI"]);
  });
 }
 totpForm = injectForm({
  defaultValues: {
   code: "",
  },
  validators: {
   onChange: totpSchema,
  },
  onSubmit: async ({ value }) => {
   await this.authService.authClient.twoFactor.verifyTotp(
    {
     code: value.code,
    },
    {
     onSuccess: (ctx) => {
      toast.success("2fa Verification Enable Successfully");
      this._router.navigate(["/account"]);
     },
     onError: (ctx) => {
      toast.error(ctx.error.message);
     },
    },
   );
  },
 });
 canSubmit = injectStore(this.totpForm, (state) => state.canSubmit);
 isSubmitting = injectStore(this.totpForm, (state) => state.isSubmitting);
}
