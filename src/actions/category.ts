"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const defaultCategories = [
  { name: "Alimentación", type: "gasto", icon: "utensils" },
  { name: "Vivienda", type: "gasto", icon: "home" },
  { name: "Transporte", type: "gasto", icon: "car" },
  { name: "Servicios", type: "gasto", icon: "zap" },
  { name: "Salud", type: "gasto", icon: "heart" },
  { name: "Educación", type: "gasto", icon: "book" },
  { name: "Entretenimiento", type: "gasto", icon: "film" },
  { name: "Compras", type: "gasto", icon: "shopping-bag" },
  { name: "Deudas", type: "gasto", icon: "credit-card" },
  { name: "Salario", type: "ingreso", icon: "briefcase" },
  { name: "Trabajo adicional", type: "ingreso", icon: "plus-circle" },
  { name: "Inversiones", type: "ingreso", icon: "trending-up" },
  { name: "Otros", type: "ingreso", icon: "help-circle" },
  { name: "Otros", type: "gasto", icon: "help-circle" },
];

export async function getCategories() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  // Obtener categorías por defecto y las del usuario
  return prisma.category.findMany({
    where: {
      OR: [
        { userId: null },
        { userId: session.user.id }
      ]
    },
    orderBy: { name: "asc" }
  });
}

export async function seedDefaultCategoriesIfEmpty() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  // En la vida real, las categorías por defecto tendrían userId = null, 
  // pero para no mezclar en caso de que modifiquen, podemos copiarlas al usuario.
  // Según nuestro modelo, userId=null significa globales.
  // Verificamos si existen globales. Si no, las creamos (esto solo debería ejecutarse una vez en el sistema).
  
  const existingGlobals = await prisma.category.findFirst({ where: { userId: null } });
  if (!existingGlobals) {
    await prisma.category.createMany({
      data: defaultCategories,
      skipDuplicates: true,
    });
  }
}
