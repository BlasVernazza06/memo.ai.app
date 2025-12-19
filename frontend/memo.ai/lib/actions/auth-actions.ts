"use server"

import { redirect } from "next/navigation";
import { auth } from "../auth" // ensure this path is correct relative to file location
import { headers } from "next/headers"

export const signIn = async (data: { email: string; password: string; callbackURL?: string }) => {
    const result = await auth.api.signInEmail({
        body: {
            email: data.email,
            password: data.password,
            callbackURL: data.callbackURL || "/dashboard",
        },
        headers: await headers()
    })
    return result;
}

export const signUp = async (data: { email: string; password: string; name: string; callbackURL?: string }) => {
    const result = await auth.api.signUpEmail({
        body: {
            email: data.email,
            password: data.password,
            name: data.name,
            callbackURL: data.callbackURL || "/dashboard",
        },
        headers: await headers()
    })
    return result;
}

export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers()
    })
    redirect("/")
}

export const signInWithSocial = async (provider: string) => {
    const {url} = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: "/dashboard"
        },
    });

    if(url){
        redirect(url)
    }
};

export const forgetPassword = async (data: { email: string; redirectTo?: string }) => {
    try {
        const result = await auth.api.requestPasswordReset({
            body: {
                email: data.email,
                redirectTo: data.redirectTo || "/auth/reset-password",
            },
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Error sending reset email:", error);
        return { success: false, error: "No se pudo enviar el correo de recuperación" };
    }
};

export const resetPassword = async (data: { newPassword: string; token: string }) => {
    try {
        const result = await auth.api.resetPassword({
            body: {
                newPassword: data.newPassword,
                token: data.token,
            },
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Error resetting password:", error);
        return { success: false, error: "No se pudo restablecer la contraseña" };
    }
};