import mongoose, { model } from "mongoose"
import { accountSchema, passkeySchema, sessionSchema, subscriptionSchema, twoFactorSchema, userSchema, verificationSchema, type AccountType, type PasskeyType, type SessionType, type SubscriptionType, type TwoFactorType, type UserType, type VerificationType } from "./user"
import { todoSchema, type TodoType } from "./todo";

export const db = {
    user: model<UserType & Document>('User', userSchema),
    session: model<SessionType & Document>('Session', sessionSchema),
    account: model<AccountType & Document>('Account', accountSchema),
    verification: model<VerificationType & Document>('Verification', verificationSchema),
    twoFactor: model<TwoFactorType & Document>('TwoFactor', twoFactorSchema),
    passkey: model<PasskeyType & Document>('Passkey', passkeySchema),
    subscription: model<SubscriptionType & Document>('Subscription', subscriptionSchema),
    todo: mongoose.model<TodoType & Document>('Todo', todoSchema),
};
