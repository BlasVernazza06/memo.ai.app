import { motion } from "motion/react";
import { Tag } from "lucide-react";

interface KeyConceptsProps {
    concepts: string[];
}

export default function KeyConcepts({ concepts }: KeyConceptsProps) {
    return (
        <div>
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-xl text-slate-600"><Tag className="w-5 h-5" /></div>
                Conceptos Clave
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex flex-wrap gap-2.5">
                    {concepts.map((concept, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold border border-slate-100 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-default"
                        >
                            {concept}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}