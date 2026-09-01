export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow font-medium transition-colors">
          + Registrar movimiento
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Saldo total disponible</h3>
          <p className="text-3xl font-bold text-gray-800">$ 0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Ingresos del mes</h3>
          <p className="text-3xl font-bold text-green-600">$ 0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Gastos del mes</h3>
          <p className="text-3xl font-bold text-red-600">$ 0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Patrimonio neto</h3>
          <p className="text-3xl font-bold text-blue-600">$ 0</p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Ahorro del mes</h3>
          <p className="text-2xl font-semibold text-gray-800">$ 0</p>
          <p className="text-sm text-gray-500 mt-1">0% de ahorro</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Presupuesto consumido</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "0%" }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">0% de $0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Deuda pendiente</h3>
          <p className="text-2xl font-semibold text-gray-800">$ 0</p>
        </div>
      </div>

      {/* Empty State for Charts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="mb-2">Aún no hay datos suficientes para mostrar gráficos.</p>
          <p className="text-sm">Registra algunos movimientos para ver la evolución de tu patrimonio.</p>
        </div>
      </div>
    </div>
  );
}
