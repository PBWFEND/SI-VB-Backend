
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";

import { promisify } from "node:util";
import prisma from "../../client.ts";

const scrypt = promisify(scryptCallback);

// Validasi NIM harus tepat 12 digit angka
const isValidNim = (nim: string): boolean => {
  return /^\d{12}$/.test(nim);
};

// Password hashing menggunakan scrypt
const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16);
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
};

// Verifikasi password
const verifyPassword = async (
  password: string,
  storedHash: string,
): Promise<boolean> => {
  const [algorithm, saltHex, keyHex] = storedHash.split("$");

  if (algorithm !== "scrypt" || !saltHex || !keyHex) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const key = Buffer.from(keyHex, "hex");

  if (salt.length !== 16 || key.length !== 64) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return timingSafeEqual(key, derivedKey);
};

// Register pengguna
export const registerUser = async (data: {
  nim: string;
  nama: string;
  email: string;
  password: string;
}) => {
  if (!isValidNim(data.nim)) {
    throw new Error("INVALID_NIM");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { nim: data.nim },
        { email: data.email },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.nim === data.nim) {
      throw new Error("NIM_EXISTS");
    }

    throw new Error("EMAIL_EXISTS");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      passwordHash,
    },
  });

  return {
    id: user.id,
    nim: user.nim,
    nama: user.nama,
    email: user.email,
    createdAt: user.createdAt,
  };
};

// Login menggunakan NIM dan password
export const loginUser = async (data: {
  nim: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      nim: data.nim,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await verifyPassword(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id,
    nim: user.nim,
    nama: user.nama,
    email: user.email,
    createdAt: user.createdAt,
  };
};