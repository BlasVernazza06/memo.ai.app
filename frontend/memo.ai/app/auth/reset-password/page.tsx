"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/schemas/auth-schema"
import { resetPassword } from "@/lib/actions/auth-actions"

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: ResetPasswordFormValues) => {
        if (!token) {
            setError("Token de recuperación no encontrado")
            return
        }

        setError(null)
        try {
            const result = await resetPassword({
                newPassword: values.password,
                token: token,
            })

            if (!result.success) {
                setError(result.error || "Error al restablecer la contraseña")
            } else {
                setIsSubmitted(true)
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
        }
    }

    // Success state
    if (isSubmitted) {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Contraseña restablecida!</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
                <Link href="/auth?authForm=login">
                    <Button className="mt-4 w-full h-11 rounded-xl">
                        Iniciar sesión
                    </Button>
                </Link>
            </div>
        )
    }

    // No token state
    if (!token) {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Enlace inválido</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    El enlace de recuperación no es válido o ha expirado. Por favor, solicita uno nuevo.
                </p>
                <Link href="/auth/forgot-password">
                    <Button variant="outline" className="mt-4 w-full h-11 rounded-xl">
                        Solicitar nuevo enlace
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
                    Nueva contraseña
                </h2>
                <p className="text-muted-foreground">
                    Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
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
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...form.register("password")}
                            disabled={form.formState.isSubmitting}
                            className="rounded-xl h-11 bg-background/50 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {form.formState.errors.password && (
                        <p className="text-xs text-destructive mt-1 font-medium">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...form.register("confirmPassword")}
                        disabled={form.formState.isSubmitting}
                        className="rounded-xl h-11 bg-background/50"
                    />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-xs text-destructive mt-1 font-medium">
                            {form.formState.errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-11 rounded-xl font-medium text-base mt-2"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />}
                    Restablecer contraseña
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