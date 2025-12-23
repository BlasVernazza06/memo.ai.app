import { FileText, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
    name: string;
    type: string;
    size: string;
    date: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

interface DocumentsUploadedProps {
    documents: Document[];
}

export default function DocumentsUploaded({ documents }: DocumentsUploadedProps) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Documentos del Mazo
            </h3>
            <div className="space-y-4">
                {documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 group p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                        <div className={`w-10 h-10 rounded-lg ${doc.bg} border border-slate-100 flex items-center justify-center shrink-0`}>
                            <doc.icon className={`w-5 h-5 ${doc.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                                {doc.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{doc.type}</span>
                                <span className="text-[10px] font-medium text-slate-400">• {doc.size}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full text-xs font-bold h-9 border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50">
                    + Añadir Documento
                </Button>
            </div>
        </div>
    );
}