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
            await resend.emails.send({
                // CAMBIA ESTO: Resend solo permite este remitente si no tienes dominio verificado
                from: "Memo AI <onboarding@resend.dev>", 
                to: user.email,
                subject: "Restablecer contraseña",
                react: ForgotPasswordEmail({ username: user.name, resetUrl: url }),
            });
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