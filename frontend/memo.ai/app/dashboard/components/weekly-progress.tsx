'use client'

import { motion } from "motion/react";
import { Flame, Target, TrendingUp } from "lucide-react";

interface WeekDay {
    day: string;
    studied: boolean;
    isToday: boolean;
}

export default function WeeklyProgress() {
    // Mock data - would come from API
    const weekDays: WeekDay[] = [
        { day: "L", studied: true, isToday: false },
        { day: "M", studied: true, isToday: false },
        { day: "X", studied: true, isToday: false },
        { day: "J", studied: false, isToday: false },
        { day: "V", studied: true, isToday: true },
        { day: "S", studied: false, isToday: false },
        { day: "D", studied: false, isToday: false },
    ];

    const streak = 4; // días consecutivos
    const weeklyGoal = 5; // días objetivo
    const daysStudied = weekDays.filter(d => d.studied).length;
    const progress = (daysStudied / weeklyGoal) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-100 rounded-xl">
                        <Target className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-sm">Meta semanal</h3>
                        <p className="text-xs text-slate-500">{daysStudied} de {weeklyGoal} días</p>
                    </div>
                </div>
                
                {/* Streak badge */}
                {streak > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-bold text-orange-600">{streak}</span>
                    </div>
                )}
            </div>

            {/* Week days */}
            <div className="flex items-center justify-between gap-1 mb-4">
                {weekDays.map((day, i) => (
                    <motion.div
                        key={day.day}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`
                            flex-1 aspect-square max-w-10 rounded-xl flex flex-col items-center justify-center gap-0.5
                            transition-all duration-200
                            ${day.isToday 
                                ? 'ring-2 ring-primary ring-offset-2' 
                                : ''
                            }
                            ${day.studied 
                                ? 'bg-primary text-white' 
                                : 'bg-slate-100 text-slate-400'
                            }
                        `}
                    >
                        <span className="text-[10px] font-bold">{day.day}</span>
                        {day.studied && (
                            <div className="w-1 h-1 bg-white rounded-full opacity-80" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="relative">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full"
                    />
                </div>
                
                {/* Goal marker */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-slate-300 rounded-full"
                    style={{ left: '100%', transform: 'translate(-50%, -50%)' }}
                />
            </div>

            {/* Motivation text */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                    {progress >= 100 
                        ? "¡Meta cumplida! 🎉" 
                        : `${weeklyGoal - daysStudied} días más para tu meta`
                    }
                </span>
            </div>
        </motion.div>
    );
}
