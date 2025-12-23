"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function DashHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 ">
            <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 group">
                    <div className="relative group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image src="/logo.webp" alt="Memo.ai" width={32} height={32} className="relative" />
                    </div>
                    <span className="">
                        Memo.ai
                    </span>
                </Link>

                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                        <Input
                            type="search"
                            placeholder="Buscar..."
                            className="w-full pl-10 pr-12 bg-muted/50 border-transparent focus:bg-background focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-full h-10 text-sm"
                        />
                        {/* Badge visual de atajo de teclado */}
                        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <ThemeToggle/>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-slate-900 hover:bg-slate-text-slate-500100"
                        asChild
                    >
                        <Link href="/dashboard/settings">    
                            <Settings className="w-5 h-5"/>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}