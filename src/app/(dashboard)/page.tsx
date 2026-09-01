import { TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank, Target, CreditCard, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
          <p className="text-slate-500 mt-1">Resumen general de tu estado financiero.</p>
        </div>
        <Link href="/movimientos/nuevo" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md font-semibold transition-all flex items-center gap-2 hover:shadow-lg">
          + Registrar
        </Link>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-slate-500">Saldo Total</h3>
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Wallet className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 mt-4">$ 0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-slate-500">Ingresos del Mes</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 mt-4">$ 0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-slate-500">Gastos del Mes</h3>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><TrendingDown className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-rose-600 mt-4">$ 0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-95"></div>
          <div className="relative z-10 flex justify-between items-start">
            <h3 className="text-sm font-medium text-blue-100">Patrimonio Neto</h3>
            <div className="p-2 bg-white/20 text-white rounded-lg"><DollarSign className="w-4 h-4" /></div>
          </div>
          <p className="relative z-10 text-3xl font-extrabold text-white mt-4">$ 0</p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Ahorro del mes</h3>
            <p className="text-xl font-bold text-slate-800">$ 0</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">0% de ingresos</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-slate-400" />
              <h3 className="text-sm font-medium text-slate-500">Presupuesto mensual</h3>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">0%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full w-0"></div>
          </div>
          <p className="text-xs text-slate-400 mt-3 font-medium">$0 consumidos de $0</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Deuda pendiente</h3>
            <p className="text-xl font-bold text-slate-800">$ 0</p>
          </div>
        </div>
      </div>

      {/* Empty State for Charts */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 min-h-[350px] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Aún no hay suficientes datos</h3>
          <p className="text-sm text-slate-500 mb-6">Registra algunos movimientos y presupuestos para que nuestro motor genere gráficos y reportes automáticos de tu evolución financiera.</p>
          <Link href="/movimientos/nuevo" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
            Registrar mi primer movimiento
          </Link>
        </div>
      </div>
    </div>
  );
}
