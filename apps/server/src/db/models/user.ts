import { Schema, model, type InferSchemaType } from 'mongoose';

/**
 * User Schema
 */
const userSchema = new Schema(
 {
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  twoFactorEnabled: { type: Boolean, default: false },
  username: { type: String },
  displayUsername: { type: String },
  phoneNumber: { type: String },
  phoneNumberVerified: { type: Boolean, default: false },
  isAnonymous: { type: Boolean, default: false },
  stripeCustomerId: { type: String }
 },
 { timestamps: true }
);

/**
 * Session Schema
 */
const sessionSchema = new Schema(
 {
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
 },
 { timestamps: true }
);

/**
 * Account Schema
 */
const accountSchema = new Schema(
 {
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
  accountId: { type: String, required: true, unique: true },
  providerId: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  refreshTokenExpiresAt: { type: Date },
  scope: { type: String },
  idToken: { type: String },
  password: { type: String, select: false }, // Do not return passwords in queries by default
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
 },
 { timestamps: true }
);

/**
 * Verification Schema
 */
const verificationSchema = new Schema(
 {
  id: { type: String, required: true, unique: true },
  identifier: { type: String, required: true },
  value: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
 },
 { timestamps: true }
);

const twoFactorSchema = new Schema(
 {
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
  secret: { type: String, required: true },
  backupCodes: { type: String }
 },
 { timestamps: true }
);

const passkeySchema = new Schema({
 id: { type: String, required: true, unique: true },
 name: { type: String },
 publicKey: { type: String },
 userId: { type: String, required: true, ref: 'User' },
 credentialID: { type: String },
 counter: { type: Number },
 deviceType: { type: String },
 backedUp: { type: Boolean },
 transports: { type: String },
 createdAt: { type: Date, default: Date.now }
});


const subscriptionSchema = new Schema({
 id: { type: String, required: true, unique: true },
 plan: { type: String },
 referenceId: { type: String, required: true, ref: 'User' },
 stripeCustomerId: { type: String },
 stripeSubscriptionId: { type: String },
 status: { type: String },
 periodStart: { type: Date },
 periodEnd: { type: Date },
 cancelAtPeriodEnd: { type: Boolean },
 seats: { type: Number },
 trialStart: { type: Date },
 trialEnd: { type: Date }
});
/**
 * Models
*/
type UserType = InferSchemaType<typeof userSchema>;
type SessionType = InferSchemaType<typeof sessionSchema>;
type AccountType = InferSchemaType<typeof accountSchema>;
type VerificationType = InferSchemaType<typeof verificationSchema>;
type TwoFactorType = InferSchemaType<typeof twoFactorSchema>;
type PasskeyType = InferSchemaType<typeof passkeySchema>;
type SubscriptionType = InferSchemaType<typeof subscriptionSchema>;

export {
 userSchema,
 sessionSchema,
 accountSchema,
 verificationSchema,
 twoFactorSchema,
 passkeySchema,
 subscriptionSchema,
 type UserType,
 type SessionType,
 type AccountType,
 type VerificationType,
 type TwoFactorType,
 type PasskeyType,
 type SubscriptionType
};
