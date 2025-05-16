"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { courseSchema, CourseSchemaType } from "@/schemas/courseSchema";
import { addCourse } from "../../actions/course";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";
import { Header } from "@/app/dashboard/_components/header";
import { SideBar } from "@/app/dashboard/_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type CursoFormProps = {
  initialCode?: string;
  codigoGerado?: string; // Adicionando 'codigoGerado' para aceitar como prop
};

export default function CursoForm({ initialCode = "" }: CursoFormProps) {
  const router = useRouter();
  const [codigoGerado, setCodigoGerado] = useState(initialCode);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      codigo: initialCode,
    },
  });

  const nomeCurso = watch("nome");

  useEffect(() => {
    if (!nomeCurso) return;
    const prefixo = nomeCurso.slice(0, 3).toUpperCase();
    setCodigoGerado(prefixo);
    setValue("codigo", prefixo);
  }, [nomeCurso, setValue]);

  async function onSubmit(data: CourseSchemaType) {
    try {
      await addCourse(data);
      toast.success("Curso cadastrado com sucesso!");
      router.refresh();
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar curso.");
    }
  }

  return (
    <Container>
      <SectionHeaderCadastro title="Cadastro de Curso" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto p-10">
          <CardContent className="flex justify-center grid md:grid-cols-2 gap-10">
            
            {/* Contêiner para os campos de Código e Nome */}
            <div className="space-y-10 flex flex-col w-full">
              {/* Código */}
              <div className="space-y-2">
                <Label className="text-zinc-600 text-sm font-semibold">
                  Código
                </Label>
                <Input
                  readOnly
                  value={codigoGerado}
                  className="p-5 opacity-40 bg-neutral-500 text-sm font-medium"
                  {...register("codigo")}
                />
              </div>

              {/* Nome */}
              <div className="space-y-2">
                <Label className="text-zinc-600 text-sm font-semibold">
                  Nome <span className="text-rose-500">*</span>
                </Label>
                <Input
                  type="text"
                  className="p-5 border-[#ABABAB] text-sm font-medium"
                  {...register("nome")}
                />
                {errors.nome && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contêiner para o campo Descrição */}
            <div className="space-y-2 flex flex-col">
              <Label className="text-zinc-600 text-sm font-semibold">
                Descrição <span className="text-rose-500">*</span>
              </Label>
              <textarea
                rows={6}
                className="w-full bg-transparent p-5 border border-[#ABABAB] rounded-md text-sm resize-none"
                {...register("descricao")}
              />
              {errors.descricao && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.descricao.message}
                </p>
              )}
            </div>

          </CardContent>

          {/* Botão de envio */}
          <div className="flex justify-center pt-10">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl text-zinc-300 text-base font-medium"
            >
              Salvar
            </Button>
          </div>

        </Card>
      </form>
    </Container>
  );
}
