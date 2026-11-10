import { prisma } from "../../client";

export interface PinjamanInput {
  bukuId?: unknown;
  penggunaId?: unknown;
  status?: unknown;
}

export function validateCreatePinjaman(
  body: PinjamanInput
): { ok: true; data: { bukuId: number; penggunaId: number } } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof body.bukuId !== "number" || !Number.isInteger(body.bukuId)) {
    errors.push("bukuId wajib integer");
  }
  if (typeof body.penggunaId !== "number" || !Number.isInteger(body.penggunaId)) {
    errors.push("penggunaId wajib integer");
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { bukuId: body.bukuId as number, penggunaId: body.penggunaId as number },
  };
}

export async function findAllPinjaman(status?: string) {
  const where = status === "aktif" || status === "selesai" ? { status } : {};
  return prisma.pinjaman.findMany({
    where,
    include: { buku: true, pengguna: true },
    orderBy: { id: "asc" },
  });
}

export async function findPinjamanById(id: number) {
  return prisma.pinjaman.findUnique({
    where: { id },
    include: { buku: true, pengguna: true },
  });
}

export async function createPinjaman(bukuId: number, penggunaId: number) {
  // Cek keberadaan buku & pengguna
  const buku = await prisma.buku.findUnique({ where: { id: bukuId } });
  if (!buku) return { ok: false, code: 404, message: `Buku id ${bukuId} tidak ditemukan` };
  if (buku.stok <= 0) return { ok: false, code: 400, message: `Stok buku id ${bukuId} habis` };

  const pengguna = await prisma.pengguna.findUnique({ where: { id: penggunaId } });
  if (!pengguna) return { ok: false, code: 404, message: `Pengguna id ${penggunaId} tidak ditemukan` };

  // Transaksi: buat pinjaman + kurangi stok
  const result = await prisma.$transaction(async (tx) => {
    const pinjaman = await tx.pinjaman.create({
      data: { bukuId, penggunaId, status: "aktif" },
    });
    await tx.buku.update({
      where: { id: bukuId },
      data: { stok: { decrement: 1 } },
    });
    return pinjaman;
  });

  return { ok: true, data: result };
}

export async function kembalikanPinjaman(id: number) {
  const pinjaman = await prisma.pinjaman.findUnique({ where: { id } });
  if (!pinjaman) return { ok: false, code: 404, message: `Pinjaman id ${id} tidak ditemukan` };
  if (pinjaman.status === "selesai") {
    return { ok: false, code: 400, message: "Pinjaman ini sudah dikembalikan" };
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.pinjaman.update({
      where: { id },
      data: { status: "selesai", tanggalKembali: new Date() },
    });
    await tx.buku.update({
      where: { id: pinjaman.bukuId },
      data: { stok: { increment: 1 } },
    });
    return updated;
  });

  return { ok: true, data: result };
}

export async function deletePinjaman(id: number) {
  return prisma.pinjaman.delete({ where: { id } });
}