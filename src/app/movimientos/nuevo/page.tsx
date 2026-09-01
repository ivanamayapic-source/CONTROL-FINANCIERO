import { getAccounts } from "@/actions/account";
import { getCategories } from "@/actions/category";
import TransactionFormClient from "@/components/TransactionFormClient";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewTransactionPage() {
  const accounts = await getAccounts();
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
          &larr; Volver al Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 mt-2">Registrar Movimiento</h2>
      </div>

      <TransactionFormClient accounts={accounts} categories={categories} />
    </div>
  );
}
