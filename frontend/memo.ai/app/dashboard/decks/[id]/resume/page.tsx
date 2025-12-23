"use client";

import { motion } from "motion/react";
import { 
    ArrowLeft, Sparkles, BookOpen, Clock, 
    ChevronDown, ChevronUp, Lightbulb, 
    Target, FileText, Share2, Bookmark,
    Copy, Check
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock data - en producción vendría de la API
const RESUME_DATA = {
    deckTitle: "Anatomía Humana - Sistema Nervioso",
    generatedAt: "Hace 2 horas",
    readTime: "8 min de lectura",
    sections: [
        {
            id: 1,
            title: "Introducción al Sistema Nervioso",
            content: "El sistema nervioso es el conjunto de órganos y estructuras de control e información del cuerpo humano. Se divide en dos grandes partes: el Sistema Nervioso Central (SNC), compuesto por el encéfalo y la médula espinal, y el Sistema Nervioso Periférico (SNP), que incluye todos los nervios que conectan el SNC con el resto del cuerpo.",
            keyPoints: [
                "El SNC procesa y coordina la información sensorial y motora",
                "El SNP transmite señales entre el SNC y los órganos",
                "La división autónoma controla funciones involuntarias"
            ]
        },
        {
            id: 2,
            title: "La Neurona: Unidad Funcional",
            content: "La neurona es la célula fundamental del sistema nervioso, especializada en transmitir información mediante señales eléctricas y químicas. Cada neurona consta de tres partes principales: el soma o cuerpo celular, que contiene el núcleo; las dendritas, que reciben señales de otras neuronas; y el axón, una prolongación que transmite impulsos hacia otras células.",
            keyPoints: [
                "Las dendritas reciben información de hasta 10,000 neuronas",
                "El axón puede medir desde 1mm hasta más de 1 metro",
                "La vaina de mielina acelera la transmisión del impulso"
            ]
        },
        {
            id: 3,
            title: "Sinapsis y Neurotransmisores",
            content: "La sinapsis es la zona de comunicación entre dos neuronas. Cuando un impulso eléctrico llega al terminal del axón, provoca la liberación de neurotransmisores en el espacio sináptico. Estos mensajeros químicos se unen a receptores en la neurona postsináptica, generando una nueva señal eléctrica o inhibiendo su generación.",
            keyPoints: [
                "Existen más de 100 tipos de neurotransmisores conocidos",
                "La dopamina está asociada al placer y la recompensa",
                "La serotonina regula el estado de ánimo y el sueño"
            ]
        },
        {
            id: 4,
            title: "El Potencial de Acción",
            content: "El potencial de acción es el impulso eléctrico que viaja a lo largo del axón. Se produce cuando la neurona alcanza un umbral de estimulación, provocando cambios en la permeabilidad de la membrana a los iones sodio y potasio. Este proceso sigue la ley del 'todo o nada': o se genera completamente o no se genera.",
            keyPoints: [
                "Dura aproximadamente 1-2 milisegundos",
                "Viaja a velocidades de hasta 120 m/s en axones mielinizados",
                "La conducción saltatoria aumenta la velocidad del impulso"
            ]
        }
    ],
    summary: "Este documento presenta los fundamentos del sistema nervioso humano, desde su organización general hasta los mecanismos moleculares de la transmisión sináptica. Los conceptos clave incluyen la estructura y función de las neuronas, el proceso de sinapsis química, y la generación del potencial de acción.",
    concepts: ["Neurona", "Sinapsis", "Neurotransmisor", "Potencial de acción", "Mielina", "SNC", "SNP", "Dendrita", "Axón", "Dopamina"]
};

export default function ResumePage() {
    const [expandedSections, setExpandedSections] = useState<number[]>([1, 2]);
    const [copied, setCopied] = useState(false);

    const toggleSection = (id: number) => {
        setExpandedSections(prev => 
            prev.includes(id) 
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(RESUME_DATA.summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
            {/* Header */}
            
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/dashboard/decks/1" 
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al Deck
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-500">
                            <Bookmark className="w-4 h-4 mr-2" />
                            Guardar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-500">
                            <Share2 className="w-4 h-4 mr-2" />
                            Compartir
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-8">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wide">Resumen IA</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            {RESUME_DATA.generatedAt}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <BookOpen className="w-3.5 h-3.5" />
                            {RESUME_DATA.readTime}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        {RESUME_DATA.deckTitle}
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed">
                        {RESUME_DATA.summary}
                    </p>
                </motion.div>

                {/* Quick Concepts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10"
                >
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Conceptos Clave
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {RESUME_DATA.concepts.map((concept, i) => (
                            <motion.span
                                key={concept}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15 + i * 0.03 }}
                                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default"
                            >
                                {concept}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-4 mb-10">
                    {RESUME_DATA.sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                                        {section.id}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {section.title}
                                    </h3>
                                </div>
                                {expandedSections.includes(section.id) ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                            </button>

                            {expandedSections.includes(section.id) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6"
                                >
                                    <div className="pl-12">
                                        <p className="text-slate-600 leading-relaxed mb-5">
                                            {section.content}
                                        </p>

                                        {/* Key Points */}
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                                            <h4 className="text-sm font-bold text-amber-700 mb-3 flex items-center gap-2">
                                                <Lightbulb className="w-4 h-4" />
                                                Puntos Clave
                                            </h4>
                                            <ul className="space-y-2">
                                                {section.keyPoints.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-amber-900">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 opacity-10">
                        <FileText className="w-48 h-48 -mr-12 -mt-12" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-indigo-200" />
                            <span className="text-sm font-semibold text-indigo-200">Resumen Ejecutivo</span>
                        </div>
                        
                        <p className="text-lg text-white/90 leading-relaxed mb-6">
                            {RESUME_DATA.summary}
                        </p>

                        <div className="flex items-center gap-3">
                            <Button 
                                onClick={handleCopy}
                                variant="secondary" 
                                className="bg-white/10 hover:bg-white/20 text-white border-0"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Copiado
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copiar resumen
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-wrap gap-4 justify-center"
                >
                    <Link href="/dashboard/decks/1/flashcards">
                        <Button className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700">
                            Estudiar con Flashcards
                        </Button>
                    </Link>
                    <Link href="/dashboard/decks/1/quiz">
                        <Button variant="outline" className="h-12 px-6 rounded-xl">
                            Hacer Quiz
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}