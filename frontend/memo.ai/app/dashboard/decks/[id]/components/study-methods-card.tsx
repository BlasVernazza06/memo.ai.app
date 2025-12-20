import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";


interface StudyMethod {
    id: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    border: string;
    gradient: string;
    stats: string;
    link: string;
}

export default function StudyMethodsCard({ mode, index }: { mode: StudyMethod, index: number }) {
    return (
        <Link href={mode.link} className="w-full">
            <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`group flex flex-col text-left p-6 bg-white border border-slate-150 shadow-2xl shadow-slate-200/40 rounded-3xl hover:border-transparent hover:shadow-2xl hover:shadow-${mode.color.split('-')[1]}-500/20 transition-all duration-300 relative overflow-hidden h-full w-full`}
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
        </Link>    
    );
}