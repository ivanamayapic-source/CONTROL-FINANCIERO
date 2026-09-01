import { LayoutDashboard, Wallet, Tags, Plus, Bell, User } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Mi Control</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/cuentas" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Cuentas</span>
          </Link>
          <Link href="/categorias" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Tags className="w-5 h-5" />
            <span className="font-medium">Categorías</span>
          </Link>
        </nav>

        <div className="p-4">
          <Link href="/movimientos/nuevo" className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-md font-semibold">
            <Plus className="w-5 h-5" />
            Registrar
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Mi Control</h1>
          </div>
          <div className="hidden md:block">
            {/* Breadcrumb or Title can go here */}
          </div>
          <div className="flex items-center ml-auto gap-4">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700 leading-none">Usuario</p>
                <p className="text-xs text-slate-500 mt-1">Plan Pro</p>
              </div>
              <div className="h-9 w-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
