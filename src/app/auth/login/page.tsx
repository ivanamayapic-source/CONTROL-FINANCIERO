"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("En la Fase 2 esto iniciará sesión con NextAuth.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-400/20 blur-[120px]" />
      </div>

      <div className="max-w-md w-full p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 z-10 mx-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Mi Control
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Inicia sesión para administrar tu patrimonio
          </p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Correo electrónico</label>
            <input
              type="email"
              required
              className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-md mt-6"
          >
            Entrar a mi cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
