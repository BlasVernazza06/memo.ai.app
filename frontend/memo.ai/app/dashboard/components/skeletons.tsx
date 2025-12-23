'use client'

import { motion } from "motion/react";

export function DeckCardSkeleton() {
    return (
        <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse">
            {/* Image Header Skeleton */}
            <div className="h-36 w-full bg-slate-200" />
            
            {/* Content Container */}
            <div className="px-6 pb-6 pt-4 relative">
                {/* Icon Skeleton */}
                <div className="absolute -top-10 left-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-200" />
                </div>
                
                {/* Title & Info Skeleton */}
                <div className="space-y-3 mb-6 mt-6">
                    <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                    <div className="flex items-center gap-3">
                        <div className="h-4 bg-slate-100 rounded-md w-20" />
                        <div className="h-4 bg-slate-100 rounded-md w-16" />
                    </div>
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center gap-4 mt-auto">
                    <div className="flex-1 space-y-2">
                        <div className="h-2 bg-slate-100 rounded-md w-12" />
                        <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

export function DeckGridSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <DeckCardSkeleton />
                </motion.div>
            ))}
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-200 h-64 animate-pulse">
            <div className="absolute inset-0 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }} 
            />
        </div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl animate-pulse">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-8 bg-slate-200 rounded-md w-24" />
                        <div className="h-4 bg-slate-100 rounded-md w-32" />
                    </div>
                </div>
            ))}
        </div>
    );
}
