import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { prisma } from "../../client.ts";

const scryptAsync = promisify(scrypt);

const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16).toString("hex");

  const derivedKey = (await scryptAsync(
    password,
    salt,
    64,
  )) as Buffer;

  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
};

const verifyPassword = async (
  password: string,
  storedHash: string,
): Promise<boolean> => {
  const [algorithm, salt, key] = storedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !key) {
    return false;
  }

  const derivedKey = (await scryptAsync(
    password,
    salt,
    64,
  )) as Buffer;

  const storedKey = Buffer.from(key, "hex");

  if (derivedKey.length !== storedKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, storedKey);
};

export const register = async (
  nama: string,
  email: string,
  password: string,
) => {
  const passwordHash = await hashPassword(password);

  const pengguna = await prisma.pengguna.create({
    data: {
      nama,
      email: email.toLowerCase(),
      passwordHash,
    },
    select: {
      id: true,
      nama: true,
      email: true,
    },
  });

  return pengguna;
};

export const login = async (
  email: string,
  password: string,
) => {
  const pengguna = await prisma.pengguna.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!pengguna) {
    return null;
  }

  const isPasswordValid = await verifyPassword(
    password,
    pengguna.passwordHash,
  );

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: pengguna.id,
    nama: pengguna.nama,
    email: pengguna.email,
  };
};
