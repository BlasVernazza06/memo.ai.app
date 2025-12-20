"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
    ArrowLeft, Check, X, 
    Trophy, Target, HelpCircle,
    RotateCcw, ChevronRight, Sparkles,
    Award, Zap
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data
const QUESTIONS = [
    {
        id: 1,
        question: "¿Cuál es la función principal de las dendritas?",
        options: [
            { id: "a", text: "Transmitir impulsos hacia otras neuronas" },
            { id: "b", text: "Recibir señales de otras neuronas" },
            { id: "c", text: "Producir neurotransmisores" },
            { id: "d", text: "Proteger el axón" }
        ],
        correctAnswer: "b",
        explanation: "Las dendritas son extensiones del cuerpo celular que reciben señales de otras neuronas y las transmiten hacia el soma."
    },
    {
        id: 2,
        question: "¿Qué estructura está cubierta por la vaina de mielina?",
        options: [
            { id: "a", text: "Dendritas" },
            { id: "b", text: "Soma" },
            { id: "c", text: "Axón" },
            { id: "d", text: "Sinapsis" }
        ],
        correctAnswer: "c",
        explanation: "La vaina de mielina envuelve el axón, proporcionando aislamiento eléctrico y permitiendo la conducción saltatoria del impulso nervioso."
    },
    {
        id: 3,
        question: "¿Cuál de los siguientes NO es un neurotransmisor?",
        options: [
            { id: "a", text: "Dopamina" },
            { id: "b", text: "Serotonina" },
            { id: "c", text: "Mielina" },
            { id: "d", text: "Acetilcolina" }
        ],
        correctAnswer: "c",
        explanation: "La mielina es una sustancia lipídica que forma una vaina alrededor de los axones, no es un neurotransmisor."
    },
    {
        id: 4,
        question: "El Sistema Nervioso Central está compuesto por:",
        options: [
            { id: "a", text: "Nervios craneales y espinales" },
            { id: "b", text: "Encéfalo y médula espinal" },
            { id: "c", text: "Sistema simpático y parasimpático" },
            { id: "d", text: "Neuronas sensoriales y motoras" }
        ],
        correctAnswer: "b",
        explanation: "El SNC está formado por el encéfalo (cerebro, cerebelo, tronco encefálico) y la médula espinal."
    },
    {
        id: 5,
        question: "¿Qué tipo de conducción nerviosa es más rápida?",
        options: [
            { id: "a", text: "Conducción continua" },
            { id: "b", text: "Conducción pasiva" },
            { id: "c", text: "Conducción saltatoria" },
            { id: "d", text: "Conducción química" }
        ],
        correctAnswer: "c",
        explanation: "La conducción saltatoria, que ocurre en axones mielinizados, es mucho más rápida porque el impulso 'salta' entre los nódulos de Ranvier."
    }
];

