'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import router from "next/router";
import {signOut} from "@/lib/actions/auth-actions";
import { User } from "better-auth";
import { useInitials } from "@/lib/hooks/use-initials";

type statusPlan = "free" | "pro" | "premium";

export default function UserButton({user}: {user: User}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div
            className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
            <div 
                onClick={() => setOpen(!open)}
                className={`relative group p-1.5 rounded-full transition-all duration-500 ease-out hover:scale-[1.02] ${open ? '-translate-y-45' : ''}`}
                style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.95) 100%)',
                    boxShadow: `
                        0 20px 40px -12px rgba(0,0,0,0.12),
                        0 0 0 1px rgba(0,0,0,0.06), 
                        0 1px 2px 0 rgba(255,255,255,0.8) inset,
                        0 -1px 2px 0 rgba(0,0,0,0.05) inset
                    `,
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* User Profile Button */}
                <button className="flex items-center gap-3 pr-2 pl-1.5 rounded-full outline-none transition-colors hover:bg-slate-50/50">
                    
                    {/* Avatar with Ring */}
                    <div className="relative">
                        <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                                boxShadow: '0 4px 12px rgba(37,99,235,0.25), inset 0 2px 2px rgba(255,255,255,0.25)'
                            }}
                        >
                            {useInitials(user?.name)}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Name & Badge */}
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-800 leading-none tracking-tight">{user?.name}</p>
                            <span className="text-[9px] uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 px-1.5 py-[2px] rounded-md shadow-sm">Pro</span>
                        </div>
                        
                        {/* Vertical Separator */}
                        <div className="w-px h-6 bg-slate-200" />

                        {/* Streak Component Integrated */}
                        <div className="relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-50/50 border border-orange-100/60 overflow-hidden group/streak">
                            {/* Animated Background Layers */}
                            <div className="absolute inset-0 bg-linear-to-t from-orange-400/10 to-transparent opacity-50 animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-orange-500/10 to-transparent translate-y-full group-hover/streak:translate-y-0 transition-transform duration-500" />
                            <div className="absolute -bottom-2 left-1 w-6 h-6 bg-orange-500/30 blur-xl rounded-full animate-pulse" />

                            <span className="text-sm leading-none relative z-10 drop-shadow-sm animate-bounce">🔥</span>
                            <div className="flex items-baseline gap-0.5 relative z-10">
                                <span className="font-bold text-orange-600 text-xs">7</span>
                                <span className="text-[10px] text-orange-600/80 font-medium sm:hidden">días</span>
                            </div>
                        </div>
                    </div>

                    {/* Expand Icon */}
                    <div className={`ml-1 text-slate-400 group-hover:text-slate-600 transition-all duration-300 ${open ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            transition: { duration: 0.2, ease: "easeOut", delay: 0.2 }
                        }}
                        exit={{ 
                            opacity: 0, 
                            y: 10, 
                            scale: 0.95,
                            transition: { duration: 0.05, ease: "easeIn", delay: 0 }
                        }}
                        className="absolute left-0 -bottom-3 w-full py-2 bg-white/80 backdrop-blur-xl border border-accnt shadow-2xl rounded-2xl -z-10 flex flex-col gap-1 overflow-hidden"
                        style={{
                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div className="px-2 space-y-1">
                            <Link 
                                href="/dashboard/profile"
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100/80 rounded-lg transition-colors text-left"
                            >
                                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">👤</span>
                                <div>
                                    <p className="font-semibold text-slate-900">Mi Perfil</p>
                                    <p className="text-xs text-muted-foreground">Gestionar cuenta</p>
                                </div>
                            </Link>
                            <Link 
                                href="/dashboard/settings#subscription"
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100/80 rounded-lg transition-colors text-left">
                                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-lg">💳</span>
                                <div>
                                    <p className="font-semibold text-slate-900">Suscripción</p>
                                    <p className="text-xs text-blue-600 font-medium">Plan Pro Activo</p>
                                </div>
                            </Link>
                            <div className="h-px bg-slate-100 my-1 mx-2" />
                            <button 
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                                <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-lg">🚪</span>
                                <span className="font-medium">Cerrar Sesión</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}