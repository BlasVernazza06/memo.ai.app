import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionsPreviewCard from "./questions-preview-card";

export default function FlashcardPreviewSection() {
    return (
        <div>
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-xl text-slate-600"><Layers className="w-5 h-5" /></div>
                Cuestionario de Preguntas
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-lg shadow-slate-200/20 overflow-hidden">
                {[
                    { q: "¿Cuál es la función principal de la mielina?", a: "Aumentar la velocidad del impulso nervioso (conducción saltatoria)." },
                    { q: "¿Qué neurotransmisor está asociado al placer?", a: "Dopamina." },
                    { q: "Diferencia entre aferente y eferente.", a: "Aferente lleva info al SNC (sensorial), Eferente lleva info del SNC (motor)." }
                ].map((card, i) => (
                    <QuestionsPreviewCard key={i} card={card} i={i} />
                ))}
                <div className="p-3 bg-slate-50/50 text-center border-t border-slate-100">
                    <Button variant="ghost" className="text-xs font-bold text-slate-500 hover:text-indigo-600">
                        Ver las 45 cartas <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}