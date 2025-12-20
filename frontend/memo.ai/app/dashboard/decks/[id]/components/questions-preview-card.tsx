export default function QuestionsPreviewCard({ card, i }: { card: { q: string, a: string }, i: number }) {
    return (
        <div key={i} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50/80 transition-colors group cursor-help">
            <div className="flex-1">
                <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest mb-2 block">Pregunta {i+1}</span>
                <p className="text-base font-bold text-slate-800 leading-snug">{card.q}</p>
            </div>
            <div className="hidden md:block w-px bg-slate-100 self-stretch" />
            <div className="flex-1 relative">
                <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest mb-2 block">Respuesta</span>
                <div className="relative overflow-hidden rounded-lg">
                    <p className="text-sm font-medium text-slate-700 blur-sm group-hover:blur-none transition-all duration-300 select-none">
                        {card.a}
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm border border-slate-200">
                            Hover para revelar
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}