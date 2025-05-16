// 🔹 Mock de dados utilizados em Selects
export const mockCourses = [
  { id: "1", nome: "Sistemas da Informação" },
  { id: "2", nome: "Engenharia de Software" },
];

export const mockTurmas = [
  { id: "1", nome: "SIS25N01" },
  { id: "2", nome: "ENG25N02" },
];

export const mockDisciplinas = [
  { codigo: "SIS001", nome: "Auditoria e Qualidade de Processo" },
  { codigo: "SIS002", nome: "Engenharia de Software I" },
  { codigo: "SIS003", nome: "Legislação e Ética Profissional" },
];

export const mockProfessores = [
  { id: "1", nome: "Prof. Ana Silva" },
  { id: "2", nome: "Prof. Carlos Souza" },
];

export const mockHorarios = [
  { id: "1", intervalo: "08:30 - 12:00" },
  { id: "2", intervalo: "13:30 - 17:00" },
  { id: "3", intervalo: "18:30 - 21:30" },
];

export const periodosLetivos = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];