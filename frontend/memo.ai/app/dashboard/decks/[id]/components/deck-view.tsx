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
        stats: "12 pendientes"
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
        stats: "Mejor: 80%"
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
        stats: "Nuevo"
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
        stats: "Leer"
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
        <div className="min-h-screen pb-20">
            {/* Fixed Background Hero - only the image */}
            <div className="fixed top-0 left-0 right-0 h-[60vh] min-h-[450px] max-h-[700px] -z-10">
                <Image 
                    src={coverImage} 
                    alt="Deck Cover"
                    fill
                    unoptimized
                    priority
                    className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-50" />
            </div>

            {/* Content Container - flows naturally */}
            <div className="relative">
                {/* Hero Section with transparent background */}
                <div className="pt-4 pb-8">
                    <div className="max-w-7xl mx-auto px-4">
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

                        {/* Hero Content */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 max-w-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-lg bg-indigo-600/90 text-white backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                                    PDF Document
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">
                                    <Clock className="w-3.5 h-3.5" /> Último repaso: {DECK.stats.lastStudy}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tighter drop-shadow-sm">
                                {DECK.title}
                            </h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                {DECK.description}
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
                                        {DECK.summary}
                                    </p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <Button variant="ghost" className="h-8 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 hover:px-2 transition-all">
                                            Leer completo <ArrowRight className="w-3 h-3 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

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
                                    <motion.button
                                        key={mode.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + (index * 0.1) }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className={`group flex flex-col text-left p-6 bg-white border border-slate-150 shadow-2xl shadow-slate-200/40 rounded-3xl hover:border-transparent hover:shadow-2xl hover:shadow-${mode.color.split('-')[1]}-500/20 transition-all duration-300 relative overflow-hidden h-full`}
                                    >
                                        <div className={`absolute inset-0 bg-linear-to-br ${mode.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        
                                        <div className={`absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${mode.color}`}>
                                            <mode.icon className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
                                        </div>

                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div className={`w-12 h-12 rounded-2xl ${mode.bg} ${mode.border} border flex items-center justify-center ${mode.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                                <mode.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/80 text-slate-500 border border-slate-200 backdrop-blur-sm shadow-sm group-hover:bg-white">
                                                {mode.stats}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-auto relative z-10 w-full">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-black transition-colors">
                                                    {mode.title}
                                                </h3>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider opacity-80">
                                                    {mode.desc}
                                                </p>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-${mode.color.split('-')[1]}-100 text-${mode.color.split('-')[1]}-600`}>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Flashcard Preview */}
                        <div>
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <div className="bg-slate-100 p-2 rounded-xl text-slate-600"><Layers className="w-5 h-5" /></div>
                                Cuestionario de Preguntas
                            </h2>
                            <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-lg shadow-slate-200/20 overflow-hidden">
                                {[
                                    { q: "¿Cuál es la función principal de la mielina?", a: "Aumentar la velocidad del impulso nervioso (conducción saltatoria)." },
                                    { q: "¿Qué neurotransmisor está asociado al placer?", a: "Dopamina." },
                                    { q: "Diferencia entre aferente y eferente.", a: "Aferente lleva info al SNC (sensorial), Eferente lleva info del SNC (motor)." }
                                ].map((card, i) => (
                                    <div key={i} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50/80 transition-colors group cursor-help">
                                        <div className="flex-1">
                                            <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest mb-2 block">Pregunta {i+1}</span>
                                            <p className="text-base font-bold text-slate-800 leading-snug">{card.q}</p>
                                        </div>
                                        <div className="hidden md:block w-px bg-slate-100 self-stretch" />
                                        <div className="flex-1 relative">
                                            <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest mb-2 block">Respuesta</span>
                                            <div className="relative overflow-hidden rounded-lg">
                                                <p className="text-sm font-medium text-slate-700 blur-sm group-hover:blur-none transition-all duration-300 select-none">
                                                    {card.a}
                                                </p>
                                                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm border border-slate-200">
                                                        Hover para revelar
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3 bg-slate-50/50 text-center border-t border-slate-100">
                                    <Button variant="ghost" className="text-xs font-bold text-slate-500 hover:text-indigo-600">
                                        Ver las 45 cartas <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Key Concepts */}
                        <div>
                             <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <div className="bg-slate-100 p-2 rounded-xl text-slate-600"><Tag className="w-5 h-5" /></div>
                                Conceptos Clave
                            </h2>
                            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                <div className="flex flex-wrap gap-2.5">
                                    {CONCEPTS.map((concept, i) => (
                                        <motion.div 
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold border border-slate-100 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-default"
                                        >
                                            {concept}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
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
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                <History className="w-3 h-3" /> Historial
                            </h3>
                            <div className="space-y-5">
                                {ACTIVITY.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group relative pl-3">
                                        {/* Timeline Line */}
                                        {i !== ACTIVITY.length - 1 && (
                                            <div className="absolute left-[5.5px] top-2 bottom-[-20px] w-0.5 bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                                        )}
                                        
                                        <div className={`relative z-10 w-2.5 h-2.5 mt-1.5 rounded-full ring-4 ring-white shadow-sm shrink-0 ${item.color.replace('text-', 'bg-')}`} />
                                        
                                        <div className="flex-1 -mt-0.5">
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer">
                                                {item.label}
                                            </p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-[10px] font-medium text-slate-400">{item.date}</span>
                                                {item.score && (
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">
                                                        {item.score}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Documents Uploaded */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Documentos del Mazo
                            </h3>
                            <div className="space-y-4">
                                {DOCUMENTS.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3 group p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                        <div className={`w-10 h-10 rounded-lg ${doc.bg} border border-slate-100 flex items-center justify-center shrink-0`}>
                                            <doc.icon className={`w-5 h-5 ${doc.color}`} />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                                                {doc.name}
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{doc.type}</span>
                                                <span className="text-[10px] font-medium text-slate-400">• {doc.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full text-xs font-bold h-9 border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50">
                                    + Añadir Documento
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            </div>
        </div>
    );
}
