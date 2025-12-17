'use client'

import { Button } from "@/components/ui/button";
import { User } from "better-auth";
import { BrainCircuit, Plus, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection({user}: {user: User}) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[2rem] overflow-hidden bg-slate-900 text-white shadow-2xl"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-blob" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-blue-200 text-xs font-bold tracking-wider uppercase">
                        <Sparkles className="w-3 h-3 text-blue-400" /> Memo.ai Pro
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        Hola, {user?.name} <span className="inline-block animate-bounce origin-[70%_70%]">👋</span>
                    </h1>
                    <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-lg">
                        Tu cerebro está en racha. Has dominado <span className="text-white font-bold">12 conceptos nuevos</span> hoy. ¿Continuamos expandiendo tu conocimiento?
                    </p>
                    
                    <div className="flex items-center gap-4 pt-2">
                        <Button size="lg" className="h-12 px-8 rounded-full bg-primary hover:bg-primary text-white shadow-lg shadow-blue-500/25 border-0 font-semibold text-base transition-all hover:scale-105 active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Nuevo Mazo
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white backdrop-blur-md font-medium transition-all">
                            Ver Progreso
                        </Button>
                    </div>
                </div>

                {/* Visual Illustration: Abstract Learning Engine */}
                <div className="relative w-full max-w-sm aspect-square md:aspect-auto md:h-64 flex items-center justify-center">
                    {/* Central Brain */}
                    <div className="relative z-20 w-32 h-32 bg-linear-to-br from-primary to-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 animate-float">
                        <BrainCircuit className="w-16 h-16 text-white opacity-90" />
                    </div>
                    
                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 animate-spin-slow">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-white p-3 rounded-2xl shadow-xl shadow-white/10 animate-blob animation-delay-2000">
                            <Sparkles className="w-6 h-6 text-amber-500" />
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-x-4 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl rotate-[-12deg] z-10 animate-float animation-delay-2000">
                        <div className="w-8 h-1 bg-slate-600 rounded-full mb-1.5 opacity-50"/>
                        <div className="w-5 h-1 bg-slate-600 rounded-full opacity-50"/>
                    </div>
                    <div className="absolute bottom-0 right-10 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-xl rotate-[12deg] z-30 animate-float animation-delay-4000">
                        <div className="text-2xl font-bold text-white">A+</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}