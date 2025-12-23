import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function SummaryResumeCard({ summary, deckId }: { summary: string, deckId: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
            
            <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0 shadow-inner">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-900 text-lg">Resumen Inteligente</h3>
                        <div className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-md">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-indigo-600 uppercase">AI Generated</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {summary}
                    </p>
                    <Link href={`/dashboard/decks/${deckId}/resume`} className="pt-4 flex items-center gap-4">
                        <Button variant="ghost" className="h-8 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 hover:px-2 transition-all">
                            Leer completo <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}