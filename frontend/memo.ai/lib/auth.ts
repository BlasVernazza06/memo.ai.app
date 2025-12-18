import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { schema} from "@/db/schema";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/app/auth/components/forgot-password-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({user, url}) => {
            resend.emails.send({
                from: "Memo AI <onboarding@memo.ai>",
                to: user.email,
                subject: "Reset Password",
                react: ForgotPasswordEmail ({username:user.name, resetUrl:url}),
            })
        }
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [
      nextCookies()   
    ],
});