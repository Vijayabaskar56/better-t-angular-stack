import { CommonModule } from "@angular/common";
import {
 Component,
 type ElementRef,
 type OnInit,
 ViewChild,
 inject,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { Eye, EyeClosed, LucideAngularModule } from "lucide-angular";
import { toast } from "ngx-sonner";
import {
 changeEmailSchema,
 passwordSchema,
} from "../../models/validation.schemas";
import { AuthService } from "../../services/auth.service";

@Component({
 selector: "app-account",
 templateUrl: "./account.component.html",
 standalone: true,
 imports: [CommonModule, RouterModule, TanStackField, LucideAngularModule],
})
export class AccountComponent implements OnInit {
 @ViewChild("changeEmailModal")
 changeEmailModal!: ElementRef<HTMLDialogElement>;
 authService = inject(AuthService);
 router = inject(Router);
 showPassword = false;
 readonly eyeOpen = Eye;
 readonly eyeClosed = EyeClosed;
 passVerify = injectMutation(() => ({
  mutationFn: (password: string) =>
   this.authService.authClient.reverifyPassword(password),
 }));
 reverifyPassForm = injectForm({
  defaultValues: {
   password: "",
  },
  validators: {
   onChange: passwordSchema,
  },
  onSubmit: async ({ value }) => {
   await this.authService.authClient.twoFactor.enable(
    {
     password: value.password, // user password required
    },
    {
     onSuccess: (ctx) => {
      this.router.navigate(["/account/google-two-fa"], {
       queryParams: { totpURI: ctx.data.totpURI },
      });
     },
     onError: (ctx) => {
      toast.error(ctx.error.message);
     },
    },
   );
  },
 });
 changeEmailForm = injectForm({
  defaultValues: {
   email: "",
  },
  validators: {
   onChange: changeEmailSchema,
  },
  onSubmit: async ({ value }) => {
   await this.authService.authClient.changeEmail(
    {
     newEmail: value.email,
     callbackURL: "/account", //to redirect after verification
    },
    {
     onSuccess: (ctx) => {
      this.changeEmailModal.nativeElement.close();
      toast.success(
       "Email Change required to your email has been sended , please check your response",
      );
     },
     onError: (ctx) => {
      this.changeEmailModal.nativeElement.close();
      toast.error(ctx.error.message);
     },
    },
   );
  },
 });
 canSubmit = injectStore(this.reverifyPassForm, (state) => state.canSubmit);
 isSubmitting = injectStore(
  this.reverifyPassForm,
  (state) => state.isSubmitting,
 );
 logout() {
  this.authService.authClient.signOut(
   {},
   {
    onSuccess: (ctx) => {
     this.router.navigate(["/auth/login"]);
    },
    onError: (ctx) => {
     toast.error(ctx.error.message);
    },
   },
  );
 }
 togglePassword() {
  this.showPassword = !this.showPassword;
 }
 async deleteUser() {
  await this.authService.authClient.deleteUser({
   password: "password",
   callbackURL: "/goodbye", // you can provide a callback URL to redirect after deletion
  });
 }
 ngOnInit(): void { }
}
