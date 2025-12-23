
import { Sparkles } from 'lucide-react';
import UserButton from './components/user-button';
import DeckCard from './components/deck-card';
import { auth } from '@/lib/auth';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import DashHero from './components/dash-hero';
import DashStats from './components/dash-stats';
import EmptyState from './components/empty-state';
import WeeklyProgress from './components/weekly-progress';


// Mock data for recent documents
const recentDocs = [
    { id: 1, title: "Anatomía Humana - Cap 1", date: "Hace 2 horas", cards: 24, progress: 80, isNew: true },
    { id: 2, title: "Historia del Arte - Renacimiento", date: "Ayer", cards: 15, progress: 45, isNew: false },
    { id: 3, title: "Física Cuántica Básica", date: "Hace 3 días", cards: 32, progress: 10, isNew: false },
];

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    if (!user) {
        redirect('/auth?authForm=login')
    }

    return (
        <>
            <main className="container mx-auto px-4 pt-8 space-y-10 pb-24">
                {/* HERO SECTION: Interactive Welcome Card */}
                <DashHero user={user}/>

                {/* Stats + Weekly Progress Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <DashStats/>
                    </div>
                    <div className="lg:col-span-1">
                        <WeeklyProgress />
                    </div>
                </div>

                <div className="flex items-center gap-2 my-8">
                     <div className="p-2 bg-blue-100 rounded-xl">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                     </div>
                     <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tus Mazos</h2>
                </div>
                
                {recentDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentDocs.map((doc) => (
                            <DeckCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </main>

            {/* Floating Profile & Streak (Bottom Left) */}
            <UserButton user={user}/>      
        </>
    );
}
