"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const accountSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  type: z.enum(["banco", "ahorro", "efectivo", "tarjeta_credito", "otra"]),
  initialBalance: z.number().default(0),
});

export async function createAccount(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  const data = {
    name: formData.get("name") as string,
    type: formData.get("type") as any,
    initialBalance: Number(formData.get("initialBalance") || 0),
  };

  const parsed = accountSchema.safeParse(data);
  if (!parsed.success) throw new Error("Datos inválidos");

  await prisma.account.create({
    data: {
      userId: session.user.id,
      name: parsed.data.name,
      type: parsed.data.type,
      balance: parsed.data.initialBalance,
      currency: "COP",
    },
  });

  revalidatePath("/cuentas");
  return { success: true };
}

export async function getAccounts() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  return prisma.account.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });
}
