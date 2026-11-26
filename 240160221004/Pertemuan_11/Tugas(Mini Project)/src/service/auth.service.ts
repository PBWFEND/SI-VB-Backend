import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../client";
import { ENV } from "../config/env";

export function validateRegister(body: any) {
  const errors: string[] = [];
  if (typeof body.nama !== "string" || body.nama.trim() === "") errors.push("Nama wajib diisi");
  if (typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push("Format email tidak valid");
  if (typeof body.password !== "string" || body.password.length < 6) errors.push("Password minimal 6 karakter");

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data: { nama: body.nama.trim(), email: body.email.toLowerCase().trim(), password: body.password } };
}

export async function registerUser(nama: string, email: string, pass: string) {
  const existing = await prisma.pengguna.findUnique({ where: { email } });
  if (existing) return { ok: false, code: 400, message: "Email sudah terdaftar" };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  const pengguna = await prisma.pengguna.create({
    data: { nama, email, password: hashedPassword, role: "user" },
  });

  return { ok: true, data: { id: pengguna.id, nama: pengguna.nama, email: pengguna.email, role: pengguna.role } };
}

export async function loginUser(email: string, pass: string) {
  const pengguna = await prisma.pengguna.findUnique({ where: { email } });

  // 🔍 DEBUG — HAPUS SETELAH SELESAI
  console.log("=== DEBUG LOGIN ===");
  console.log("Email dikirim:", JSON.stringify(email));
  console.log("User ditemukan:", pengguna ? "YA" : "TIDAK");
  if (pengguna) {
    console.log("Email di DB:", JSON.stringify(pengguna.email));
    console.log("Hash di DB (30 char):", pengguna.password.substring(0, 30));
  }
  // 🔍 AKHIR DEBUG

  if (!pengguna) return { ok: false, code: 401, message: "Email atau password salah" };

  const isMatch = await bcrypt.compare(pass, pengguna.password);

  // 🔍 DEBUG — HAPUS SETELAH SELESAI
  console.log("Password cocok:", isMatch);
  console.log("===================");
  // 🔍 AKHIR DEBUG

  if (!isMatch) return { ok: false, code: 401, message: "Email atau password salah" };

  const token = jwt.sign(
    { id: pengguna.id, email: pengguna.email, role: pengguna.role }, 
    ENV.JWT_SECRET, 
    { expiresIn: ENV.JWT_EXPIRES_IN as any }
  );

  return { ok: true, data: { user: { id: pengguna.id, nama: pengguna.nama, email: pengguna.email, role: pengguna.role }, token } };
}