"use client";

import { AuthForm } from "./components/auth-form";
import { Suspense } from "react";

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-muted/20 rounded-xl" />}>
            <AuthForm />
        </Suspense>
    );
}