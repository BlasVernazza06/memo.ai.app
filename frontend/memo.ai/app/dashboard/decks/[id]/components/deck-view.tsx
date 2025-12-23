"use client";

import { motion } from "motion/react";
import { 
    BrainCircuit, Layers, HelpCircle, 
    CheckCircle2, FileText, ArrowLeft,
    Sparkles, Clock, Tag, History,
    ArrowRight, Play, BookOpen
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StudyMethodsCard from "./study-methods-card";
import QuestionsPreviewCard from "./questions-preview-card";
import SummaryResumeCard from "./summary-resume-card";
import DocumentsUploaded from "./documents-uploaded";
import RecentActivities from "./recent-activities";
import HeroDeck from "./hero-deck";
import KeyConcepts from "./key-concepts";
import FlashcardPreviewSection from "./flashcard-preview-section";

// Mock Data (Moved inside or kept separate, passed as props in real app)
const DECK = {
    id: 1,
    title: "Anatomía Humana - Sistema Nervioso",
    description: "Exploración completa del sistema nervioso central y periférico, incluyendo neuronas, sinapsis y neurotransmisores.",
    summary: "Este documento cubre la estructura fundamental del sistema nervioso. Destaca la diferencia entre el SNC y el SNP, detalla la estructura de la neurona (axón, dendritas) y explica el potencial de acción. Se hace énfasis en la plasticidad cerebral y los principales neurotransmisores como la dopamina y serotonina.",
    stats: {
        mastery: 68,
        cardsTotal: 45,
        cardsToReview: 12,
        quizzesTaken: 2,
        lastStudy: "Hace 2 horas"
    }
};

const CONCEPTS = [
    "Neurona", "Sinapsis Química", "Neurotransmisores", "Potencial de Acción",
    "SNC vs SNP", "Vaina de Mielina", "Plasticidad Cerebral", "Lóbulo Frontal",
    "Dopamina", "Serotonina", "Axón"
];

const ACTIVITY = [
    { type: "quiz", label: "Quiz Challenge", date: "Hace 2 horas", score: "80%", icon: HelpCircle, color: "text-purple-600" },
    { type: "flashcards", label: "Repaso Flashcards", date: "Ayer", score: "45 cartas", icon: Layers, color: "text-blue-600" },
    { type: "summary", label: "Lectura de Resumen", date: "Hace 2 días", score: "Completado", icon: FileText, color: "text-amber-600" }
];

const DOCUMENTS = [
    { name: "Anatomía_Sistema_Nervioso.pdf", type: "PDF", size: "2.4 MB", date: "12 Oct", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
    { name: "Clase_Magistral_05.pptx", type: "PPTX", size: "12.5 MB", date: "10 Oct", icon: Layers, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "Apuntes_Clase_SNC.docx", type: "DOCX", size: "850 KB", date: "09 Oct", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" }
];

const MODES = [
    {
        id: "flashcards",
        title: "Flashcards",
        desc: "Repaso activo espaciado",
        icon: Layers,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        gradient: "from-blue-500/10 to-blue-500/5",
        stats: "12 pendientes",
        link: `/dashboard/decks/${DECK.id}/flashcards`
    },
    {
        id: "quiz",
        title: "Quiz Challenge",
        desc: "Pon a prueba tu conocimiento",
        icon: HelpCircle,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        gradient: "from-purple-500/10 to-purple-500/5",
        stats: "Mejor: 80%",
        link: `/dashboard/decks/${DECK.id}/quizzes`
    },
    {
        id: "true-false",
        title: "Verdadero / Falso",
        desc: "Velocidad y precisión",
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        gradient: "from-emerald-500/10 to-emerald-500/5",
        stats: "Nuevo",
        link: `/dashboard/decks/${DECK.id}/true-false`
    },
    {
        id: "summary",
        title: "Resumen IA",
        desc: "Puntos clave del documento",
        icon: FileText,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        gradient: "from-amber-500/10 to-amber-500/5",
        stats: "Leer",
        link: `/dashboard/decks/${DECK.id}/summary`
    }
];

const COVERS = [
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7260b66?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"
];

export default function DeckView() {
    const coverImage = COVERS[DECK.id % COVERS.length];

    return (
        <div className="min-h-screen pb-20 bg-slate-50">
            {/* Hero Section - scrolls with content */}
            <div className="relative">
                {/* Background Image - absolute within hero container */}
                <div className="absolute inset-0 h-[500px] overflow-hidden">
                    <Image 
                        src={coverImage} 
                        alt="Deck Cover"
                        fill
                        unoptimized
                        priority
                    />
                    {/* Gradient overlay - fades to page background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-50" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 pt-4 pb-16 min-h-[380px] flex flex-col">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        {/* Navigation */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md pl-2 pr-3 py-1 rounded-full transition-all group">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Dashboard
                            </Link>
                        </motion.div>
                    </div>
                    
                    {/* Spacer to push content to bottom */}
                    <div className="grow" />
                    
                    {/* Hero Deck Content */}
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <HeroDeck deck={DECK}/>
                    </div>
                </div>

                {/* Main Content - continues in same flow */}
                <main className="max-w-7xl mx-auto px-4 pt-8">
                <div className="grid lg:grid-cols-[260px_1fr_320px] gap-8 items-start">
                    
                    {/* LEFT COLUMN: Table of Contents & Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="hidden lg:block space-y-6 sticky top-24"
                    >
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 p-1">
                            <div className="p-4 border-b border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-3 h-3" /> Índice
                                </h3>
                            </div>
                            <nav className="p-2 space-y-0.5">
                                {["1. Introducción al SN", "2. Neuronas y Glía", "3. Sinapsis Química", "4. Neurotransmisores", "5. Potencial de Acción", "6. Anatomía del Encéfalo"].map((item, i) => (
                                    <a key={i} href="#" className="flex items-center px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-all group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-500 mr-3 transition-colors" />
                                        <span className="truncate">{item}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-500/20 group">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <Sparkles className="w-24 h-24 rotate-12" />
                            </div>
                            <div className="bg-white/10 backdrop-blur-md w-8 h-8 rounded-lg flex items-center justify-center mb-4">
                                <BrainCircuit className="w-4 h-4 text-indigo-100" />
                            </div>
                            <h4 className="font-bold text-sm mb-2 relative z-10">Neuro-Tip del Día</h4>
                            <p className="text-xs text-indigo-100 leading-relaxed relative z-10 font-medium opactiy-90">
                                &quot;La repetición espaciada es un 40% más efectiva que el estudio intensivo.&quot; - Intenta repasar este mazo mañana.
                            </p>
                        </div>
                    </motion.div>

                    {/* CENTER COLUMN: Main Content */}
                    <div className="space-y-8 min-w-0">
                        {/* AI Summary Card */}
                        <SummaryResumeCard summary={DECK.summary} deckId={DECK.id} />

                         {/* Study Modes Grid */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                    <div className="bg-slate-100 p-2 rounded-xl text-slate-600"><BrainCircuit className="w-5 h-5" /></div>
                                    Modos de Estudio
                                </h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-5">
                                {MODES.map((mode, index) => (
                                    <StudyMethodsCard key={mode.id} mode={mode} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* Flashcard Preview */}
                        <FlashcardPreviewSection />

                        {/* Key Concepts */}
                        <KeyConcepts concepts={CONCEPTS } />
                    </div>

                    {/* RIGHT COLUMN: Stats Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-6 sticky top-24 h-fit"
                    >
                        {/* Quick Stats in Hero */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex"
                        >
                           <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-2xl flex items-center gap-6.5 max-w-md">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-slate-900">{DECK.stats.cardsTotal}</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cartas</div>
                                </div>
                                <div className="w-px h-10 bg-slate-900/10" />
                                <div className="text-center">
                                    <div className="text-2xl font-black text-indigo-600">{DECK.stats.mastery}%</div>
                                    <div className="text-xs font-bold text-indigo-600/60 uppercase tracking-widest">Dominio</div>
                                </div>
                                <div className="w-px h-10 bg-slate-900/10" />
                                <div className="text-center">
                                    <div className="text-2xl font-black text-emerald-600">A</div>
                                    <div className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest">Grade</div>
                                </div>
                           </div>
                        </motion.div>

                        {/* Recent Activity */}
                        <RecentActivities activity={ACTIVITY}/>

                        {/* Documents Uploaded */}
                        <DocumentsUploaded documents={DOCUMENTS}/>
                    </motion.div>
                </div>
            </main>
            </div>
        </div>
    );
}
