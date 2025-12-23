"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
    ArrowLeft, ArrowRight, RotateCcw, 
    Check, X, Layers, Clock,
    Sparkles, ChevronLeft, ChevronRight,
    Shuffle, Settings
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data
const FLASHCARDS = [
    {
        id: 1,
        front: "¿Cuál es la función principal de la mielina?",
        back: "Aumentar la velocidad del impulso nervioso mediante la conducción saltatoria. La mielina actúa como aislante eléctrico alrededor del axón.",
        category: "Neuroanatomía"
    },
    {
        id: 2,
        front: "¿Qué neurotransmisor está asociado al placer y la recompensa?",
        back: "La Dopamina. Es crucial en el sistema de recompensa del cerebro y está implicada en la motivación, el placer y el aprendizaje.",
        category: "Neurotransmisores"
    },
    {
        id: 3,
        front: "Diferencia entre neurona aferente y eferente",
        back: "Aferente (sensorial): lleva información hacia el SNC. Eferente (motora): lleva información desde el SNC hacia los músculos y glándulas.",
        category: "Tipos de Neuronas"
    },
    {
        id: 4,
        front: "¿Qué es el potencial de acción?",
        back: "Es el impulso eléctrico que viaja a lo largo del axón. Se genera cuando la neurona alcanza el umbral de excitación, siguiendo la ley del 'todo o nada'.",
        category: "Fisiología"
    },
    {
        id: 5,
        front: "¿Cuáles son las tres partes principales de una neurona?",
        back: "1. Soma (cuerpo celular): contiene el núcleo\n2. Dendritas: reciben señales\n3. Axón: transmite el impulso nervioso",
        category: "Neuroanatomía"
    }
];

const DECK_INFO = {
    title: "Sistema Nervioso",
    totalCards: FLASHCARDS.length
};

