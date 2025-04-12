"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { professorSchema, ProfessorSchemaType } from "@/schemas/professorSchema";
import { generateRegistration } from "@/lib/utils";
import { addNewProfessor } from "../../actions/professors";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { FaArrowLeft } from "react-icons/fa";

const schema = professorSchema; // assume que seu schema já define os campos: nome, dataNascimento, especialidade, email

type FormData = z.infer<typeof schema>;

type ProfessorFormProps = {
  lastRegistration: string; // Ex: "PROFESSOR0001" ou conforme seu padrão
};

export default function ProfessorForm({ lastRegistration }: ProfessorFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfessorSchemaType>({
    resolver: zodResolver(schema),
  });

  function generateNewRegistration() {
    // Caso o seu lastRegistration venha com o prefixo "PROFESSOR",
    // ajuste-o para o padrão que deseja. Exemplo:
    const numberString = lastRegistration.replace("PROFESSOR", "");
    const number = parseInt(numberString, 10);
    const nextNumber = number + 1;
    // Caso a lógica de generateRegistration já formate o número para "25P000X", utilize-a:
    const newRegistration = generateRegistration("25P", nextNumber);
    return newRegistration;
  }

  // Matrícula gerada e senha fixa
  const matriculaGerada = generateNewRegistration();
  const senhaPadrao = "assign2025";

  async function onSubmit(data: ProfessorSchemaType) {
    const dadosCompletos = {
      ...data,
      matricula: matriculaGerada,
      senha: senhaPadrao,
    };
    console.log("Professor a ser salvo:", dadosCompletos);
    await addNewProfessor(dadosCompletos);
    router.back();
  }

  return (
    <main className="bg-[#d9d9d9] flex-1  min-h-screen p-10 font-['Roboto_Slab']">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="justify-start text-zinc-900 text-3xl font-medium leading-[48px]">
          Cadastro de Professor
        </div>
        <div className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl inline-flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-5">
            <FaArrowLeft className="text-zinc-300 w-4 h-3.5" /> {/* Ícone */}
            <span className="justify-center text-zinc-300 text-base font-medium leading-normal">Voltar</span>
          </div>
        </div>
      </div>

      <Card className="bg-[#F3EDED] rounded-2xl justify-center items-center gap- flex-wrap content-center max-w-7xl mx-auto">
        <CardContent className="grid md:grid-cols-2 gap-10 p-20">
          {/* Matrícula (apenas leitura) */}
          <div className="space-y-4">
            <Label className="justify-start text-zinc-600 text-sm  font-semibold">Matrícula</Label>
            <Input readOnly value={matriculaGerada} className="p-5 opacity-40 justify-start text-color-slate-900 text-sm font-medium bg-neutral-500" />
          </div>

          {/* Data de nascimento */}
          <FormField
            label="Data de Nascimento"
            type="date"
            register={register("dataNascimento")}
            error={errors.dataNascimento?.message}
          />

          {/* Nome */}
          <FormField
            label="Nome"
            register={register("nome")}
            error={errors.nome?.message}

          />

          {/* Especialidade */}
          <FormField
            label="Especialidade"
            register={register("especialidade")}
            error={errors.especialidade?.message}
          />

          {/* E-mail */}
          <FormField
            label="E-mail"
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />

          {/* Senha padrão (apenas leitura) */}
          <div className="space-y-4">
            <Label className="justify-start text-zinc-600 text-sm font-semibold">Senha</Label>
            <Input
              readOnly
              data-required="false"
              value={senhaPadrao}
              type="password"
              className="opacity-40 justify-start text-color-slate-900 text-sm font-medium bg-neutral-400 p-5"
            />
          </div>
        </CardContent>

        <div className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl inline-flex justify-center items-center">
          <div className="text-base text-zinc-300" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            Salvar
          </div>
        </div>

      </Card>
    </main>
  );
}

// Componente de campo de formulário reutilizável
type FormFieldProps = {
  label: string;
  type?: string;
  register: any;
  error?: string;
};

function FormField({ label, type = "text", register, error }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="justify-start text-zinc-600 text-sm font-semibold">
        {label} <span className="text-rose-500">*</span>
      </Label>
      <Input {...register} type={type} className="p-5" />
      {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
