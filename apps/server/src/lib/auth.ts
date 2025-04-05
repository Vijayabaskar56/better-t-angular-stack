import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../../prisma/index";
import { sendMail } from './sendEmail.js'
import { admin, captcha, emailOTP, twoFactor, username } from "better-auth/plugins";
import { reverify } from "@better-auth-kit/reverify";
import type { SendMailParams } from "../types/index";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  appName: 'my-app',
  trustedOrigins: [process.env.CORS_ORIGIN].filter((origin): origin is string => !!origin),
  // emailAndPassword: { enabled: true },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url, token },
        request
      ) => {
        const getParams = {
          subject: 'OTP for New User Mail updation',
          email: user.email,
          otp: url,
          app_name: process.env.APP_NAME,
          template: 'userUpdationOTP',
          support_mail: process.env.SUPPORTMAIL,
          image_path: process.env.IMAGEURL,
          mail_footer: process.env.MAIL_FOOTER
        }
        await sendMail(getParams)
      }
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        // Send delete account verification
        const getParams = {
          subject: 'Please Confirm Your Request to Delete Your Account',
          email: user.email,
          otp: url,
          app_name: process.env.APP_NAME,
          template: 'userUpdationOTP',
          support_mail: process.env.SUPPORTMAIL,
          image_path: process.env.IMAGEURL,
          mail_footer: process.env.MAIL_FOOTER
        }
        await sendMail(getParams)
      },
      beforeDelete: async user => {
        // Perform actions before user deletion
      },
      afterDelete: async user => {
        // Perform cleanup after user deletion
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  crossSubDomainCookies: {
    enabled: true
  },
  logger: {
    enabled: true,
    level: 'debug',
    log: console.log
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log('Sending OTP to', email, otp)
        let params: SendMailParams
        if (type === 'sign-in') {
          // Send the OTP for sign-in
          params = {
            email: email,
            subject: 'Hi, Thank you for signing up with OpenBursa',
            otp: otp,
            app_name: process.env.APP_NAME,
            template: 'mail_verification',
            support_mail: process.env.SUPPORTMAIL,
            image_path: process.env.IMAGEURL,
            mail_footer: process.env.MAIL_FOOTER
          }
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
          params = {
            email: email,
            subject: 'Hi, Thank you for signing up with OpenBursa',
            otp: otp,
            app_name: process.env.APP_NAME,
            template: 'mail_verification',
            support_mail: process.env.SUPPORTMAIL,
            image_path: process.env.IMAGEURL,
            mail_footer: process.env.MAIL_FOOTER
          }
        } else {
          // Send the OTP for password reset
          params = {
            email: email,
            subject: 'Reset Password OTP',
            otp: otp,
            app_name: process.env.APP_NAME,
            template: 'forgotPassword',
            support_mail: process.env.SUPPORTMAIL,
            image_path: process.env.IMAGEURL,
            mail_footer: process.env.MAIL_FOOTER
          }
        }
        await sendMail(params)
      },
      sendVerificationOnSignUp: true,
      expiresIn: 60 * 2 // 2 minutes
    }),
    twoFactor({
      issuer: 'AuthFlow',
      totpOptions: {
        digits: 6
      },
      otpOptions: {
        digits: 6
      }
    }),
    username({
      usernameValidator: (username) => {
        if (username === "admin") {
          return false;
        }
        return true;
      }
    }),
    admin(),
    reverify(),
    captcha({
      provider: "cloudflare-turnstile", // or "google-recaptcha"
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    }),
  ],
  // advanced: {
  //   cookiePrefix: '',
  //   crossSubDomainCookies: {
  //     enabled: true
  //   },
  //   useSecureCookies: true
  // },
  // rateLimit: {
  //   storage: 'secondary-storage',
  //   window: 10, // time window in seconds
  //   max: 30 // max requests in the window
  // },
  // secondaryStorage: {
  //   get: async key => {
  //     const value = await redis.get(key)
  //     return value ? JSON.stringify(value) : null
  //   },
  //   set: async (key, value, ttl) => {
  //     // or for ioredis:
  //     if (ttl) await redis.set(key, value, 'EX', ttl)
  //     else await redis.set(key, value)
  //   },
  //   delete: async key => {
  //     await redis.del(key)
  //   },
  // defaultCookieAttributes: {
  //   sameSite: "none",
  //   secure: true,
  // },
  // },
  // Removed duplicate trustedOrigins property
});
