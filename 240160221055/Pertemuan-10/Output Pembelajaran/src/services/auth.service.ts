
import prisma from "../../client.js";
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

const KEY_LENGTH = 64;

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");

  const derivedKey = (await scrypt(
    password,
    salt,
    KEY_LENGTH
  )) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (
  password: string,
  storedHash: string
) => {
  const parts = storedHash.split(":");

  if (parts.length !== 2) return false;

  const [salt, key] = parts;

  if (
    !salt ||
    !key ||
    !/^[a-f0-9]{32}$/i.test(salt) ||
    !/^[a-f0-9]{128}$/i.test(key)
  ) {
    return false;
  }

  const storedKey = Buffer.from(key, "hex");

  const derivedKey = (await scrypt(
    password,
    salt,
    KEY_LENGTH
  )) as Buffer;

  return timingSafeEqual(storedKey, derivedKey);
};

export const findUserByEmail = async (email: string) => {
  return prisma.pengguna.findUnique({
    where: { email },
  });
};

export const registerUser = async (data: {
  nama: string;
  email: string;
  passwordHash: string;
}) => {
  return prisma.pengguna.create({
    data,
    select: {
      id: true,
      nama: true,
      email: true,
      createdAt: true,
    },
  });
};