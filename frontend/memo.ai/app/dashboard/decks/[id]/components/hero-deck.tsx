import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Play } from "lucide-react";
import { motion } from "motion/react";



interface DeckProps {
    id: number;
    title: string;
    description: string;
    summary: string;
    stats: {
        mastery: number;
        cardsTotal: number;
        cardsToReview: number;
        quizzesTaken: number;
        lastStudy: string;
    };
}

export default function HeroDeck({deck}: {deck: DeckProps}) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-2xl"
        >
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-indigo-600/90 text-white backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                    PDF Document
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5" /> Último repaso: {deck.stats.lastStudy}
                </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tighter drop-shadow-sm">
                {deck.title}
            </h1>
            <p className="text-lg text-white font-medium leading-relaxed">
                {deck.description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
                <Button className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
                    <Play className="w-4 h-4 mr-2 fill-current" /> Estudiar Ahora
                </Button>
                <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-300 bg-white/50 backdrop-blur-md hover:bg-white text-slate-700 font-bold">
                    <BookOpen className="w-4 h-4 mr-2" /> Ver Contenido
                </Button>
            </div>
        </motion.div>
    );
}