export default function FlashcardsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<number[]>([]);
    const [unknownCards, setUnknownCards] = useState<number[]>([]);
    const [direction, setDirection] = useState(0);

    const currentCard = FLASHCARDS[currentIndex];
    const progress = ((currentIndex + 1) / FLASHCARDS.length) * 100;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentIndex < FLASHCARDS.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
        }
    };

    const handleKnown = () => {
        if (!knownCards.includes(currentCard.id)) {
            setKnownCards([...knownCards, currentCard.id]);
            setUnknownCards(unknownCards.filter(id => id !== currentCard.id));
        }
        handleNext();
    };

    const handleUnknown = () => {
        if (!unknownCards.includes(currentCard.id)) {
            setUnknownCards([...unknownCards, currentCard.id]);
            setKnownCards(knownCards.filter(id => id !== currentCard.id));
        }
        handleNext();
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setKnownCards([]);
        setUnknownCards([]);
    };

    const isComplete = currentIndex === FLASHCARDS.length - 1 && isFlipped;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            href="/dashboard/decks/1" 
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al Deck
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Layers className="w-4 h-4" />
                                <span className="font-medium">{currentIndex + 1}/{FLASHCARDS.length}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleReset}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reiniciar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="h-1 bg-slate-100">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Stats Bar */}
                <div className="flex justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-slate-600">
                            Sabías: <span className="text-emerald-600 font-bold">{knownCards.length}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <span className="text-sm font-medium text-slate-600">
                            Repasar: <span className="text-rose-600 font-bold">{unknownCards.length}</span>
                        </span>
                    </div>
                </div>

                {/* Flashcard */}
                <div className="flex justify-center mb-8">
                    <div 
                        className="relative w-full max-w-xl aspect-[4/3] cursor-pointer perspective-1000"
                        onClick={handleFlip}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex + (isFlipped ? "-back" : "-front")}
                                initial={{ 
                                    rotateY: isFlipped ? -90 : 90,
                                    opacity: 0 
                                }}
                                animate={{ 
                                    rotateY: 0,
                                    opacity: 1 
                                }}
                                exit={{ 
                                    rotateY: isFlipped ? 90 : -90,
                                    opacity: 0 
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <div className={`
                                    w-full h-full rounded-3xl p-8 flex flex-col
                                    ${isFlipped 
                                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white' 
                                        : 'bg-white border-2 border-slate-200 text-slate-900'
                                    }
                                    shadow-2xl shadow-slate-300/50
                                `}>
                                    {/* Category Badge */}
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`
                                            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${isFlipped ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}
                                        `}>
                                            {isFlipped ? 'Respuesta' : currentCard.category}
                                        </span>
                                        <span className={`text-xs ${isFlipped ? 'text-white/60' : 'text-slate-400'}`}>
                                            Toca para voltear
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <p className={`
                                            text-center leading-relaxed
                                            ${isFlipped ? 'text-lg' : 'text-xl font-semibold'}
                                        `}>
                                            {isFlipped ? currentCard.back : currentCard.front}
                                        </p>
                                    </div>

                                    {/* Flip Indicator */}
                                    <div className="flex justify-center">
                                        <div className={`
                                            flex items-center gap-2 px-4 py-2 rounded-full text-sm
                                            ${isFlipped ? 'bg-white/10 text-white/80' : 'bg-slate-50 text-slate-500'}
                                        `}>
                                            <RotateCcw className="w-4 h-4" />
                                            {isFlipped ? 'Ver pregunta' : 'Ver respuesta'}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Action Buttons */}
                {isFlipped && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center gap-4 mb-8"
                    >
                        <Button
                            onClick={handleUnknown}
                            variant="outline"
                            className="h-14 px-8 rounded-2xl border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                        >
                            <X className="w-5 h-5 mr-2" />
                            No lo sabía
                        </Button>
                        <Button
                            onClick={handleKnown}
                            className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <Check className="w-5 h-5 mr-2" />
                            ¡Lo sabía!
                        </Button>
                    </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        variant="ghost"
                        className="h-12 px-6 rounded-xl"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Anterior
                    </Button>
                    
                    <Button
                        onClick={handleFlip}
                        variant="outline"
                        className="h-12 px-6 rounded-xl"
                    >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Voltear
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={currentIndex === FLASHCARDS.length - 1}
                        variant="ghost"
                        className="h-12 px-6 rounded-xl"
                    >
                        Siguiente
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                </div>

                {/* Card Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {FLASHCARDS.map((card, index) => (
                        <button
                            key={card.id}
                            onClick={() => {
                                setIsFlipped(false);
                                setCurrentIndex(index);
                            }}
                            className={`
                                w-3 h-3 rounded-full transition-all duration-200
                                ${index === currentIndex 
                                    ? 'bg-indigo-600 scale-125' 
                                    : knownCards.includes(card.id)
                                        ? 'bg-emerald-400'
                                        : unknownCards.includes(card.id)
                                            ? 'bg-rose-400'
                                            : 'bg-slate-300 hover:bg-slate-400'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>

            {/* Completion Modal */}
            <AnimatePresence>
                {knownCards.length + unknownCards.length === FLASHCARDS.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                ¡Sesión Completada!
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Has revisado todas las flashcards
                            </p>

                            <div className="flex justify-center gap-8 mb-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-emerald-600">{knownCards.length}</div>
                                    <div className="text-sm text-slate-500">Correctas</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-rose-600">{unknownCards.length}</div>
                                    <div className="text-sm text-slate-500">A repasar</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600">
                                        {Math.round((knownCards.length / FLASHCARDS.length) * 100)}%
                                    </div>
                                    <div className="text-sm text-slate-500">Dominio</div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {unknownCards.length > 0 && (
                                    <Button 
                                        onClick={handleReset}
                                        className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Repasar las que fallé
                                    </Button>
                                )}
                                <Button 
                                    onClick={handleReset}
                                    variant="outline" 
                                    className="w-full h-12 rounded-xl"
                                >
                                    Estudiar de nuevo
                                </Button>
                                <Link href="/dashboard/decks/1" className="w-full">
                                    <Button variant="ghost" className="w-full h-12 rounded-xl">
                                        Volver al Deck
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}