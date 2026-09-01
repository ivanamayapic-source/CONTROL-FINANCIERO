"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const transactionSchema = z.object({
  accountId: z.string().uuid(),
  toAccountId: z.string().uuid().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  amount: z.number().positive("El monto debe ser mayor a cero"),
  date: z.string(),
  type: z.enum(["ingreso", "gasto", "transferencia"]),
  concept: z.string().min(1, "El concepto es obligatorio"),
  notes: z.string().optional(),
});

export async function createTransaction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  const data = {
    accountId: formData.get("accountId"),
    toAccountId: formData.get("toAccountId") || null,
    categoryId: formData.get("categoryId") || null,
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    type: formData.get("type"),
    concept: formData.get("concept"),
    notes: formData.get("notes") || "",
  };

  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) throw new Error("Datos inválidos: " + JSON.stringify(parsed.error.errors));

  const { accountId, toAccountId, categoryId, amount, date, type, concept, notes } = parsed.data;

  // Validación de propiedad de cuentas
  const account = await prisma.account.findUnique({ where: { id: accountId } });
  if (!account || account.userId !== session.user.id) throw new Error("Cuenta origen no válida");

  if (type === "transferencia" && toAccountId) {
    const toAccount = await prisma.account.findUnique({ where: { id: toAccountId } });
    if (!toAccount || toAccount.userId !== session.user.id) throw new Error("Cuenta destino no válida");
  }

  // EJECUCIÓN ATÓMICA ($transaction)
  await prisma.$transaction(async (tx) => {
    // 1. Crear el registro del movimiento
    await tx.transaction.create({
      data: {
        userId: session.user.id,
        accountId,
        toAccountId: type === "transferencia" ? toAccountId : null,
        categoryId: type !== "transferencia" ? categoryId : null,
        amount,
        date: new Date(date),
        type,
        concept,
        notes,
      }
    });

    // 2. Actualizar saldos basados en el tipo
    if (type === "ingreso") {
      await tx.account.update({
        where: { id: accountId },
        data: { balance: { increment: amount } }
      });
    } else if (type === "gasto") {
      await tx.account.update({
        where: { id: accountId },
        data: { balance: { decrement: amount } }
      });
    } else if (type === "transferencia" && toAccountId) {
      await tx.account.update({
        where: { id: accountId },
        data: { balance: { decrement: amount } }
      });
      await tx.account.update({
        where: { id: toAccountId },
        data: { balance: { increment: amount } }
      });
    }
  });

  revalidatePath("/movimientos");
  revalidatePath("/"); // Dashboard
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  // Buscar transacción original
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction || transaction.userId !== session.user.id || transaction.deletedAt) {
    throw new Error("Transacción no válida o ya eliminada");
  }

  // EJECUCIÓN ATÓMICA ($transaction) para revertir y marcar como soft delete
  await prisma.$transaction(async (tx) => {
    // 1. Soft delete
    await tx.transaction.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    // 2. Revertir saldos
    const amount = Number(transaction.amount);
    if (transaction.type === "ingreso") {
      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: { decrement: amount } }
      });
    } else if (transaction.type === "gasto") {
      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: { increment: amount } }
      });
    } else if (transaction.type === "transferencia" && transaction.toAccountId) {
      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: { increment: amount } }
      });
      await tx.account.update({
        where: { id: transaction.toAccountId },
        data: { balance: { decrement: amount } }
      });
    }
  });

  revalidatePath("/movimientos");
  revalidatePath("/");
  return { success: true };
}
