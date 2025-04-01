import { z } from "zod";

const signUpSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
		userName: z.string().min(3, "Username must be at least 3 characters"),
		acceptTerms: z.boolean().default(false).optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean(),
});

const twoFaSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

const reverifySchema = z.object({
	email: z.string().email("Invalid email address"),
});
const resetPasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const kycSchema = z.object({
	location: z.tuple([
		z.string({
			required_error: "Country is required",
		}),
		z
			.string()
			.optional(), // State name, optional
	]),
	method: z.string().min(1, "Verification method is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	dateOfBirth: z.string().min(1, "Date of birth is required"),
	documentType: z.string(),
	documentNumber: z.string().min(1, "Document number is required"),
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	postalCode: z.string().min(1, "Postal code is required"),
	phoneNumber: z.string().min(1, "Phone number is required"),
	email: z.string().email("Invalid email format"),
	occupation: z.string().min(1, "Occupation is required"),
	sourceOfFunds: z.string().min(1, "Source of funds is required"),
	purposeOfAccount: z.string().min(1, "Purpose of account is required"),
	politicallyExposed: z.boolean(),
	documentImage: z.string().optional(),
	selfieImage: z.string().optional(),
});

const changePasswordSchema = z
	.object({
		currentPasswrd: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" })
			.regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" })
			.regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

const passwordSchema = z.object({
	password: z.string().min(1, "Password is required"),
});
const changeEmailSchema = z.object({
	email: z.string().email().nonempty(),
});
const totpSchema = z.object({
	code: z.string().length(6, "TOTP code must be 6 digits"),
});

const linkPhoneSchema = z.object({
	country: z.tuple([z.string(), z.string().optional()]),
	phone_number: z.string(),
	sms_verification_code: z.string(),
});

export {
	signUpSchema,
	loginSchema,
	twoFaSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
	kycSchema,
	changePasswordSchema,
	passwordSchema,
	changeEmailSchema,
	totpSchema,
	linkPhoneSchema,
	reverifySchema,
};
