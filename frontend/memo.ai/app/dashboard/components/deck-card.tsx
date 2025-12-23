'use client'

import { motion } from "motion/react"
import { BrainCircuit, Play, FileText, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface Deck {
    id: number;
    title: string;
    progress: number;
    cards: number;
    date: string;
    isNew?: boolean;
}

interface DeckCardProps {
    doc: Deck;
}

const COVERS = [
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80", // Books
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80", // Notes
    "https://images.unsplash.com/photo-1507842217343-583bb7260b66?auto=format&fit=crop&w=800&q=80", // Library
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", // Writing
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"  // White book
];

export default function DeckCard({ doc }: DeckCardProps) {
    const coverImage = COVERS[doc.id % COVERS.length];

    return (
        <Link href={`/dashboard/decks/${doc.id}`}>
            <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (doc.id * 0.1) }}
                whileHover={{ y: -5 }}
                className="group relative bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
                {/* Image Header */}
                <div className="h-36 w-full relative bg-slate-100 overflow-hidden">
                    <Image 
                        src={coverImage} 
                        alt="Deck Cover" 
                        fill
                        unoptimized
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Badge "Nuevo" */}
                    {doc.isNew && (
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 left-3 z-10"
                        >
                            <div className="px-2 py-1 bg-primary text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg shadow-primary/30">
                                <Sparkles className="w-3 h-3" />
                                Nuevo
                            </div>
                        </motion.div>
                    )}

                    <div className="absolute top-3 right-3 z-10">
                        <div className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white shadow-sm flex items-center gap-1.5 border border-white/30">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                           {doc.progress}%
                        </div>
                    </div>
                </div>
                
                {/* Content Container - Overlapping */}
                <div className="px-6 pb-6 pt-4 flex-1 flex flex-col relative">
                     {/* Icon - Floating overlap using margin negative */}
                    <div className="absolute -top-10 left-6 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-black/5 border border-transparent group-hover:border group-hover:border-primary flex items-center justify-center text-primary group-hover:scale-105 group-hover:text-primary transition-all duration-300">
                             <FileText className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                    </div>
                    
                    {/* Title & Info */}
                    <div className="space-y-3 mb-6 flex-1 mt-6">
                        <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {doc.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400"/> {doc.cards} cartas
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400"/> {doc.date}
                            </span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 mt-auto">
                        <div className="flex-1 space-y-2">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span>Progreso</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                <div 
                                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out group-hover:bg-primary"
                                    style={{width: `${doc.progress}%`}} 
                                />
                            </div>
                        </div>
                        <Button size="sm" className="h-9 w-9 p-0 rounded-full bg-primary text-white border border-transparent hover:bg-primary hover:text-white transition-all duration-300 shadow-sm group-hover:scale-105 group-hover:shadow-primary/25">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}