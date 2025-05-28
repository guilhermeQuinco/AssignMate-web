"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaArrowLeft } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { studentSchema, StudentSchemaType } from "@/schemas/studentSchema";
import { addNewStudent } from "../../actions/students";
import { getCourses } from "@/app/dashboard/cursos/actions/course";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";
import { Container } from "@/app/dashboard/_components/container";
//import { Select } from "@radix-ui/react-select";

// Gera matrícula com prefixo e número com 4 dígitos
function generateRegistration(prefix: string, number: number): string {
  return prefix + number.toString().padStart(5, "0");
}

const formSchema = studentSchema.omit({ matricula: true, password: true });
type FormData = z.infer<typeof formSchema>;

type StudentFormProps = {
  lastRegistration?: string;
};

type CourseType = {
  id: number;
  nome: string;
};

export default function StudentForm({ lastRegistration }: StudentFormProps) {
  const router = useRouter();
  const [matriculaGerada, setMatriculaGerada] = useState<string>("");
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [erroSalvar, setErroSalvar] = useState<string | null>(null);

  const senhaPadrao = "assign2025";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matricula: lastRegistration || "",
      curso: "",
    }
  });

  useEffect(() => {
    const yearCode = String(new Date().getFullYear()).slice(-2);
    const prefix = `${yearCode}A`;

    const match = lastRegistration?.match(/\d+A(\d+)/);
    const lastNumber = match ? parseInt(match[1], 10) : 0;
    const nextNumber = lastNumber + 1;
    setMatriculaGerada(generateRegistration(prefix, nextNumber));

    async function fetchCourses() {
      try {
        const res = await getCourses();
        const list = Array.isArray(res) ? res : res?.data ?? [];
        setCourses(list);
      } catch (error) {
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    }
    fetchCourses();
  }, [lastRegistration]);

  // Envio do formulário
  async function onSubmit(data: FormData) {
    setErroSalvar(null);
    const payload: StudentSchemaType = {
      ...data,
      matricula: matriculaGerada,
      password: senhaPadrao,
    };
    try {
      // addNewProfessor deve retornar o registro criado
      const result = await addNewStudent(payload);

      // Navega para a lista e recarrega
      router.refresh();
      router.push('/dashboard/usuarios/alunos');
    } catch (err) {
      console.error('Erro ao salvar aluno:', err);
      setErroSalvar('Não foi possível cadastrar o aluno.');
    }
  }

  return (
    <Container>
      <SectionHeaderCadastro
        title="Cadastro de Aluno"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
          <CardContent className="grid md:grid-cols-2 gap-10 p-10">
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Matrícula
              </Label>
              <Input
                readOnly
                value={matriculaGerada}
                //{...register("matricula")}   --- aqui que envia para o banco
                className="p-5 bg-neutral-500 opacity-40"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Data nascimento <span className="text-rose-500">*</span>
              </Label>
              <Input
                type="date"
                {...register("dataNascimento")}
                className="p-5 border-[#ABABAB]"
              />
              {errors.dataNascimento && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.dataNascimento.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Nome <span className="text-rose-500">*</span>
              </Label>
              <Input
                type="text"
                {...register("nomeCompleto")}
                className="p-5 border-[#ABABAB]"
              />
              {errors.nomeCompleto && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.nomeCompleto.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Curso <span className="text-rose-500">*</span>
              </Label>
              <Select
                disabled={loadingCourses}
                onValueChange={(value) => {
                  // Atualiza o valor do react-hook-form manualmente
                  setValue("curso", value);
                }}
              >
                <SelectTrigger className="bg-transparent border border-[#ABABAB] p-5 rounded-lg w-full">
                  <SelectValue placeholder={loadingCourses ? "Carregando cursos..." : "Selecione um curso"} />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(courses) && courses.length > 0 && courses.map((course) => (
                    <SelectItem key={course.id} value={course.nome}>
                      {course.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.curso && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.curso.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                E‑mail <span className="text-rose-500">*</span>
              </Label>
              <Input
                type="email"
                {...register("email")}
                className="p-5 border-[#ABABAB]"
              />
              {errors.email && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Senha
              </Label>
              <Input
                readOnly
                type="password"
                value={senhaPadrao}
                className="p-5 bg-neutral-500 opacity-40"
              />
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !matriculaGerada}
                className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-300 disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>

            {erroSalvar && (
              <div className="md:col-span-2 text-center text-rose-500 mt-4">
                {erroSalvar}
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
