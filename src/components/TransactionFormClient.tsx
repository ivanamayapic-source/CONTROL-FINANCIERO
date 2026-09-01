"use client";

import { useState } from "react";
import { createTransaction } from "@/actions/transaction";
import { useRouter } from "next/navigation";

export default function TransactionFormClient({ accounts, categories }: { accounts: any[], categories: any[] }) {
  const router = useRouter();
  const [type, setType] = useState<"ingreso" | "gasto" | "transferencia">("gasto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredCategories = categories.filter(c => c.type === type);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("type", type);

    try {
      await createTransaction(formData);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al guardar el movimiento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
        <button
          type="button"
          onClick={() => setType("gasto")}
          className={`flex-1 py-2 text-center rounded-md font-medium transition-colors ${type === "gasto" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
        >
          Gasto
        </button>
        <button
          type="button"
          onClick={() => setType("ingreso")}
          className={`flex-1 py-2 text-center rounded-md font-medium transition-colors ${type === "ingreso" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
        >
          Ingreso
        </button>
        <button
          type="button"
          onClick={() => setType("transferencia")}
          className={`flex-1 py-2 text-center rounded-md font-medium transition-colors ${type === "transferencia" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
        >
          Transferencia
        </button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto (COP)</label>
          <input
            type="number"
            name="amount"
            required
            min="1"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
            placeholder="Ej: 150000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Concepto / Descripción</label>
          <input
            type="text"
            name="concept"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Ej: Almuerzo, Salario, Pago Netflix..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === "transferencia" ? "Cuenta Origen" : "Cuenta"}
            </label>
            <select name="accountId" required className="w-full border-gray-300 rounded-lg shadow-sm p-3">
              <option value="">Selecciona una cuenta</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name} (${Number(acc.balance).toLocaleString()})</option>
              ))}
            </select>
          </div>
        </div>

        {type === "transferencia" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cuenta Destino</label>
            <select name="toAccountId" required className="w-full border-gray-300 rounded-lg shadow-sm p-3">
              <option value="">Selecciona la cuenta destino</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name} (${Number(acc.balance).toLocaleString()})</option>
              ))}
            </select>
          </div>
        )}

        {type !== "transferencia" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select name="categoryId" required className="w-full border-gray-300 rounded-lg shadow-sm p-3">
              <option value="">Selecciona una categoría</option>
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Registrar Movimiento"}
        </button>
      </form>
    </div>
  );
}
