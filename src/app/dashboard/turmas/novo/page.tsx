"use client";


import { Book, Code } from "lucide-react";
import { Container } from "../../_components/container";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewTurma } from "../actions/turmas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { turmaSchema, TurmaSchemaType } from "@/schemas/turmaSchema";


export default function TurmaForm() {
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
    <main className="min-h-screen bg-[#065D89]">
      <Container>
        <div className="lex justify-center items-center rounded-2xl  mt-14 bg-black/10 p-20">
          <form
            className="grid grid-cols-2 gap-14"
            onSubmit={handleSubmit(createTurma)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <label className="text-xl">Disciplina</label>
                <div className="flex flex-row bg-white rounded-lg p-3 items-center gap-3">
                  <Book color="black" />

                  <Controller
                    name="nome"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="nome"
                        className="w-full p-2 bg-white rounded outline-none text-black"
                        placeholder="Digite o nome do curso"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xl">Código da turma</label>
                <div className="flex flex-row bg-gray-400 rounded-lg p-3 outline gap-3 items-center">
                  <Code color="black" />
                  <Controller
                    name="codigo"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="codigo"
                        className="w-full p-2 rounded bg-transparent outline-none text-black font-semibold"
                        placeholder="Código será gerado automaticamente"
                        readOnly
                        disabled
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl">Modalidade</label>
              <div className="flex flex-row bg-white rounded-lg p-3 outline gap-3 items-center">
                <textarea
                  className="bg-transparent text-black outline-none text-lg w-full min-h-[500px]"
                  {...register("modalidade")}
                />
              </div>
            </div>

            <Button type="submit">Salvar</Button>
          </form>
        </div>
      </Container>
    </main>
  );
}
