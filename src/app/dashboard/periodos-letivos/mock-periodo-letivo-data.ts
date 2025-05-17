// 🔹 Mock de dados utilizados em Selects
export const mockCourses = [
  { id: "1", nome: "Sistemas da Informação" },
  { id: "2", nome: "Engenharia de Software" },
  { id: "3", nome: "Engenharia de Sistemas Computacionais com Ênfase em Inteligência Artificial e Machine Learning" },
  { id: "4", nome: "Medicina" },
];

export const mockTurmas = [
  { id: "1", nome: "SIS25N01" },
  { id: "2", nome: "ENG25N02" },
  { id: "3", nome: "ENGSI25N01" },
  { id: "4", nome: "MED25N01" },
];

export const mockDisciplinas = [
  { codigo: "SIS001", nome: "Auditoria e Qualidade de Processo" },
  { codigo: "SIS002", nome: "Engenharia de Software I" },
  { codigo: "SIS003", nome: "Legislação e Ética Profissional" },
  //{ codigo: "SIS004", nome: "Sistemas Distribuídos" },
  { codigo: "SIS004", nome: "Estudos de Gestão da Informação e Conhecimento em Ambientes de Negócios Digitais Interdisciplinares" },
  { codigo: "SIS005", nome: "Tópicos Especiais I" },
  //{ codigo: "MED001", nome: "Anatomia" },
];

export const mockProfessores = [
  { id: "1", nome: "Israel Tavares" },
  { id: "2", nome: "Ana Silva Pereira" },
  { id: "3", nome: "Carlos Souza" },
  { id: "4", nome: "Maria Carolina Sofia de Jesus Ferreira Lima Santos" },
];

export const mockHorarios = [
  { id: "1", intervalo: "08:30 - 12:00" },
  { id: "2", intervalo: "13:30 - 17:00" },
  { id: "3", intervalo: "18:30 - 21:30" },
];

export const mockPeriodoLetivo = [
  {
    id: "1",
    periodoLetivo: "2025.1",
    curso: { id: "1", nome: "Sistemas da Informação" },
    turma: "SIS25N01",
    disciplina: "Auditoria e Qualidade de Processo",
    professor: "Israel Tavares",
    diaSemana: "Segunda",
    turno: "Matutino",
  },
  {
    id: "2",
    periodoLetivo: "2025.1",
    curso: { id: "1", nome: "Engenharia de Software" },
    turma: "ENG25N02",
    disciplina: "Engenharia de Software I",
    professor: "Carlos Souza",
    diaSemana: "Terça",
    turno: "Vespertino",
  },
  {
    id: "3",
    periodoLetivo: "2025.1",
    curso: { id: "1", nome: "Sistemas da Informação" },
    turma: "SIS25N01",
    disciplina: "Legislação e Ética Profissional",
    professor: "Ana Silva Pereira",
    diaSemana: "Quarta",
    turno: "Noturno",
  },
  {
    id: "4",
    periodoLetivo: "2025.2",
    curso: { id: "3", nome: "Engenharia de Sistemas Computacionais com Ênfase em Inteligência Artificial e Machine Learning" },
    turma: "ENGSI25N01",
    disciplina: "Estudos de Gestão da Informação e Conhecimento em Ambientes de Negócios Digitais Interdisciplinares",
    professor: "Maria Carolina Sofia de Jesus Ferreira Lima Santos",
    diaSemana: "Quarta",
    turno: "Noturno",
  },
  {
    id: "5",
    periodoLetivo: "2025.1",
    curso: { id: "4", nome: "Medicina" },
    turma: "MED25N01",
    disciplina: "Anatomia",
    professor: "Maria Julieta da Silva Santos",
    diaSemana: "Quarta",
    turno: "Matutino",
  },
];

export const periodosLetivos = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];