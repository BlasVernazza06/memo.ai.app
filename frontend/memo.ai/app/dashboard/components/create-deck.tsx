"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
    ArrowLeft, Upload, FileText, Image, 
    X, Loader2, Check,
    FileUp
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    progress: number;
    status: "uploading" | "complete" | "error";
}

type Step = "upload" | "generating" | "complete";

export default function CreateDeck() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>("upload");
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [generationProgress, setGenerationProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            status: "uploading" as const
        }));

        setFiles(prev => [...prev, ...newFiles]);

        // Simulate upload
        newFiles.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(prev => prev.map(f => 
                        f.id === file.id ? { ...f, progress: 100, status: "complete" } : f
                    ));
                } else {
                    setFiles(prev => prev.map(f => 
                        f.id === file.id ? { ...f, progress } : f
                    ));
                }
            }, 150);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        }
    });

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return FileText;
        if (type.includes('image')) return Image;
        return FileUp;
    };

    const handleGenerate = () => {
        setCurrentStep("generating");
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 12;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => setCurrentStep("complete"), 300);
            }
            setGenerationProgress(progress);
        }, 400);
    };

    const allFilesComplete = files.length > 0 && files.every(f => f.status === "complete");

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-xl mx-auto px-4 py-8">
                {/* Back link */}
                <Link 
                    href="/dashboard" 
                    className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver
                </Link>

                <AnimatePresence mode="wait">
                    {/* STEP 1: Upload */}
                    {currentStep === "upload" && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <h1 className="text-xl font-semibold text-slate-900 mb-1">
                                Crear nuevo mazo
                            </h1>
                            <p className="text-sm text-slate-500 mb-6">
                                Sube tus documentos y generaremos flashcards automáticamente.
                            </p>

                            {/* Dropzone */}
                            <div
                                {...getRootProps()}
                                className={`
                                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                                    ${isDragActive 
                                        ? "border-slate-400 bg-slate-50" 
                                        : "border-slate-200 hover:border-slate-300"
                                    }
                                `}
                            >
                                <input {...getInputProps()} />
                                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-slate-400" />
                                </div>
                                <p className="text-sm font-medium text-slate-700 mb-1">
                                    {isDragActive ? "Suelta aquí" : "Arrastra archivos o haz clic"}
                                </p>
                                <p className="text-xs text-slate-400">
                                    PDF, Word, TXT o imágenes
                                </p>
                            </div>

                            {/* File list */}
                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {files.map(file => {
                                        const FileIcon = getFileIcon(file.type);
                                        return (
                                            <div
                                                key={file.id}
                                                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                                            >
                                                <FileIcon className="w-4 h-4 text-slate-400 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-slate-700 truncate">{file.name}</p>
                                                    <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                                                </div>
                                                {file.status === "uploading" ? (
                                                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                                                ) : file.status === "complete" ? (
                                                    <Check className="w-4 h-4 text-emerald-500" />
                                                ) : null}
                                                <button
                                                    onClick={() => removeFile(file.id)}
                                                    className="p-1 hover:bg-slate-200 rounded"
                                                >
                                                    <X className="w-3 h-3 text-slate-400" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Generate button */}
                            <Button
                                onClick={handleGenerate}
                                disabled={!allFilesComplete}
                                className="w-full mt-6 h-10 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg"
                            >
                                Generar Flashcards
                            </Button>
                        </motion.div>
                    )}

                    {/* STEP 2: Generating */}
                    {currentStep === "generating" && (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center py-12"
                        >
                            <Loader2 className="w-8 h-8 mx-auto mb-4 text-slate-400 animate-spin" />
                            <h2 className="text-lg font-medium text-slate-900 mb-1">
                                Generando flashcards...
                            </h2>
                            <p className="text-sm text-slate-500 mb-6">
                                Analizando tu contenido
                            </p>
                            <div className="max-w-xs mx-auto">
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-slate-900 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${generationProgress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    {Math.round(generationProgress)}%
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Complete */}
                    {currentStep === "complete" && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Check className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h2 className="text-lg font-medium text-slate-900 mb-1">
                                ¡Mazo creado!
                            </h2>
                            <p className="text-sm text-slate-500 mb-6">
                                24 flashcards y 3 quizzes generados
                            </p>
                            <div className="flex flex-col gap-2 max-w-xs mx-auto">
                                <Button 
                                    onClick={() => router.push('/dashboard/decks/1')}
                                    className="bg-slate-900 hover:bg-slate-800 rounded-lg"
                                >
                                    Empezar a estudiar
                                </Button>
                                <Button 
                                    onClick={() => router.push('/dashboard')}
                                    variant="ghost"
                                    className="text-slate-500"
                                >
                                    Ir al dashboard
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}