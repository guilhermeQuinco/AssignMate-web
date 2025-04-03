export type Professor = {
  matricula: string;
  nome: string;
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
  codigo: string;
  nome: string;
  descricao: string;
};
