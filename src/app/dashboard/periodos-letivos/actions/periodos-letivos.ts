"use server";

import { revalidatePath } from "next/cache";

// Tipos
export interface Course { id: string; nome: string }
export interface Turma { id: string; nome: string }
export interface Disciplina { id: string; nome: string; codigo: string }
export interface Professor { id: string; nome: string }
export interface Horario { id: string; intervalo: string }
export interface PeriodoLetivo {
  id: string;
  periodo: string;
  curso: Course;
  turma: Turma;
  modalidade: string;
  turno: string;
  disciplinas: Array<{
    codigo: string;
    disciplina: Disciplina;
    professor: Professor;
    diaSemana: string;
    horario: Horario;
  }>;
}

// Mocks de dados
const MOCK_COURSES: Course[] = [
  { id: "1", nome: "Sistemas da Informação" },
  { id: "2", nome: "Engenharia de Software" },
];
const MOCK_TURMAS: Turma[] = [
  { id: "1", nome: "SIS25N01" },
  { id: "2", nome: "ENG25N02" },
];
const MOCK_DISCIPLINAS: Disciplina[] = [
  { id: "1", codigo: "SIS001", nome: "Auditoria e Qualidade de Processo" },
  { id: "2", codigo: "SIS002", nome: "Engenharia de Software I" },
  { id: "3", codigo: "SIS003", nome: "Legislação e Ética Profissional" },
];
const MOCK_PROFESSORES: Professor[] = [
  { id: "1", nome: "Prof. Ana Silva" },
  { id: "2", nome: "Prof. Carlos Souza" },
];
const MOCK_HORARIOS: Horario[] = [
  { id: "1", intervalo: "08:00 - 10:00" },
  { id: "2", intervalo: "10:00 - 12:00" },
];

// Banco mock de períodos letivos
let MOCK_DB: PeriodoLetivo[] = [];

// Ações de leitura dos mocks
export async function getCourses(): Promise<Course[]> {
  return MOCK_COURSES;
}

export async function getTurmas(): Promise<Turma[]> {
  return MOCK_TURMAS;
}

export async function getDisciplinas(): Promise<Disciplina[]> {
  return MOCK_DISCIPLINAS;
}

export async function getProfessores(): Promise<Professor[]> {
  return MOCK_PROFESSORES;
}

export async function getHorarios(): Promise<Horario[]> {
  return MOCK_HORARIOS;
}

// Pega todos os períodos letivos (com paginação opcional)
export async function getPeriodosLetivos(params?: { page?: number; limit?: number }): Promise<{ data: PeriodoLetivo[]; total: number }> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const total = MOCK_DB.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = MOCK_DB.slice(start, end);
  return { data, total };
}

// Adiciona novo período letivo ao mock
export async function addPeriodoLetivo(novo: Omit<PeriodoLetivo, "id">): Promise<{ success: boolean; registro: PeriodoLetivo }> {
  const newRegistro: PeriodoLetivo = {
    id: String(MOCK_DB.length + 1),
    ...novo,
  };
  MOCK_DB.push(newRegistro);
  // Revalida a rota de listagem após inserção
  revalidatePath("/dashboard/periodos-letivos");
  return { success: true, registro: newRegistro };
}
