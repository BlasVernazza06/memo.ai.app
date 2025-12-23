'use client'

import { motion, AnimatePresence } from "motion/react";
import { Plus, X, FileUp, Camera, FileText } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function FloatingCreateButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const actions = [
        { icon: FileUp, label: "Subir archivo", href: "/dashboard/createDeck", color: "bg-primary" },
        { icon: Camera, label: "Escanear imagen", href: "/dashboard/createDeck?mode=scan", color: "bg-emerald-500" },
        { icon: FileText, label: "Escribir texto", href: "/dashboard/createDeck?mode=text", color: "bg-amber-500" },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Action buttons */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex flex-col gap-2 mb-2"
                    >
                        {actions.map((action, i) => (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link 
                                    href={action.href}
                                    className="flex items-center gap-3 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                                        {action.label}
                                    </span>
                                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB with tooltip */}
            <div className="relative flex items-center">
                {/* Tooltip - appears on hover when menu is closed */}
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute right-16 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-lg"
                        >
                            Nuevo Mazo
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main FAB button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl
                        transition-all duration-300
                        ${isOpen 
                            ? 'bg-slate-800 rotate-45' 
                            : 'bg-primary hover:bg-primary/90 shadow-primary/30'
                        }
                    `}
                >
                    <Plus className="w-6 h-6 transition-transform duration-300" />
                </motion.button>
            </div>
        </div>
    );
}
