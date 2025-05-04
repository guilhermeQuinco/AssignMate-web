"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { courseSchema, CourseSchemaType } from "@/schemas/courseSchema";
import { addCourse } from "../actions/course";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SectionHeaderCadastro } from "../../_components/sectionHeaderCadastro";
export default function CourseForm() {
  const router = useRouter();
  const [codigoGerado, setCodigoGerado] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
  });

  const nomeCurso = watch("nome");

  // Gera o código com base nas 3 primeiras letras do nome do curso
  useEffect(() => {
    if (nomeCurso && nomeCurso.length >= 3) {
      const prefixo = nomeCurso.slice(0, 3).toUpperCase().replace(/\s+/g, "");
      setCodigoGerado(prefixo);
      setValue("codigo", prefixo);
    }
  }, [nomeCurso, setValue]);

  const onSubmit = async (data: CourseSchemaType) => {
    try {
      await addCourse(data);
      router.back(); // Redireciona após o cadastro
    } catch (error) {
      toast.error("Erro ao cadastrar curso.");
      console.error(error);
    }
  };

  return (
    <main className="bg-[#d9d9d9] flex-1 min-h-screen p-10 font-['Roboto_Slab']">
      <SectionHeaderCadastro
        title="Cadastro de Curso"
      />
      {/* Header */}
    

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-10 p-10"
          >
            {/* Lado esquerdo (Código e Nome) */}
            <div className="space-y-12">
              <div className="space-y-2">
                <Label className="text-zinc-600 text-sm font-semibold">
                  Código
                </Label>
                <Input
                  readOnly
                  disabled
                  type="text"
                  value={codigoGerado}
                  className="p-5 bg-neutral-500 text-white text-sm font-medium rounded-md"
                  {...register("codigo")}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-600 text-sm font-semibold">
                  Nome <span className="text-rose-500">*</span>
                </Label>
                <Input
                  type="text"
                  className="p-5 bg-white text-sm font-medium border border-zinc-500 text-black"
                  {...register("nome")}
                />
                {errors.nome && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>
            </div>

            {/* Lado direito (Descrição) */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Descrição
              </Label>
              <textarea
                className="outline-none w-full min-h-[185px] border border-zinc-500 bg-white p-5 resize-none text-sm text-zinc-600 rounded-md"
                {...register("descricao")}
              />
              {errors.descricao && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.descricao.message}
                </p>
              )}
            </div>

            {/* Botão de envio */}
            <div className="md:col-span-2 flex justify-center pt-4">
              <Button
                type="submit"
                className="w-32 h-10 bg-zinc-800 rounded-2xl text-white text-base font-medium"
                disabled={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
