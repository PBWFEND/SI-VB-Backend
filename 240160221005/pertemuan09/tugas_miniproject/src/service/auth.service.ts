import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../client';
import ApiError from '../utils/ApiError';
import {
  RegisterInput,
  LoginInput,
  PublicUser,
  AuthResult,
} from '../types/auth';

const SALT_ROUNDS = 10;

/** Mapping eksplisit — JANGAN pernah ikutkan `password` ke response. */
const toPublicUser = (user: {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}): PublicUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const signToken = (user: PublicUser): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET belum dikonfigurasi di .env');

  return jwt.sign(
    { sub: String(user.id), email: user.email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '1d' } as jwt.SignOptions,
  );
};

export const register = async (input: RegisterInput): Promise<AuthResult> => {
  const email = input.email.trim().toLowerCase();

  // Pre-check untuk pesan error yang ramah (unique constraint di DB tetap menjaga).
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ApiError(409, 'Email sudah terdaftar', [
      { field: 'email', message: 'email sudah digunakan' },
    ]);
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const created = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
    },
  });

  const user = toPublicUser(created);
  return { user, token: signToken(user) };
};

export const login = async (input: LoginInput): Promise<AuthResult> => {
  const email = input.email.trim().toLowerCase();

  const found = await prisma.user.findUnique({ where: { email } });

  // Pesan sama untuk email tidak ada / password salah → hindari user enumeration.
  if (!found) {
    throw new ApiError(401, 'Email atau password salah');
  }

  const passwordOk = await bcrypt.compare(input.password, found.password);
  if (!passwordOk) {
    throw new ApiError(401, 'Email atau password salah');
  }

  const user = toPublicUser(found);
  return { user, token: signToken(user) };
};