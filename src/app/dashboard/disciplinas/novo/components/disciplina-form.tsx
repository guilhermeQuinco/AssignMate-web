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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";
import { Container } from "@/app/dashboard/_components/container";

const schema = disciplinaSchema;

type DisciplinaFormProps = {
  lastRegistration: string;
  courses: Course[];
  disciplinas: any[];
};

export default function DisciplinaForm({
  lastRegistration = "",
  courses,
  disciplinas,
}: DisciplinaFormProps) {

  const router = useRouter();
  const [codigoGerado, setCodigoGerado] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DisciplinaSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { codigo: lastRegistration },
  });

  const cursoId = watch("cursoId");

  useEffect(() => {
    if (!cursoId || !disciplinas.length) return;

    const curso = courses.find((c) => String(c.id) === cursoId);
    if (!curso) return;

    const prefixo = curso.nome.substring(0, 3).toUpperCase();

    const codigosFiltrados = disciplinas
      .filter((d) => d && typeof d.codigo === "string" && d.codigo.startsWith(prefixo))
      .map((d) => parseInt(d.codigo.slice(prefixo.length), 10))
      .filter((n) => !isNaN(n));

    const maxNumber = codigosFiltrados.length ? Math.max(...codigosFiltrados) : 0;
    const novoCodigo = `${prefixo}${String(maxNumber + 1).padStart(3, "0")}`;
    setCodigoGerado(novoCodigo);
    setValue("codigo", novoCodigo);
  }, [cursoId, disciplinas, courses, setValue]);

  const onSubmit = async (data: DisciplinaSchemaType) => {
    console.log(data);
    try {
      await addNewDisciplina(data);
      toast.success("Disciplina cadastrada com sucesso!");
      router.refresh();
      router.back();
    } catch (error) {
      toast.error("Erro ao cadastrar disciplina.");
      console.error(error);
    }
  };

  return (
    <Container>
      <SectionHeaderCadastro title="Cadastro de Disciplina" />

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-10 p-10"
          >
            {/* Código */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">Código</Label>
              <Input
                readOnly
                disabled
                value={codigoGerado}
                type="text"
                className="p-5 opacity-40 bg-neutral-500 text-sm font-medium"
                {...register("codigo")}
              />
            </div>

            {/* Curso */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Curso <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={cursoId}
                onValueChange={(v) => setValue("cursoId", v, { shouldValidate: true })}
              >
                <SelectTrigger className="p-5 border-[#ABABAB]">
                  <SelectValue placeholder="Selecione o curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((curso) => (
                    <SelectItem key={curso.id} value={String(curso.id)}>
                      {curso.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cursoId && <p className="text-rose-500 text-sm mt-1">{errors.cursoId.message}</p>}
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Nome <span className="text-rose-500">*</span>
              </Label>
              <Input
                type="text"
                className="p-5 opacity-40 bg-transparent text-sm font-medium border border-zinc-500 text-black"
                {...register("nome")}
              />
              {errors.nome && <p className="text-rose-500 text-sm mt-1">{errors.nome.message}</p>}
            </div>

            {/* Período */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Período <span className="text-rose-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("periodo", value)}>
                <SelectTrigger className="bg-transparent border border-[#ABABAB] p-5 rounded-lg w-full">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{`${i + 1}º`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.periodo && <span>{errors.periodo.message}</span>}
            </div>

            {/* Carga Horária */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Carga horária <span className="text-rose-500">*</span>
              </Label>
              <Input
                type="number"
                className="p-5 opacity-40 bg-transparent text-sm font-medium border border-zinc-500"
                {...register("cargaHoraria")}
              />
              {errors.cargaHoraria && <p className="text-rose-500 text-sm mt-1">{errors.cargaHoraria.message}</p>}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">Ementa</Label>
              <Input
                readOnly
                disabled
                type="text"
                className="p-5 opacity-40 bg-neutral-500 text-sm font-medium"
                placeholder="Definido pelo professor"
                value="Definido pelo professor"
                {...register("descricao")}
              />
            </div>

            <div className="md:col-span-2 flex justify-center">
              <Button
                type="submit"
                className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl text-zinc-300 text-base font-medium"
              >
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
