import DashHeader from "./components/dash-header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50/30">
            <DashHeader />
            
            {/* CAMBIO CLAVE: Quitamos 'container', 'px-4' y 'py-8' de aquí. 
                Ahora 'main' ocupa todo el ancho y no tiene relleno forzado. */}
            <main className="flex-1 w-full relative">
                {children}
            </main>
        </div>
    );
}
