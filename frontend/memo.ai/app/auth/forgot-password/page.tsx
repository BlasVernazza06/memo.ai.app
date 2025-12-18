"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/lib/schemas/auth-schema"
import { forgetPassword } from "@/lib/actions/auth-actions"

export default function ForgotPasswordPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        setError(null)
        try {
            const result = await forgetPassword({
                email: values.email,
                redirectTo: "/auth/reset-password",
            })
            
            if (!result.success) {
                setError(result.error || "Error al enviar el correo")
            } else {
                setIsSubmitted(true)
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
        }
    }
    
    if (isSubmitted) {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Correo enviado!</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Hemos enviado las instrucciones para restablecer tu contraseña a <span className="font-medium text-foreground">{form.getValues("email")}</span>
                </p>
                <Link href="/auth">
                    <Button variant="outline" className="mt-4 w-full h-11 rounded-xl">
                        Volver al inicio de sesión
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Recuperar contraseña
                </h2>
                <p className="text-muted-foreground">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu cuenta
                </p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        {...form.register("email")}
                        disabled={form.formState.isSubmitting}
                        className="rounded-xl h-11 bg-background/50"
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs text-destructive mt-1 font-medium">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-11 rounded-xl font-medium text-base mt-2"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />}
                    Enviar enlace de recuperación
                </Button>
            </form>

            <div className="text-center mt-8 lg:hidden">
                <Link 
                    href="/auth?authForm=login"
                    className="inline-flex items-center gap-1 text-sm hover:underline font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft size={14} className="w-4 h-4 group-hover:-translate-x-1 transition-all"/>
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
    )
}
