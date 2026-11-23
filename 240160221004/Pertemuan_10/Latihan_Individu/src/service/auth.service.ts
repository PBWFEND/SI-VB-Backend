/**
 * Pertemuan 10 — Service authentication.
 */
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { prisma } from "../../client.ts";

type DataRegister = {
  nama: string;
  email: string;
  password: string;
  role?: string;
};

type ProfilPublik = {
  id: number;
  nama: string;
  email: string;
  role: string;
  createdAt: Date;
};

const hitungDerivedKey = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, 64, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(Buffer.from(key));
    });
  });

const hashPassword = async (password: string) => {
  const salt = randomBytes(16);
  const derivedKey = await hitungDerivedKey(password, salt);
  return `scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
};

const verifikasiPassword = async (password: string, storedHash: string) => {
  const [algorithm, saltHex, keyHex] = storedHash.split("$");
  if (algorithm !== "scrypt" || !saltHex || !keyHex) return false;

  const salt = Buffer.from(saltHex, "hex");
  const expectedKey = Buffer.from(keyHex, "hex");
  const actualKey = await hitungDerivedKey(password, salt);
  return actualKey.length === expectedKey.length && timingSafeEqual(actualKey, expectedKey);
};

export const buatAkun = async ({ nama, email, password, role }: DataRegister): Promise<ProfilPublik> => {
  const passwordHash = await hashPassword(password);
  return prisma.pengguna.create({
    data: { nama, email, passwordHash, ...(role !== undefined && { role }) },
    select: { id: true, nama: true, email: true, role: true, createdAt: true },
  });
};

export const autentikasi = async (email: string, password: string): Promise<ProfilPublik | null> => {
  const pengguna = await prisma.pengguna.findUnique({ where: { email } });
  if (!pengguna || !(await verifikasiPassword(password, pengguna.passwordHash))) {
    return null;
  }

  return {
    id: pengguna.id,
    nama: pengguna.nama,
    email: pengguna.email,
    role: pengguna.role,
    createdAt: pengguna.createdAt,
  };
};