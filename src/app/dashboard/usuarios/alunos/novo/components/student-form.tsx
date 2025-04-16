"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { z } from "zod";
import { Roboto_Slab } from "next/font/google";

import { studentSchema, StudentSchemaType } from "@/schemas/studentSchema";
import { generateRegistration } from "@/lib/utils";
import { addNewStudent } from "../../actions/students";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
});

type StudentFormProps = {
  lastRegistration: string;
  courses: string[];
};

export default function StudentForm({
  lastRegistration,
  courses,
}: StudentFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
  });

  function generateNewRegistration() {
    const numberString = lastRegistration.replace("ALUNO", "");
    const number = parseInt(numberString, 10);
    const nextNumber = number + 1;
    return generateRegistration("ALUNO", nextNumber);
  }

  const matriculaGerada = generateNewRegistration();
  const senhaPadrao = "123456";

  async function onSubmit(data: StudentSchemaType) {
    const dadosCompletos = {
      ...data,
      matricula: matriculaGerada,
      senha: senhaPadrao,
    };
    console.log("Aluno a ser salvo:", dadosCompletos);
    await addNewStudent(dadosCompletos);
    router.back();
  }

  return (
    <main
      className={`bg-[#d9d9d9] flex-1 min-h-screen p-10 ${robotoSlab.variable} font-serif`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="text-zinc-900 text-3xl ">Cadastro de Aluno</div>
        <button
          onClick={() => router.back()}
          className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl inline-flex justify-center items-center gap-2"
        >
          <FaArrowLeft className="text-zinc-300 w-4 h-3.5" />
          <span className="text-zinc-300 text-base font-medium">Voltar</span>
        </button>
      </div>

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid md:grid-cols-2 gap-10 p-20">
            {/* Matrícula */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Matrícula
              </Label>
              <Input
                readOnly
                value={matriculaGerada}
                className="p-5 opacity-40 bg-neutral-500"
              />
            </div>

            {/* Data de Nascimento */}
            <FormField
              label="Data de Nascimento"
              type="date"
              register={register("dataNascimento")}
              error={errors.dataNascimento?.message}
            />

            {/* Nome */}
            <FormField
              label="Nome Completo"
              register={register("nomeCompleto")}
              error={errors.nomeCompleto?.message}
            />

            {/* Curso */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Curso <span className="text-rose-500">*</span>
              </Label>
              <select
                className="bg-white border border-[#ABABAB] p-3 rounded-lg w-full "
                {...register("curso")}
              >
                <option value="">Selecione um curso</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.curso && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.curso.message}
                </p>
              )}
            </div>

            {/* Email */}
            <FormField
              label="E-mail"
              type="email"
              register={register("email")}
              error={errors.email?.message}
            />

            {/* Senha */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Senha
              </Label>
              <Input
                readOnly
                value={senhaPadrao}
                type="password"
                className="opacity-40 bg-neutral-400 p-5"
              />
            </div>
          </CardContent>

          <div className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl mx-auto mb-10 flex justify-center items-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-zinc-300 text-base font-medium bg-transparent hover:bg-zinc-700 "
            >
              Salvar
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}

// Campo reutilizável
type FormFieldProps = {
  label: string;
  type?: string;
  register: any;
  error?: string;
};

function FormField({ label, type = "text", register, error }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-zinc-600 text-sm font-semibold">
        {label} <span className="text-rose-500">*</span>
      </Label>
      <Input {...register} type={type} className="p-5 border-[#ABABAB]" />
      {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
