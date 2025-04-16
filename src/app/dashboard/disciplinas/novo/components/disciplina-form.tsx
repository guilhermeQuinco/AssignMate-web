"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  disciplinaSchema,
  DisciplinaSchemaType,
} from "@/schemas/disciplinaSchema";
import { addNewDisciplina } from "../../actions/disciplinas";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";

const schema = disciplinaSchema;

type DisciplinaFormProps = {
  lastRegistration: string; // Exemplo: "MAT0005"
  courses: Course[];
};

export default function DisciplinaForm({
  lastRegistration,
  courses,
}: DisciplinaFormProps) {
  const router = useRouter();
  const [matriculaGerada, setMatriculaGerada] = useState("");
  const senhaPadrao = "assign2025";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DisciplinaSchemaType>({
    resolver: zodResolver(schema),
  });

  const nomeDisciplina = watch("nome");

  // Gera a matrícula com base nas três primeiras letras do nome e incrementa de acordo com o último registro.
  useEffect(() => {
    if (nomeDisciplina && nomeDisciplina.length >= 3) {
      const prefixo = nomeDisciplina.substring(0, 3).toUpperCase();
      // Se o último código registrado começa com esse prefixo, extrai o número; senão, começa em 0.
      const lastCode = lastRegistration.startsWith(prefixo)
        ? parseInt(lastRegistration.replace(prefixo, ""), 10)
        : 0;
      const nextNumber = (lastCode + 1).toString().padStart(4, "0");
      setMatriculaGerada(`${prefixo}${nextNumber}`);
    }
  }, [nomeDisciplina, lastRegistration]);

  async function onSubmit(data: DisciplinaSchemaType) {
    if (!matriculaGerada) {
      toast.error(
        "A matrícula não pôde ser gerada. Verifique o nome da disciplina."
      );
      return;
    }

    const dadosCompletos = {
      ...data,
    };

    try {
      await addNewDisciplina(dadosCompletos);
      toast.success("Disciplina cadastrada com sucesso!");
      router.back();
    } catch (error) {
      toast.error("Erro ao cadastrar disciplina.");
      console.error(error);
    }
  }

  return (
    <main className="bg-[#d9d9d9] flex-1 min-h-screen p-10 font-['Roboto_Slab']">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="text-zinc-600 text-3xl font-medium">
          Cadastro de Disciplina
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl text-zinc-300 text-base font-medium flex items-center gap-2"
        >
          <FaArrowLeft className="w-4 h-3.5" />
          Voltar
        </button>
      </div>

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
        <CardContent className="grid md:grid-cols-2 gap-10 p-10">
          {/* Campo: Código (gerado automaticamente) */}
          <div className="space-y-2">
            <Label className="text-zinc-600 text-sm font-semibold">
              Código
            </Label>
            <Input
              readOnly
              value={matriculaGerada}
              className="p-5 opacity-40 bg-neutral-500 text-sm font-medium"
            />
          </div>

          {/* Campo: Nome */}
          <FormField
            label="Nome"
            type={"text"}
            register={register("nome")}
            error={errors.nome?.message}
          />

          {/* Campo: Período */}
          <FormField
            label="Período"
            type={"text"}
            register={register("periodo")}
            error={errors.periodo?.message}
          />

          {/* Campo: Carga Horária */}
          <FormField
            label="Carga Horária"
            type={"number"}
            register={register("cargaHoraria")}
            error={errors.cargaHoraria?.message}
          />

          {/* Campo: Descrição */}
          <FormField
            label="Ementa"
            type={"text"}
            register={register("ementa")}
            error={errors.ementa?.message}
          />

          {/* Campo: Senha (fixa, somente leitura) */}

          {/* Curso */}
          <div className="space-y-2">
            <Label className="text-zinc-600 text-sm font-semibold">
              Curso <span className="text-rose-500">*</span>
            </Label>
            <select
              className="bg-transparent border border-[#ABABAB] p-3 rounded-lg w-full "
              {...register("curso")}
            >
              <option value="">Selecione um curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.nome}>
                  {course.nome}
                </option>
              ))}
            </select>
            {errors.curso && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.curso.message}
              </p>
            )}
          </div>

          {/* Botão de Envio */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl text-zinc-300 text-base font-medium"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              Salvar
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

// Componente reutilizável para os campos do formulário
type FormFieldProps = {
  label: string;
  register: any;
  error?: string;
  type: string;
};

function FormField({ label, register, error, type }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-zinc-600 text-sm font-semibold">
        {label} <span className="text-rose-500">*</span>
      </Label>
      <Input
        {...register}
        className={`p-5 border-[#ABABAB] ${error ? "border-red-500" : ""}`}
        type={type}
      />
      {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
