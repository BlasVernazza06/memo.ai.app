import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {GitHubLight, Google} from "@ridemountainpig/svgl-react";
import { signInWithSocial } from "@/lib/actions/auth-actions";

interface OAuthButtonsProps {
    disabled?: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

export default function OAuthButtons({ disabled, onLoadingChange }: OAuthButtonsProps) {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const onSubmitAuth = async (provider: "github" | "google") => {
        try {
            setIsLoading(provider);
            onLoadingChange?.(true);
            
            await signInWithSocial(provider)
            
        } catch (error) {
            console.log(error);
            setIsLoading(null);
            onLoadingChange?.(false);
        }
        // catch/finally logic to reset would go here when implemented
    };

    const isAnyLoading = isLoading !== null;

    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <Button
                className="border w-full bg-white text-black hover:bg-accent transition-colors duration-200"
                onClick={async () => onSubmitAuth("google")}
                disabled={disabled || isAnyLoading}
            >
                {isLoading === "google" ? <Spinner /> : <Google />}
                {isLoading === "google" ? "Conectando..." : "Google"}
            </Button>
            <Button
                className="border w-full bg-white text-black hover:bg-accent transition-colors duration-200"
                onClick={async () => onSubmitAuth("github")}
                disabled={disabled || isAnyLoading}
            >
                {isLoading === "github" ? <Spinner /> : <GitHubLight />}
                {isLoading === "github" ? "Conectando..." : "Github"}
            </Button>
        </div>
    );
}