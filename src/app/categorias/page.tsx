import { getCategories, seedDefaultCategoriesIfEmpty } from "@/actions/category";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  await seedDefaultCategoriesIfEmpty();
  const categories = await getCategories();

  const ingresos = categories.filter(c => c.type === "ingreso");
  const gastos = categories.filter(c => c.type === "gasto");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-green-600 mb-4">Ingresos</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {ingresos.map(c => (
                <li key={c.id} className="p-4 hover:bg-gray-50 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">✓</span>
                  <span className="text-gray-800 font-medium">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-red-600 mb-4">Gastos</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {gastos.map(c => (
                <li key={c.id} className="p-4 hover:bg-gray-50 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">✓</span>
                  <span className="text-gray-800 font-medium">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
