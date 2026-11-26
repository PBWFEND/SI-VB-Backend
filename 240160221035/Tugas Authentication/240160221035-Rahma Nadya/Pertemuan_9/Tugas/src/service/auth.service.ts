
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import prisma from "../../client.ts";

const scrypt = promisify(scryptCallback);

const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16);
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
};

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

export const registerUser = async (data: {
  nama: string;
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      nama: data.nama,
      email: data.email,
      passwordHash,
    },
  });

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
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
    nama: user.nama,
    email: user.email,
    createdAt: user.createdAt,
  };
};