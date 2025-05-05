import { EnumValues, string } from "zod";

export type Professor = {
  id: number;
  matricula: string;
  nomeCompleto: string;
  dataNascimento: string;
  especialidade: string;
  email: string;
};

export type Aluno = {
  id: number;
  matricula: string;
  nomeCompleto: string;
  dataNascimento: string;
  email: string;
};

export type Course = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
};

export type Disciplina = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  cargaHoraria: number;
  periodo: string;
  cursoId: string;
  curso?: Course;
};

export type Turma = {
  id: string;
  codigo: string;
  semestre: string;
  turno: string;
  modalidade: string;
  cursoId: string;
  curso?: Course;
};