export default function QuizzesPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<{questionId: number, selectedOption: string, correct: boolean}[]>([]);

    const currentQuestion = QUESTIONS[currentIndex];
    const progress = ((currentIndex) / QUESTIONS.length) * 100;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    const handleSelectOption = (optionId: string) => {
        if (answered) return;
        setSelectedOption(optionId);
    };

    const handleSubmit = () => {
        if (!selectedOption || answered) return;
        
        setAnswered(true);
        const correct = selectedOption === currentQuestion.correctAnswer;
        
        if (correct) {
            setScore(score + 1);
        }
        
        setAnswers([...answers, {
            questionId: currentQuestion.id,
            selectedOption: selectedOption,
            correct
        }]);
    };

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setAnswered(false);
        setScore(0);
        setShowResults(false);
        setAnswers([]);
    };

    const getOptionStyle = (optionId: string) => {
        if (answered) {
            if (optionId === currentQuestion.correctAnswer) {
                return "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-400";
            }
            if (optionId === selectedOption && !isCorrect) {
                return "border-rose-400 bg-rose-50 ring-2 ring-rose-400";
            }
            return "border-slate-200 bg-slate-50 opacity-60";
        }
        
        if (optionId === selectedOption) {
            return "border-purple-400 bg-purple-50 ring-2 ring-purple-400";
        }
        
        return "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50";
    };

    const getGrade = () => {
        const percentage = (score / QUESTIONS.length) * 100;
        if (percentage >= 90) return { grade: "A+", color: "text-emerald-600", bg: "bg-emerald-50" };
        if (percentage >= 80) return { grade: "A", color: "text-emerald-600", bg: "bg-emerald-50" };
        if (percentage >= 70) return { grade: "B", color: "text-blue-600", bg: "bg-blue-50" };
        if (percentage >= 60) return { grade: "C", color: "text-amber-600", bg: "bg-amber-50" };
        return { grade: "D", color: "text-rose-600", bg: "bg-rose-50" };
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white">
            {/* Header */}
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
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full">
                            <HelpCircle className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-bold text-purple-600">
                                {currentIndex + 1}/{QUESTIONS.length}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                            <Target className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-600">{score} pts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Question Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                                    {currentIndex + 1}
                                </div>
                                <span className="text-sm font-medium text-slate-400">
                                    Pregunta {currentIndex + 1} de {QUESTIONS.length}
                                </span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
                                {currentQuestion.question}
                            </h2>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <motion.button
                                        key={option.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleSelectOption(option.id)}
                                        disabled={answered}
                                        className={`
                                            w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
                                            ${getOptionStyle(option.id)}
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`
                                                w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                                                ${answered && option.id === currentQuestion.correctAnswer
                                                    ? 'bg-emerald-500 text-white'
                                                    : answered && option.id === selectedOption && !isCorrect
                                                        ? 'bg-rose-500 text-white'
                                                        : selectedOption === option.id
                                                            ? 'bg-purple-500 text-white'
                                                            : 'bg-slate-100 text-slate-600'
                                                }
                                            `}>
                                                {answered && option.id === currentQuestion.correctAnswer ? (
                                                    <Check className="w-5 h-5" />
                                                ) : answered && option.id === selectedOption && !isCorrect ? (
                                                    <X className="w-5 h-5" />
                                                ) : (
                                                    option.id.toUpperCase()
                                                )}
                                            </div>
                                            <span className={`
                                                font-medium flex-1
                                                ${answered && option.id === currentQuestion.correctAnswer
                                                    ? 'text-emerald-700'
                                                    : answered && option.id === selectedOption && !isCorrect
                                                        ? 'text-rose-700'
                                                        : 'text-slate-700'
                                                }
                                            `}>
                                                {option.text}
                                            </span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Explanation */}
                        {answered && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`
                                    p-6 rounded-2xl mb-6
                                    ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}
                                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                        ${isCorrect ? 'bg-emerald-500' : 'bg-amber-500'} text-white
                                    `}>
                                        {isCorrect ? <Check className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className={`font-bold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                                            {isCorrect ? '¡Excelente!' : 'Explicación'}
                                        </p>
                                        <p className={`text-sm ${isCorrect ? 'text-emerald-600' : 'text-amber-700'}`}>
                                            {currentQuestion.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4">
                            {!answered ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!selectedOption}
                                    className="h-14 px-10 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-lg disabled:opacity-50"
                                >
                                    Confirmar respuesta
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-lg"
                                >
                                    {currentIndex < QUESTIONS.length - 1 ? (
                                        <>
                                            Siguiente pregunta
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </>
                                    ) : (
                                        <>
                                            Ver resultados
                                            <Trophy className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Results Modal */}
            <AnimatePresence>
                {showResults && (
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
                            {/* Grade Badge */}
                            <div className={`
                                w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center
                                ${getGrade().bg}
                            `}>
                                <span className={`text-4xl font-black ${getGrade().color}`}>
                                    {getGrade().grade}
                                </span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                ¡Quiz Completado!
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Has respondido todas las preguntas
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-emerald-50 rounded-2xl p-4">
                                    <div className="text-3xl font-bold text-emerald-600">{score}</div>
                                    <div className="text-xs text-emerald-600 font-medium">Correctas</div>
                                </div>
                                <div className="bg-rose-50 rounded-2xl p-4">
                                    <div className="text-3xl font-bold text-rose-600">{QUESTIONS.length - score}</div>
                                    <div className="text-xs text-rose-600 font-medium">Incorrectas</div>
                                </div>
                            </div>

                            {/* Score */}
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
                                <div className="text-5xl font-bold mb-1">
                                    {Math.round((score / QUESTIONS.length) * 100)}%
                                </div>
                                <div className="text-purple-200 text-sm">Puntuación Final</div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button 
                                    onClick={handleRestart}
                                    className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Intentar de nuevo
                                </Button>
                                <Link href="/dashboard/decks/1" className="w-full">
                                    <Button variant="outline" className="w-full h-12 rounded-xl">
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
