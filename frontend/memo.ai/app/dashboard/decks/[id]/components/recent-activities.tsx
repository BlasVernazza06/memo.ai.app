import { History, LucideIcon } from "lucide-react";

interface ActivitiesProps {
    type: string;
    label: string;
    date: string;
    score: string;
    icon: LucideIcon;
    color: string;
}

export default function RecentActivities({ activity }: { activity: ActivitiesProps[] }) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <History className="w-3 h-3" /> Historial
            </h3>
            <div className="space-y-5">
                {activity.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group relative pl-3">
                        {/* Timeline Line */}
                        {i !== activity.length - 1 && (
                            <div className="absolute left-[5.5px] top-2 bottom-[-20px] w-0.5 bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                        )}
                        
                        <div className={`relative z-10 w-2.5 h-2.5 mt-1.5 rounded-full ring-4 ring-white shadow-sm shrink-0 ${item.color.replace('text-', 'bg-')}`} />
                        
                        <div className="flex-1 -mt-0.5">
                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer">
                                {item.label}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] font-medium text-slate-400">{item.date}</span>
                                {item.score && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">
                                        {item.score}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}