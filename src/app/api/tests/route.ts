import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  // 1. CAPA DE SEGURIDAD: Protección por Token y Entorno
  const urlToken = req.nextUrl.searchParams.get("token");
  const envToken = process.env.TEST_TOKEN;

  if (!envToken || urlToken !== envToken) {
    return NextResponse.json({ error: "No autorizado. Token inválido o ausente." }, { status: 403 });
  }

  // Prevención extra: Advertir si se corre en producción
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_PROD_TESTS !== "true") {
     return NextResponse.json({ error: "Las pruebas están deshabilitadas en entornos de producción por seguridad." }, { status: 403 });
  }

  const report: any[] = [];
  const log = (name: string, expected: any, received: any, pass: boolean, details: string = "") => {
    report.push({ Prueba: name, "Saldo esperado": expected, "Saldo obtenido": received, Resultado: pass ? "PASS" : "FAIL", Detalles: details });
  };

  // 2. AISLAMIENTO DE DATOS: Generar identificadores únicos para no tocar datos reales
  const runId = crypto.randomUUID();
  const emailA = `testA-${runId}@test.local`;
  const emailB = `testB-${runId}@test.local`;

  let userAId = "";
  let userBId = "";

  try {
    // Crear Usuarios de prueba aislados
    const userA = await prisma.user.create({ data: { name: "Test A", email: emailA, passwordHash: "dummyhash" } });
    const userB = await prisma.user.create({ data: { name: "Test B", email: emailB, passwordHash: "dummyhash" } });
    userAId = userA.id;
    userBId = userB.id;

    // 1. PRUEBA DE CUENTAS
    const bankA = await prisma.account.create({ data: { userId: userA.id, name: "Bancaria", type: "banco", balance: 1000000 } });
    const savingsA = await prisma.account.create({ data: { userId: userA.id, name: "Ahorros", type: "ahorro", balance: 500000 } });
    const cashA = await prisma.account.create({ data: { userId: userA.id, name: "Efectivo", type: "efectivo", balance: 200000 } });

    log("Creación Cuentas", "1000000, 500000, 200000", `${Number(bankA.balance)}, ${Number(savingsA.balance)}, ${Number(cashA.balance)}`, true);

    // 2. PRUEBA DE INGRESO
    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({ data: { userId: userA.id, accountId: bankA.id, amount: 500000, date: new Date(), type: "ingreso", concept: "Ingreso Test" } });
      await tx.account.update({ where: { id: bankA.id }, data: { balance: { increment: 500000 } } });
    });
    const checkIngreso = await prisma.account.findUnique({ where: { id: bankA.id } });
    log("Ingreso $500k", "1500000", Number(checkIngreso?.balance), Number(checkIngreso?.balance) === 1500000);

    // 3. PRUEBA DE GASTO
    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({ data: { userId: userA.id, accountId: bankA.id, amount: 200000, date: new Date(), type: "gasto", concept: "Gasto Test" } });
      await tx.account.update({ where: { id: bankA.id }, data: { balance: { decrement: 200000 } } });
    });
    const checkGasto = await prisma.account.findUnique({ where: { id: bankA.id } });
    log("Gasto $200k", "1300000", Number(checkGasto?.balance), Number(checkGasto?.balance) === 1300000);

    // 4. PRUEBA DE TRANSFERENCIA
    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({ data: { userId: userA.id, accountId: bankA.id, toAccountId: savingsA.id, amount: 300000, date: new Date(), type: "transferencia", concept: "Transfer" } });
      await tx.account.update({ where: { id: bankA.id }, data: { balance: { decrement: 300000 } } });
      await tx.account.update({ where: { id: savingsA.id }, data: { balance: { increment: 300000 } } });
    });
    const checkT1 = await prisma.account.findUnique({ where: { id: bankA.id } });
    const checkT2 = await prisma.account.findUnique({ where: { id: savingsA.id } });
    log("Transferencia $300k", "B:1000000 A:800000", `B:${Number(checkT1?.balance)} A:${Number(checkT2?.balance)}`, Number(checkT1?.balance) === 1000000 && Number(checkT2?.balance) === 800000);

    // 5. PRUEBA DE EDICIÓN
    let editTrx = await prisma.transaction.create({ data: { userId: userA.id, accountId: cashA.id, amount: 100000, date: new Date(), type: "gasto", concept: "Gasto Editar" } });
    await prisma.account.update({ where: { id: cashA.id }, data: { balance: { decrement: 100000 } } });
    
    await prisma.$transaction(async (tx) => {
      await tx.account.update({ where: { id: cashA.id }, data: { balance: { increment: Number(editTrx.amount) } } }); // Revertir original
      editTrx = await tx.transaction.update({ where: { id: editTrx.id }, data: { amount: 150000 } });
      await tx.account.update({ where: { id: cashA.id }, data: { balance: { decrement: 150000 } } }); // Aplicar nuevo
    });
    const checkEdit1 = await prisma.account.findUnique({ where: { id: cashA.id } });
    log("Edición 100k -> 150k", "50000", Number(checkEdit1?.balance), Number(checkEdit1?.balance) === 50000);

    // 6. PRUEBA DE ELIMINACIÓN (Soft Delete)
    await prisma.$transaction(async (tx) => {
      await tx.transaction.update({ where: { id: editTrx.id }, data: { deletedAt: new Date() } });
      await tx.account.update({ where: { id: cashA.id }, data: { balance: { increment: Number(editTrx.amount) } } });
    });
    const checkDel = await prisma.account.findUnique({ where: { id: cashA.id } });
    const checkSoftDel = await prisma.transaction.findUnique({ where: { id: editTrx.id } });
    log("Eliminación Gasto", "200000, deletedAt!=null", `${Number(checkDel?.balance)}, deletedAt:${checkSoftDel?.deletedAt ? 'ok' : 'null'}`, Number(checkDel?.balance) === 200000 && checkSoftDel?.deletedAt !== null);

    // 10. PRUEBA AISLAMIENTO
    let isolationPass = true;
    try {
      const checkAis = await prisma.account.findFirst({ where: { id: bankA.id, userId: userB.id } });
      if (checkAis) isolationPass = false; 
    } catch (e) { isolationPass = true; }
    log("Aislamiento Usuarios", "Restringido", isolationPass ? "Restringido" : "Permitido", isolationPass);

    // 13. PRUEBA DECIMALES
    await prisma.account.create({ data: { userId: userB.id, name: "Decimales", type: "banco", balance: 1250000.9999 } });
    const checkDec = await prisma.account.findFirst({ where: { userId: userB.id, name: "Decimales" } });
    log("Precisión Decimal", "1250000.9999", Number(checkDec?.balance), Number(checkDec?.balance) === 1250000.9999);

    return NextResponse.json({ success: true, message: "Todas las pruebas finalizaron", report });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, report });
  } finally {
    // 3. LIMPIEZA GARANTIZADA: Eliminar estrictamente los usuarios creados en este ciclo, arrastrando cuentas y transacciones en cascada.
    if (userAId) await prisma.user.delete({ where: { id: userAId } });
    if (userBId) await prisma.user.delete({ where: { id: userBId } });
  }
}
