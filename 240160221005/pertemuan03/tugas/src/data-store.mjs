// src/data-store.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_PATH  = path.join(__dirname, "..", "data", "students.json");

export async function readStudents() {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function writeStudents(students) {
  const payload = JSON.stringify(students, null, 2);
  await writeFile(DATA_PATH, payload, "utf-8");
  return students;
}

export async function addStudent(student) {
  const students = await readStudents();
  const newStudent = {
    id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
    ...student,
  };
  students.push(newStudent);
  await writeStudents(students);
  return newStudent;
}