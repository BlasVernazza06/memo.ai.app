"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
    ArrowLeft, Check, X, Zap, 
    Clock, Trophy, Flame, Target,
    RotateCcw, ChevronRight, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data
const STATEMENTS = [
    {
        id: 1,
        statement: "La mielina aumenta la velocidad de transmisión del impulso nervioso.",
        isTrue: true,
        explanation: "Correcto. La mielina actúa como aislante y permite la conducción saltatoria, aumentando significativamente la velocidad."
    },
    {
        id: 2,
        statement: "Las dendritas transmiten el impulso nervioso hacia otras neuronas.",
        isTrue: false,
        explanation: "Falso. Las dendritas RECIBEN señales. Es el AXÓN el que transmite el impulso hacia otras neuronas."
    },
    {
        id: 3,
        statement: "El potencial de acción sigue la ley del 'todo o nada'.",
        isTrue: true,
        explanation: "Correcto. Una vez que se alcanza el umbral, el potencial de acción se genera completamente o no se genera."
    },
    {
        id: 4,
        statement: "La serotonina es el principal neurotransmisor asociado al movimiento muscular.",
        isTrue: false,
        explanation: "Falso. La serotonina está asociada al estado de ánimo. La ACETILCOLINA es el neurotransmisor del movimiento muscular."
    },
    {
        id: 5,
        statement: "El Sistema Nervioso Periférico incluye el cerebro y la médula espinal.",
        isTrue: false,
        explanation: "Falso. El cerebro y la médula espinal forman el Sistema Nervioso CENTRAL. El SNP incluye los nervios."
    },
    {
        id: 6,
        statement: "Las neuronas pueden regenerarse fácilmente como otras células del cuerpo.",
        isTrue: false,
        explanation: "Falso. Las neuronas tienen capacidad limitada de regeneración, aunque existe neurogénesis en algunas áreas."
    },
    {
        id: 7,
        statement: "La dopamina está relacionada con el sistema de recompensa del cerebro.",
        isTrue: true,
        explanation: "Correcto. La dopamina juega un papel crucial en la motivación, el placer y el aprendizaje por recompensa."
    },
    {
        id: 8,
        statement: "Un axón puede medir más de un metro de longitud.",
        isTrue: true,
        explanation: "Correcto. Los axones de las neuronas motoras que van desde la médula espinal hasta los pies pueden medir más de 1 metro."
    }
];

