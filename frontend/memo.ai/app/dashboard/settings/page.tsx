"use client";

import { 
    Mail, CreditCard, Moon, 
    Globe, Smartphone, Settings, ShieldAlert, LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { motion } from "motion/react";

export default function SettingsPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full min-h-screen pb-20 relative z-10 px-4">
            <div className="w-full max-w-4xl mx-auto pt-17">
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="p-2 bg-slate-900 rounded-lg text-white shadow-lg shadow-blue-500/20">
                                <Settings className="w-5 h-5 animate-spin-slow" />
                             </div>
                             <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">Panel de Control</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Configuración</h1>
                        <p className="text-slate-500 font-medium max-w-md">Administra tu cuenta, preferencias y suscripción en un solo lugar.</p>
                    </div>
                </motion.header>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                    className="space-y-8"
                >
                    {/* Perfil */}
                    <motion.section variants={sectionVariants} className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-900 px-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                            Perfil Público
                        </h2>
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/50 rounded-3xl p-8 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
                            
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                                <div className="relative group/avatar cursor-pointer">
                                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                                         <Image src="/logo.webp" alt="Avatar" width={112} height={112} className="object-cover h-full w-full" />
                                    </div>
                                    <div className="absolute inset-0 bg-slate-900/60 rounded-full z-20 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-2">
                                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm mb-1">
                                            <Settings className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wide">Editar</span>
                                    </div>
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-full blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                                </div>
                                
                                <div className="flex-1 space-y-6 w-full">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre Visible</label>
                                            <Input defaultValue="John Doe" className="h-12 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-semibold transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Usuario</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                                <Input defaultValue="johndoe" className="h-12 pl-8 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-semibold transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Bio</label>
                                        <textarea 
                                            className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm placeholder:text-slate-400 focus-visible:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none font-medium"
                                            placeholder="Cuéntanos un poco sobre ti..."
                                        />
                                        <p className="text-xs text-right text-slate-400 font-medium">0/160 caracteres</p>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <Button className="rounded-xl bg-slate-900 text-white font-bold px-8 shadow-lg hover:bg-slate-800 hover:scale-105 transition-all">
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                    
                    {/* Preferencias */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.section variants={sectionVariants} className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 px-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                Preferencias
                            </h2>
                            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden divide-y divide-slate-100/50">
                                <div className="p-5 flex items-center justify-between hover:bg-white/40 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-indigo-600 p-2.5 bg-indigo-50 rounded-xl group-hover:scale-110 transition-transform"><Moon className="w-5 h-5" /></div>
                                        <div>
                                            <p className="font-bold text-slate-900">Modo Oscuro</p>
                                            <p className="text-xs text-slate-500 font-medium">Reduce la fatiga visual</p>
                                        </div>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="p-5 flex items-center justify-between hover:bg-white/40 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-blue-600 p-2.5 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform"><Globe className="w-5 h-5" /></div>
                                        <div>
                                            <p className="font-bold text-slate-900">Idioma</p>
                                            <p className="text-xs text-slate-500 font-medium">Selecciona tu idioma</p>
                                        </div>
                                    </div>
                                    <select className="h-9 rounded-lg border-0 bg-slate-100 px-3 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer hover:bg-slate-200 transition-colors">
                                        <option>Español</option>
                                        <option>English</option>
                                    </select>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section variants={sectionVariants} className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 px-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                Notificaciones
                            </h2>
                            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden divide-y divide-slate-100/50">
                                <div className="p-5 flex items-center justify-between hover:bg-white/40 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-orange-600 p-2.5 bg-orange-50 rounded-xl group-hover:scale-110 transition-transform"><Mail className="w-5 h-5" /></div>
                                        <div>
                                            <p className="font-bold text-slate-900">Novedades</p>
                                            <p className="text-xs text-slate-500 font-medium">Tips de estudio semanales</p>
                                        </div>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="p-5 flex items-center justify-between hover:bg-white/40 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-emerald-600 p-2.5 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform"><Smartphone className="w-5 h-5" /></div>
                                        <div>
                                            <p className="font-bold text-slate-900">Push Notifications</p>
                                            <p className="text-xs text-slate-500 font-medium">Recordatorios de repaso</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* Plan */}
                    <motion.section variants={sectionVariants} id="subscription" className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-900 px-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            Suscripción
                        </h2>
                        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                             {/* Animated Background */}
                             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-700" />
                             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -ml-16 -mb-16 pointer-events-none" />
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

                            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                                        <CreditCard className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-black tracking-tight">Memo.ai <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Pro</span></h3>
                                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/30">Activo</span>
                                        </div>
                                        <p className="text-sm text-blue-200/80 font-medium mt-1">Próxima facturación: 24 Abr 2025</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl font-bold backdrop-blur-sm">Historial</Button>
                                    <Button className="bg-white text-slate-900 hover:bg-blue-50 transition-colors font-bold rounded-xl px-6 shadow-lg shadow-white/10">Gestionar Plan</Button>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Danger */}
                    <motion.section variants={sectionVariants} className="pt-8">
                        <div className="bg-red-50/50 backdrop-blur-xl border border-red-100/60 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-red-50 transition-colors duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 rounded-xl text-red-600">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-red-900 text-lg">Zona de Peligro</p>
                                    <p className="text-sm text-red-700/70 mt-1 max-w-md font-medium">Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará tus datos de nuestros servidores.</p>
                                </div>
                            </div>
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 rounded-xl px-6 font-bold shadow-lg shadow-red-500/20 whitespace-nowrap h-11">
                                Eliminar cuenta
                            </Button>
                        </div>
                    </motion.section>
                </motion.div>
                
                <div className="mt-12 text-center pb-10">
                    <Button variant="ghost" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-widest gap-2">
                        <LogOut className="w-4 h-4" /> Cerrar Sesión en todos los dispositivos
                    </Button>
                    <p className="text-[10px] text-slate-300 mt-4 font-mono">Memo.ai v2.4.0 • Build 8492</p>
                </div>
            </div>
        </div>
    );
}