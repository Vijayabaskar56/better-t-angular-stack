import { betterAuth } from "better-auth";

import { admin, captcha, emailOTP, twoFactor, username } from "better-auth/plugins";
import { reverify } from "@better-auth-kit/reverify";
import FastifyBetterAuth from 'fastify-better-auth';
import fp from 'fastify-plugin';
import type { FastifyInstance } from "fastify";
import { sendMail } from "@server/lib/sendEmail";
import type { SendMailParams } from "@server/types";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { auth } from "@server/lib/auth";

const client = new MongoClient(process.env?.DATABASE_URL as string ?? '');
export const db = client.db();

// export const auth = (fastify: FastifyInstance) => betterAuth({
//     database: mongodbAdapter(db),
//     appName: 'my-app',
//     trustedOrigins: [fastify.config.CORS_ORIGIN],
//     // emailAndPassword: { enabled: true },
//     user: {
//         changeEmail: {
//             enabled: true,
//             sendChangeEmailVerification: async (
//                 { user, newEmail, url, token },
//                 request
//             ) => {
//                 const getParams = {
//                     subject: 'OTP for New User Mail updation',
//                     email: user.email,
//                     otp: url,
//                     app_name: fastify.config.APP_NAME,
//                     template: 'userUpdationOTP',
//                     support_mail: fastify.config.SUPPORTMAIL,
//                     image_path: fastify.config.IMAGEURL,
//                     mail_footer: fastify.config.MAIL_FOOTER
//                 }
//                 await sendMail(getParams)
//             }
//         },
//         deleteUser: {
//             enabled: true,
//             sendDeleteAccountVerification: async ({ user, url, token }) => {
//                 // Send delete account verification
//                 const getParams = {
//                     subject: 'Please Confirm Your Request to Delete Your Account',
//                     email: user.email,
//                     otp: url,
//                     app_name: fastify.config.APP_NAME,
//                     template: 'userUpdationOTP',
//                     support_mail: fastify.config.SUPPORTMAIL,
//                     image_path: fastify.config.IMAGEURL,
//                     mail_footer: fastify.config.MAIL_FOOTER
//                 }
//                 await sendMail(getParams)
//             },
//             beforeDelete: async user => {
//                 // Perform actions before user deletion
//             },
//             afterDelete: async user => {
//                 // Perform cleanup after user deletion
//             }
//         }
//     },
//     emailAndPassword: {
//         enabled: true
//     },
//     crossSubDomainCookies: {
//         enabled: true
//     },
//     logger: {
//         enabled: true,
//         level: 'debug',
//         log: console.log
//     },
//     plugins: [
//         emailOTP({
//             async sendVerificationOTP({ email, otp, type }) {
//                 console.log('Sending OTP to', email, otp)
//                 let params: SendMailParams
//                 if (type === 'sign-in') {
//                     // Send the OTP for sign-in
//                     params = {
//                         email: email,
//                         subject: 'Hi, Thank you for signing up with OpenBursa',
//                         otp: otp,
//                         app_name: fastify.config.APP_NAME,
//                         template: 'mail_verification',
//                         support_mail: fastify.config.SUPPORTMAIL,
//                         image_path: fastify.config.IMAGEURL,
//                         mail_footer: fastify.config.MAIL_FOOTER
//                     }
//                 } else if (type === 'email-verification') {
//                     // Send the OTP for email verification
//                     params = {
//                         email: email,
//                         subject: 'Hi, Thank you for signing up with OpenBursa',
//                         otp: otp,
//                         app_name: fastify.config.APP_NAME,
//                         template: 'mail_verification',
//                         support_mail: fastify.config.SUPPORTMAIL,
//                         image_path: fastify.config.IMAGEURL,
//                         mail_footer: fastify.config.MAIL_FOOTER
//                     }
//                 } else {
//                     // Send the OTP for password reset
//                     params = {
//                         email: email,
//                         subject: 'Reset Password OTP',
//                         otp: otp,
//                         app_name: fastify.config.APP_NAME,
//                         template: 'forgotPassword',
//                         support_mail: fastify.config.SUPPORTMAIL,
//                         image_path: fastify.config.IMAGEURL,
//                         mail_footer: fastify.config.MAIL_FOOTER
//                     }
//                 }
//                 const result = await fastify.sendEmail(params)
//                 console.log("🚀 ~ :121 ~ sendVerificationOTP ~ result:", result)
//             },
//             sendVerificationOnSignUp: true,
//             expiresIn: 60 * 2 // 2 minutes
//         }),
//         twoFactor({
//             issuer: 'AuthFlow',
//             totpOptions: {
//                 digits: 6
//             },
//             otpOptions: {
//                 digits: 6
//             }
//         }),
//         username({
//             usernameValidator: (username) => {
//                 if (username === "admin") {
//                     return false;
//                 }
//                 return true;
//             }
//         }),
//         admin(),
//         reverify(),
//         // captcha({
//         //     provider: "cloudflare-turnstile", // or "google-recaptcha"
//         //     secretKey: fastify.config.TURNSTILE_SECRET_KEY!,
//         // }),
//     ],
//     // advanced: {
//     //   cookiePrefix: '',
//     //   crossSubDomainCookies: {
//     //     enabled: true
//     //   },
//     //   useSecureCookies: true
//     // },
//     // rateLimit: {
//     //   storage: 'secondary-storage',
//     //   window: 10, // time window in seconds
//     //   max: 30 // max requests in the window
//     // },
//     // secondaryStorage: {
//     //   get: async key => {
//     //     const value = await redis.get(key)
//     //     return value ? JSON.stringify(value) : null
//     //   },
//     //   set: async (key, value, ttl) => {
//     //     // or for ioredis:
//     //     if (ttl) await redis.set(key, value, 'EX', ttl)
//     //     else await redis.set(key, value)
//     //   },
//     //   delete: async key => {
//     //     await redis.del(key)
//     //   },
//     // defaultCookieAttributes: {
//     //   sameSite: "none",
//     //   secure: true,
//     // },
//     // },
//     // Removed duplicate trustedOrigins property
// });


async function authPlugin(fastify: FastifyInstance) {
    await fastify.register(fp((instance, opts, done) => {
        FastifyBetterAuth(instance, { auth: auth });
        done();
    }));
}

export default fp(authPlugin, {
    name: 'auth-plugin',
});