export default function TrueFalsePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<{id: number, correct: boolean}[]>([]);

    const currentStatement = STATEMENTS[currentIndex];
    const progress = ((currentIndex + 1) / STATEMENTS.length) * 100;
    const isCorrect = selectedAnswer === currentStatement.isTrue;

    // Timer
    useEffect(() => {
        if (!isTimerActive || answered || showResults) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeout();
                    return 15;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimerActive, answered, currentIndex, showResults]);

    const handleTimeout = () => {
        setAnswered(true);
        setSelectedAnswer(null);
        setStreak(0);
        setAnswers([...answers, { id: currentStatement.id, correct: false }]);
    };

    const handleAnswer = (answer: boolean) => {
        if (answered) return;

        setAnswered(true);
        setSelectedAnswer(answer);
        
        const correct = answer === currentStatement.isTrue;
        setAnswers([...answers, { id: currentStatement.id, correct }]);

        if (correct) {
            setScore(score + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > bestStreak) {
                setBestStreak(newStreak);
            }
        } else {
            setStreak(0);
        }
    };

    const handleNext = () => {
        if (currentIndex < STATEMENTS.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setAnswered(false);
            setSelectedAnswer(null);
            setTimeLeft(15);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setAnswered(false);
        setSelectedAnswer(null);
        setTimeLeft(15);
        setShowResults(false);
        setAnswers([]);
    };

    const getTimerColor = () => {
        if (timeLeft > 10) return "text-emerald-500";
        if (timeLeft > 5) return "text-amber-500";
        return "text-rose-500";
    };

    return (
        <div className="min-h-screen">
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
                        {/* Streak */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full">
                            <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500' : 'text-slate-300'}`} />
                            <span className="text-sm font-bold text-orange-600">{streak}</span>
                        </div>
                        
                        {/* Score */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                            <Target className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-600">{score}/{STATEMENTS.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="h-1.5 bg-slate-100">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-12">
                {/* Timer */}
                <div className="flex justify-center mb-8">
                    <motion.div 
                        key={timeLeft}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-full
                            ${answered ? 'bg-slate-100' : 'bg-white shadow-lg'}
                        `}
                    >
                        <Clock className={`w-5 h-5 ${answered ? 'text-slate-400' : getTimerColor()}`} />
                        <span className={`text-2xl font-bold tabular-nums ${answered ? 'text-slate-400' : getTimerColor()}`}>
                            {answered ? '--' : timeLeft}
                        </span>
                    </motion.div>
                </div>

                {/* Statement Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className={`
                            bg-white rounded-3xl p-8 shadow-xl border-2 mb-8
                            ${answered 
                                ? isCorrect 
                                    ? 'border-emerald-300 shadow-emerald-100' 
                                    : 'border-rose-300 shadow-rose-100'
                                : 'border-slate-200'
                            }
                        `}
                    >
                        {/* Question Number */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                                Afirmación {currentIndex + 1} de {STATEMENTS.length}
                            </span>
                            {answered && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`
                                        flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold
                                        ${isCorrect 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-rose-100 text-rose-700'
                                        }
                                    `}
                                >
                                    {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                                </motion.span>
                            )}
                        </div>

                        {/* Statement */}
                        <p className="text-xl md:text-2xl font-semibold text-slate-900 text-center leading-relaxed mb-8">
                            &quot;{currentStatement.statement}&quot;
                        </p>

                        {/* Answer Buttons */}
                        {!answered ? (
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(true)}
                                    className="flex-1 py-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100 transition-all group"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Check className="w-6 h-6" />
                                        </div>
                                        <span className="text-lg font-bold text-emerald-700">VERDADERO</span>
                                    </div>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(false)}
                                    className="flex-1 py-5 rounded-2xl bg-rose-50 border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-100 transition-all group"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <X className="w-6 h-6" />
                                        </div>
                                        <span className="text-lg font-bold text-rose-700">FALSO</span>
                                    </div>
                                </motion.button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`
                                    p-5 rounded-2xl
                                    ${isCorrect ? 'bg-emerald-50' : 'bg-rose-50'}
                                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5
                                        ${currentStatement.isTrue ? 'bg-emerald-500' : 'bg-rose-500'} text-white
                                    `}>
                                        {currentStatement.isTrue ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 mb-1">
                                            La respuesta correcta es: {currentStatement.isTrue ? 'VERDADERO' : 'FALSO'}
                                        </p>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {currentStatement.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                {answered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                    >
                        <Button
                            onClick={handleNext}
                            className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-lg"
                        >
                            {currentIndex < STATEMENTS.length - 1 ? (
                                <>
                                    Siguiente
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </>
                            ) : (
                                <>
                                    Ver resultados
                                    <Trophy className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                )}
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
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                ¡Bien hecho!
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Has completado el desafío Verdadero/Falso
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-emerald-50 rounded-2xl p-4">
                                    <div className="text-3xl font-bold text-emerald-600">{score}</div>
                                    <div className="text-xs text-emerald-600 font-medium">Correctas</div>
                                </div>
                                <div className="bg-rose-50 rounded-2xl p-4">
                                    <div className="text-3xl font-bold text-rose-600">{STATEMENTS.length - score}</div>
                                    <div className="text-xs text-rose-600 font-medium">Incorrectas</div>
                                </div>
                                <div className="bg-orange-50 rounded-2xl p-4">
                                    <div className="text-3xl font-bold text-orange-600">{bestStreak}</div>
                                    <div className="text-xs text-orange-600 font-medium">Mejor racha</div>
                                </div>
                            </div>

                            {/* Accuracy */}
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 mb-6">
                                <div className="text-5xl font-bold text-slate-900 mb-1">
                                    {Math.round((score / STATEMENTS.length) * 100)}%
                                </div>
                                <div className="text-sm text-slate-500">Precisión</div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button 
                                    onClick={handleRestart}
                                    className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Jugar de nuevo
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
