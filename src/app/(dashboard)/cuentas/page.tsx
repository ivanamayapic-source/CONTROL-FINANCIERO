import { getAccounts } from "@/actions/account";

export const dynamic = "force-dynamic";

export default async function AccountsPage() {
  const accounts = await getAccounts();

  // Helper to format COP
  const formatCOP = (amount: number | any) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(amount));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cuentas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Nueva Cuenta
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
          No tienes cuentas registradas. Crea una para comenzar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <div key={acc.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">{acc.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{acc.type.replace("_", " ")}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">{formatCOP(acc.balance)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
