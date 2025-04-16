"use client";

import { Book, Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { turmaSchema, TurmaSchemaType } from "@/schemas/turmaSchema";
import { Label } from "@/components/ui/label";
import { addNewTurma } from "../../actions/turmas";
import { Container } from "@/app/dashboard/_components/container";
import { FaArrowLeft } from "react-icons/fa";

export function TurmaForm() {
  const [turma, setTurma] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TurmaSchemaType>({
    resolver: zodResolver(turmaSchema),
    defaultValues: {
      nome: "",
      codigo: "",
    },
  });

  const router = useRouter();

  function generateTurmaCode() {
    return turma.slice(0, 3).toUpperCase();
  }

  const createTurma = async (data: TurmaSchemaType) => {
    try {
      await addNewTurma(data);
      router.back();
      router;
    } catch (error) {
      console.error(error);
    }
  };

  const turmaName = watch("nome");

  useEffect(() => {
    if (turmaName) {
      const generatedCode = turmaName
        .slice(0, 3)
        .toUpperCase()
        .replace(/\s+/g, ""); // Remove espaços se houver

      setValue("codigo", generatedCode);
    }
  }, [turmaName, setValue]);

  return (
    <main className="min-h-screen bg-[#d9d9d9]">
      <Container>
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
        <div className=" rounded-xl mt-14  bg-white p-20">
          <form
            onSubmit={handleSubmit(createTurma)}
            className="flex flex-col gap-10"
          >
            <div className="grid grid-cols-2 gap-14">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <Label className="text-zinc-600 text-sm font-semibold">
                    Código <span className="text-rose-500">*</span>
                  </Label>
                  <div className="flex flex-row bg-gray-400 rounded-lg p-3 gap-3 items-center">
                    <Controller
                      name="codigo"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="codigo"
                          className="w-full rounded bg-transparent outline-none text-black font-semibold"
                          placeholder="Código será gerado automaticamente"
                          readOnly
                          disabled
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <Label className="text-zinc-600 text-sm font-semibold">
                      Nome <span className="text-rose-500">*</span>
                    </Label>
                    <div className="flex flex-row bg-white rounded-lg p-3 items-center gap-3 border border-zinc-400">
                      <Controller
                        name="nome"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            id="nome"
                            className="w-full  bg-white rounded outline-none text-black"
                            placeholder="Digite o nome do curso"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">
                    Turno <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    className="bg-white border border-[#ABABAB] p-3 rounded-lg w-full "
                    {...register("turno")}
                  >
                    <option value="">Selecione um curso</option>
                    <option value="MANHA">Manhã</option>
                    <option value="NOITE">Noite</option>
                  </select>
                  {errors.turno && (
                    <p className="text-rose-500 text-sm mt-1">
                      {errors.turno.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <Label className="text-zinc-600 text-sm font-semibold">
                    Semestre <span className="text-rose-500">*</span>
                  </Label>
                  <div className="flex flex-row bg-white rounded-lg  gap-3 items-center">
                    <select
                      className="bg-white border border-[#ABABAB] p-3 rounded-lg w-full "
                      {...register("semestre")}
                    >
                      <option value="">Selecione o semestre</option>
                      <option value="2025.1">2025.1</option>
                    </select>
                    {errors.semestre && (
                      <p className="text-rose-500 text-sm mt-1">
                        {errors.semestre.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label className="text-zinc-600 text-sm font-semibold">
                    Curso <span className="text-rose-500">*</span>
                  </Label>
                  <div className="flex flex-row bg-white rounded-lg  gap-3 items-center">
                    <select
                      className="bg-white border border-[#ABABAB] p-3 rounded-lg w-full "
                      {...register("curso")}
                    >
                      <option value="">Selecione o semestre</option>
                      <option value="2025.1">2025.1</option>
                    </select>
                    {errors.semestre && (
                      <p className="text-rose-500 text-sm mt-1">
                        {errors.semestre.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="text-zinc-600 text-sm font-semibold">
                    Modalidade <span className="text-rose-500">*</span>
                  </Label>
                  <div className="flex flex-row bg-white rounded-lg  gap-3 items-center">
                    <select
                      className="bg-white border border-[#ABABAB] p-3 rounded-lg w-full "
                      {...register("curso")}
                    >
                      <option value="">Selecione a Modalidade</option>
                      <option value="PRESENCIAL">Presencial</option>
                      <option value="EAD">EAD</option>
                      <option value="HÍBRIDO">HÍBRIDO</option>
                    </select>
                    {errors.semestre && (
                      <p className="text-rose-500 text-sm mt-1">
                        {errors.semestre.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center flex-row">
              <Button type="submit" className="w-[10%] py-5">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
}
