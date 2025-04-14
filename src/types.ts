import { string } from "zod";

export type Professor = {
  matricula: string;
  nomeCompleto: string;
  dataNascimento: string;
  especialidade: string;
  email: string;
};

export type Aluno = {
  id: string;
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
  cargaHoraria: string;
  periodo: String;
};

export type Turma = {
  id: string;
  codigo: string;
  nome: string;
  semestre: string;
  turno: string;
  modalidade: string;
};
