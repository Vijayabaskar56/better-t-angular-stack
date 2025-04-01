import type { z } from "zod";
import type {
	changeEmailSchema,
	changePasswordSchema,
	forgotPasswordSchema,
	kycSchema,
	linkPhoneSchema,
	loginSchema,
	passwordSchema,
	resetPasswordSchema,
	signUpSchema,
	totpSchema,
	twoFaSchema,
} from "./validation.schemas";
type LoginSchema = z.infer<typeof loginSchema>;
type SignUpSchema = z.infer<typeof signUpSchema>;
type TwoFaSchema = z.infer<typeof twoFaSchema>;
type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
type KYCSchema = z.infer<typeof kycSchema>;
type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
type PasswordSchema = z.infer<typeof passwordSchema>;
type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
type TOPTSchema = z.infer<typeof totpSchema>;
type LinkPhoneSchema = z.infer<typeof linkPhoneSchema>;

export type {
	SignUpSchema,
	LoginSchema,
	TwoFaSchema,
	ForgotPasswordSchema,
	ResetPasswordSchema,
	KYCSchema,
	ChangePasswordSchema,
	PasswordSchema,
	ChangeEmailSchema,
	TOPTSchema,
	LinkPhoneSchema,
};
