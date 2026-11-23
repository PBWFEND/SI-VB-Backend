
import { prisma } from "../../client.ts";

type DataBuku = {
    judul: string;
    penulis: string;
    tahun: number;
    stok?: number;
};

type UpdateBuku = {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
};

// Mengambil semua buku
export const ambilDaftarBuku = async () => {
    return await prisma.buku.findMany();
};

// Mengambil buku berdasarkan ID
export const ambilBukuById = async (id: number) => {
    return await prisma.buku.findUnique({
        where: { id },
    });
};

// Menambahkan buku
export const buatBuku = async (data: DataBuku) => {
    return await prisma.buku.create({
        data: {
            judul: data.judul,
            penulis: data.penulis,
            tahun: data.tahun,
            stok: data.stok ?? 0,
        },
    });
};

// Mengubah buku
export const ubahBuku = async (id: number, data: UpdateBuku) => {
    try {
        return await prisma.buku.update({
            where: { id },
            data,
        });
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2025"
        ) {
            return null;
        }

        throw error;
    }
};

// Menghapus buku
export const hapusBuku = async (id: number) => {
    try {
        await prisma.buku.delete({
            where: { id },
        });

        return true;
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2025"
        ) {
            return false;
        }

        throw error;
    }
};
