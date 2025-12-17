'use client'

import { motion } from "motion/react";

export default function StatsSection() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {[ 
                { label: "Cartas Dominadas", value: "124", sub: "+12 hoy", icon: "🧠", color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-200/50" },
                { label: "Tiempo de Estudio", value: "3h 20m", sub: "Esta semana", icon: "⏳", color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-200/50" },
                { label: "Nivel Actual", value: "Sabio Lv.3", sub: "500xp para Lv.4", icon: "⭐", color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-200/50" },
            ].map((stat, i) => (
                <div key={i} className="group bg-white/60 backdrop-blur-xl border border-white/40 hover:border-blue-300/50 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                            {stat.icon}
                        </div>
                        <div className={`px-2 py-1 rounded-lg ${stat.bg} ${stat.border} border`}>
                            {/* Trend icon if needed */}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-1">{stat.value}</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                            <span className={`text-[10px] font-bold ${stat.color} bg-white/50 px-1.5 py-0.5 rounded-md`}>{stat.sub}</span>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}