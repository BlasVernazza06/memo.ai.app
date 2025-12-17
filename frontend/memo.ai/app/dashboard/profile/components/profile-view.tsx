"use client";

import { LinkIcon, MapPin, Verified, CalendarDays, Check, BookOpen, Target, Clock, Trophy, Flame } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";
import { motion } from "motion/react";

export default function ProfileView({ user }: { user?: User }) {
    return (
        <div className="container flex flex-col-reverse lg:flex-row mx-auto max-w-5xl pt-8 pb-10 gap-8 px-4">
            {/* Main Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 min-w-0"
            >
                {/* Hero Streak Card - Dark Premium Style */}
                <div id="user-streak" className="relative overflow-hidden rounded-4xl bg-slate-900 text-white shadow-2xl mb-8 p-1">
                     <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900" />
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-blob" />
                     <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

                    <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                         <div className="flex flex-col gap-2 text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="p-2 bg-orange-500/20 rounded-full backdrop-blur-md border border-orange-500/30">
                                   <Flame className="w-6 h-6 text-orange-400 fill-orange-400 animate-pulse" />
                                </div>
                                <span className="text-sm font-bold text-orange-200 uppercase tracking-widest">Racha Actual</span>
                            </div>
                            <div className="flex items-baseline gap-2 justify-center md:justify-start">
                                <span className="text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">19</span>
                                <span className="text-xl font-medium text-slate-400">días en llamas</span>
                            </div>
                         </div>

                         {/* Calendar visualization wrapper */}
                         <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-1 w-full md:w-auto">
                            <div className="flex justify-between items-center gap-2">
                                {[
                                    { day: "L", status: "complete" },
                                    { day: "M", status: "complete" },
                                    { day: "M", status: "future" },   
                                    { day: "J", status: "future" },
                                    { day: "V", status: "future" }, 
                                    { day: "S", status: "future" },
                                    { day: "D", status: "future" },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center gap-3 group cursor-default">
                                        <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 relative
                                            ${item.status === 'complete' ? 'bg-linear-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-110' : ''}
                                            ${item.status === 'current'  ? 'bg-white/10 text-orange-400 border border-orange-500/50' : ''}
                                            ${item.status === 'future'   ? 'bg-slate-800/50 text-slate-500 border border-white/5' : ''}
                                        `}>
                                            {item.status === 'complete' && <Check className="w-5 h-5" strokeWidth={3} />}
                                            {item.status === 'current'  && <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />} 
                                        </div>
                                        <span className={`text-[10px] font-bold ${item.status === 'future' ? 'text-slate-500' : 'text-slate-300'}`}>
                                            {item.day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    {[
                        { label: "Cartas", value: "1,240", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-100" },
                        { label: "Precisión", value: "92%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-100" },
                        { label: "Estudio", value: "34h", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-100" },
                    ].map((stat, i) => (
                         <motion.div 
                            key={i}
                            whileHover={{ y: -4 }}
                            className={`border ${stat.border} shadow-sm rounded-2xl p-6 bg-white/60 backdrop-blur-xl flex flex-col items-center justify-center gap-3`}
                        >
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-1 shadow-inner`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-black text-slate-800 tracking-tight">{stat.value}</span>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Achievements */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border border-white/60 shadow-xl shadow-slate-200/50 rounded-2xl p-8 bg-white/80 backdrop-blur-xl mb-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3">
                            <div className="bg-amber-100 p-2 rounded-xl text-amber-600 border border-amber-200"><Trophy className="w-5 h-5" /></div>
                            Logros
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">Ver todos</Button>
                    </div>
                    
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-3 min-w-[100px] snap-center group cursor-pointer">
                                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-100 to-orange-50 border-4 border-white shadow-lg group-hover:shadow-amber-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300">
                                    🏆
                                </div>
                                <span className="text-xs font-bold text-slate-600 text-center leading-tight group-hover:text-amber-600 transition-colors">Estudioso {i}</span>
                            </div>
                        ))}
                         <div className="flex flex-col items-center gap-3 min-w-[100px] opacity-40">
                            <div className="w-20 h-20 rounded-2xl bg-slate-100 border-4 border-slate-50 border-dashed flex items-center justify-center text-3xl">
                                🔒
                            </div>
                            <span className="text-xs font-bold text-slate-400 text-center leading-tight">Bloqueado</span>
                        </div>
                    </div>
                </motion.div>

                 {/* Recent Activity Feed */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="border border-white/60 shadow-lg shadow-slate-200/50 rounded-2xl p-8 bg-white/80 backdrop-blur-xl"
                >
                    <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3 mb-8">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-600 border border-blue-200"><Clock className="w-5 h-5" /></div>
                        Actividad Reciente
                    </h3>
                    
                    <div className="space-y-8">
                        {[
                            { title: "Repaso de Anatomía", desc: "95% precisión", time: "Hace 2h", xp: "+50 XP", color: "blue", done: true },
                            { title: "¡Logro Desbloqueado!", desc: "Medalla 'Estudioso 1'", time: "Ayer", xp: "🏆 Nuevo", color: "amber", done: true },
                            { title: "Nuevo mazo creado", desc: "Historia del Arte", time: "Hace 2 días", xp: "", color: "purple", done: false },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-5 items-start relative">
                                <div className="relative z-10 w-3 h-3 mt-1.5 rounded-full ring-4 ring-white shadow-sm shrink-0" style={{backgroundColor: `var(--color-${item.color}-500)`}} />
                                {i !== 2 && <div className="absolute top-4 left-1.5 w-0.5 h-full bg-slate-100 z-0" />}
                                
                                <div className="flex-1 -mt-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">{item.desc} · {item.time}</p>
                                        </div>
                                        {item.xp && (
                                            <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full bg-${item.color}-50 text-${item.color}-600 border border-${item.color}-100`}>
                                                {item.xp}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Sticky Sidebar */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full lg:max-w-xs shrink-0"
            >
                <div className="sticky top-28 space-y-6">
                    <div className="group border border-white/60 shadow-xl shadow-slate-200/50 rounded-3xl bg-white/80 backdrop-blur-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                        {/* Header Gradient */}
                        <div className="h-32 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                             <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1">
                                <Verified className="text-blue-300 h-3 w-3 fill-blue-300/20"/>
                                <span className="text-white text-[10px] font-bold tracking-wide">Pro Member</span>
                            </div>
                        </div>
                        
                        <div className="px-6 pb-6 -mt-12 relative z-10">
                            <div className="flex justify-between items-end mb-4">
                                <div className="p-1.5 bg-white rounded-2xl shadow-lg">
                                    {user?.image ? (
                                        <Image src={user.image} alt={user.name || "User"} width={88} height={88} className="rounded-xl object-cover" />
                                    ) : (
                                        <div className="w-[88px] h-[88px] rounded-xl bg-slate-100 flex items-center justify-center text-3xl">
                                             {user?.name?.charAt(0) || "U"}
                                        </div>
                                    )}
                                </div>
                                <Button size="sm" className="rounded-xl bg-slate-900 text-white font-bold h-9">Editar</Button>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{user?.name || "Usuario"}</h2>
                                <p className="text-sm text-slate-500 font-medium">{user?.email || "usuario@memo.ai"}</p>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-3 text-sm text-slate-600 group/link hover:text-indigo-600 transition-colors cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/link:bg-indigo-50 group-hover/link:text-indigo-600 transition-colors">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">Barcelona, España</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 group/link hover:text-indigo-600 transition-colors cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/link:bg-indigo-50 group-hover/link:text-indigo-600 transition-colors">
                                        <LinkIcon className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">memo.ai/{user?.name?.toLowerCase().replace(/\s+/g, '')}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 group/link hover:text-indigo-600 transition-colors cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/link:bg-indigo-50 group-hover/link:text-indigo-600 transition-colors">
                                        <CalendarDays className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">Unido en Marzo 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
