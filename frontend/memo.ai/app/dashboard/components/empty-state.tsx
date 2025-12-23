'use client'

import { motion } from "motion/react";
import { Plus, Sparkles, FileUp, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyState() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-slate-200 hover:border-primary rounded-3xl bg-slate-50/50 transition-colors cursor-pointer"
        >
            {/* Ilustración abstracta animada */}
            <div className="relative mb-8">
                {/* Círculos de fondo con blur */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-32 h-32 bg-primary/10 rounded-full blur-xl"
                    />
                </div>
                <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4"
                >
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10 rotate-12">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-2 -left-6"
                >
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10 -rotate-12">
                        <Brain className="w-4 h-4 text-emerald-500" />
                    </div>
                </motion.div>
                
                {/* Icono principal */}
                <div className="relative w-24 h-24 bg-linear-to-br from-primary/5 to-primary/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-primary/20">
                    <FileUp className="w-10 h-10 text-primary/40" strokeWidth={1.5} />
                </div>
            </div>

            {/* Texto */}
            <div className="text-center max-w-sm mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Crea tu primer mazo
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Sube un documento PDF, imagen o apuntes y nuestra IA generará flashcards, quizzes y resúmenes automáticamente.
                </p>
            </div>

            {/* CTA Principal */}
            <Link href="/dashboard/createDeck">
                <Button 
                    size="lg" 
                    className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 font-semibold transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nuevo Mazo
                </Button>
            </Link>

            {/* Formatos soportados */}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <span>Soporta:</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">PDF</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">DOCX</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">PNG</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">JPG</span>
            </div>
        </motion.div>
    );
}
