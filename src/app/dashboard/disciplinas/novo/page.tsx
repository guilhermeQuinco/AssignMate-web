"use client";

import { Book, Code } from "lucide-react";
import { Container } from "../../_components/container";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewDisciplina } from "../actions/disciplinas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { disciplinaSchema, DisciplinaSchemaType } from "@/schemas/disciplinaSchema";


export default function DisciplinaForm() {
  const [disciplina, setDisciplina] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DisciplinaSchemaType>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: "",
      codigo: "",
    },
  });

  const router = useRouter();

  function generateDisciplinaCode() {
    return disciplina.slice(0, 3).toUpperCase();
  }

  const createDisciplina = async (data: DisciplinaSchemaType) => {
    try {
      await addNewDisciplina(data);
      router.back();
      router;
    } catch (error) {
      console.error(error);
    }
  };

  const disciplinaName = watch("nome");

  useEffect(() => {
    if (disciplinaName) {
      const generatedCode = disciplinaName
        .slice(0, 3)
        .toUpperCase()
        .replace(/\s+/g, ""); // Remove espaços se houver

      setValue("codigo", generatedCode);
    }
  }, [disciplinaName, setValue]);

  return (
    <main className="min-h-screen bg-[#065D89]">
      <Container>
        <div className="lex justify-center items-center rounded-2xl  mt-14 bg-black/10 p-20">
          <form
            className="grid grid-cols-2 gap-14"
            onSubmit={handleSubmit(createDisciplina)}
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
                <label className="text-xl">Código da disciplina</label>
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
              <label className="text-xl">Descrição</label>
              <div className="flex flex-row bg-white rounded-lg p-3 outline gap-3 items-center">
                <textarea
                  className="bg-transparent text-black outline-none text-lg w-full min-h-[500px]"
                  {...register("descricao")}
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
