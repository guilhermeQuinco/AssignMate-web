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

import { professorSchema, ProfessorSchemaType } from "@/schemas/professorSchema";
import { addNewProfessor } from "../../actions/professors";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";
// Gera matrícula com prefixo e número com 4 dígitos
function generateRegistration(prefix: string, number: number): string {
  return prefix + number.toString().padStart(5, "0");
}

const formSchema = professorSchema.omit({ matricula: true, password: true });
type FormData = z.infer<typeof formSchema>;

type ProfessorFormProps = {
  lastRegistration?: string;
};

export default function ProfessorForm({ lastRegistration }: ProfessorFormProps) {
  const router = useRouter();
  const [matriculaGerada, setMatriculaGerada] = useState<string>("");
  const [erroSalvar, setErroSalvar] = useState<string | null>(null);

  const senhaPadrao = "assign2025";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matricula: lastRegistration || "",
    }
  });

  useEffect(() => {
    const yearCode = String(new Date().getFullYear()).slice(-2);
    const prefix = `${yearCode}P`;

    const match = lastRegistration?.match(/\d+P(\d+)/);
    const lastNumber = match ? parseInt(match[1], 10) : 0;
    const nextNumber = lastNumber + 1;
    setMatriculaGerada(generateRegistration(prefix, nextNumber));
  }, [lastRegistration]);

  // Envio do formulário
  async function onSubmit(data: FormData) {
    setErroSalvar(null);
    const payload: ProfessorSchemaType = {
      ...data,
      matricula: matriculaGerada,
      password: senhaPadrao,
    };
    try {
      // addNewProfessor deve retornar o registro criado
      const result = await addNewProfessor(payload);

      // Navega para a lista e recarrega
      router.refresh();
      router.push('/dashboard/usuarios/professores');
    } catch (err) {
      console.error('Erro ao salvar professor:', err);
      setErroSalvar('Não foi possível cadastrar o professor.');
    }
  }

  return (
    <Container>
      <SectionHeaderCadastro
        title="Cadastro de Professor"
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
                Especialidade <span className="text-rose-500">*</span>
              </Label>
              <Input
                type="text"
                {...register("especialidade")}
                className="p-5 border-[#ABABAB]"
              />
              {errors.especialidade && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.especialidade.message}
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
