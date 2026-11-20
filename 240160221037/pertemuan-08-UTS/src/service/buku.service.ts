
import { prisma } from "../../client.ts";

// Mengambil seluruh data buku
export const ambilDaftarBuku = async () => {
    return await prisma.buku.findMany({
        orderBy: {
            id: "asc",
        },
    });
};

// Mengambil buku berdasarkan ID
export const ambilBukuById = async (id: number) => {
    return await prisma.buku.findUnique({
        where: { id },
    });
};

// Menambahkan buku
export const buatBuku = async (data: {
    judul: string;
    penulis: string;
    tahun: number;
    stok: number;
}) => {
    return await prisma.buku.create({
        data,
    });
};

// Mengubah data buku
export const ubahBuku = async (
    id: number,
    data: {
        judul?: string;
        penulis?: string;
        tahun?: number;
        stok?: number;
    }
) => {
    return await prisma.buku.update({
        where: { id },
        data,
    });
};

// Menghapus buku
export const hapusBuku = async (id: number) => {
    return await prisma.buku.delete({
        where: { id },
    });
};
