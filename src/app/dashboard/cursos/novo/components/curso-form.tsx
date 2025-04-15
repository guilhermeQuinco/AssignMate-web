"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa";

const cursoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
});

type CursoSchemaType = z.infer<typeof cursoSchema>;

export default function CadastroCurso() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CursoSchemaType>({
    resolver: zodResolver(cursoSchema),
  });

  const handleBack = () => {
    router.push("/curso");
  };

  async function onSubmit(data: CursoSchemaType) {
    console.log("Curso a ser salvo:", data);
    router.back();
  }

  return (
    <main className="bg-[#d9d9d9] flex-1 min-h-screen p-10 font-['Roboto_Slab']">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-zinc-600 text-3xl font-medium leading-[48px]">
          Cadastro de Curso
        </h1>
        <button
          type="button"
          onClick={handleBack}
          className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl inline-flex justify-center items-center gap-2 text-zinc-300 text-base font-medium"
        >
          <FaArrowLeft className="w-4 h-3.5" />
          Voltar
        </button>
      </div>

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
        <CardContent className="flex justify-center grid md:grid-cols-2 gap-10 p-10">
          <div className="space-y-2">
            <Label className="text-zinc-600 text-sm font-semibold">Código</Label>
            <Input
              readOnly
              value={"CURS0001"}
              className="p-5 opacity-40 text-sm font-medium bg-neutral-400"
            />
          </div>

          <FormField
            label="Descrição"
            register={register("descricao")}
            error={errors.descricao?.message}
            isTextArea
          />

          <FormField
            label="Nome"
            register={register("nome")}
            error={errors.nome?.message}
          />

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl inline-flex justify-center items-center gap-2 text-base text-zinc-300"
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

type FormFieldProps = {
  label: string;
  type?: string;
  register: any;
  error?: string;
  isTextArea?: boolean;
};

function FormField({
  label,
  type = "text",
  register,
  error,
  isTextArea = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2 w-full">
      <Label className="text-zinc-600 text-sm font-semibold">
        {label} <span className="text-rose-500">*</span>
      </Label>
      {isTextArea ? (
        <textarea
          {...register}
          rows={3}
          className="w-full p-5 border border-[#ABABAB] rounded-md"
        />
      ) : (
        <Input {...register} type={type} className="p-5 border-[#ABABAB]" />
      )}
      {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
