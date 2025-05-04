"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { turmaSchema, TurmaSchemaType } from "@/schemas/turmaSchema";
import { addNewTurma } from "../../actions/turmas";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import removeAccents from "remove-accents";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";

type TurmaFormProps = {
  courses: Course[];
};

export function TurmaForm({
  courses,
}: TurmaFormProps) {

  const router = useRouter();
  const [codigoGerado, setCodigoGerado] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TurmaSchemaType>({
    resolver: zodResolver(turmaSchema),
  });

  const nomeCurso = watch("curso");
  const turno = watch("turno");
  const semestre = watch("semestre");

  useEffect(() => {
    if (!nomeCurso) return;  // Verifica se nomeCurso está definido

    const cursoSelecionado = courses?.find((c) => removeAccents(c.nome).toLowerCase() === removeAccents(nomeCurso).toLowerCase());
    if (!cursoSelecionado) return;

    if (turno && semestre) {
      const ano = new Date().getFullYear();
      const anoFinal = String(ano).slice(-2);
      const turnoInicial = turno.charAt(0).toUpperCase();
      const semestreNumero = semestre.endsWith(".1") ? "01" : "02";
      const iniciaisCurso = removeAccents(cursoSelecionado.nome)
        .slice(0, 3)
        .toUpperCase();

      const codigo = `${iniciaisCurso}${anoFinal}${turnoInicial}${semestreNumero}`;
      setCodigoGerado(codigo);
      setValue("codigo", codigo);
    }
  }, [nomeCurso, turno, semestre, courses, setValue]);


  const onSubmit = async (data: TurmaSchemaType) => {
    try {
      await addNewTurma(data);
      toast.success("Turma cadastrada com sucesso!");
      router.refresh();
      router.back();
    } catch (error) {
      toast.error("Erro ao cadastrar turma.");
      console.error(error);
    }
  };

  return (
    <Container>
      <SectionHeaderCadastro
        title="Cadastro de Turma"
      />
      {/* Header */}

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7xl mx-auto">
        <CardContent>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-10 p-10"
          >
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Código
              </Label>
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
                onValueChange={(v) => {
                  setValue("curso", v);
                }}
              >
                <SelectTrigger className="p-5 border-[#ABABAB]">
                  <SelectValue placeholder="Selecione o curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((curso) => (
                    <SelectItem key={curso.id} value={String(curso.id)}>{curso.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.curso && <p className="text-rose-500 text-sm mt-1">{errors.curso.message}</p>}
            </div>

            {/* Turno */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Turno <span className="text-rose-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("turno", value as TurmaSchemaType["turno"])}>
                <SelectTrigger className="bg-transparent border border-[#ABABAB] p-5 rounded-lg w-full">
                  <SelectValue placeholder="Selecione o turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MANHA">MANHÃ</SelectItem>
                  <SelectItem value="TARDE">TARDE</SelectItem>
                  <SelectItem value="NOITE">NOITE</SelectItem>
                </SelectContent>
              </Select>
              {errors.turno && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.turno.message}
                </p>
              )}
            </div>

            {/* Semestre */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Semestre <span className="text-rose-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("semestre", value)}>
                <SelectTrigger className="bg-transparent border border-[#ABABAB] p-5 rounded-lg w-full">
                  <SelectValue placeholder="Selecione o semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">01</SelectItem>
                  <SelectItem value="02">02</SelectItem>
                </SelectContent>
              </Select>
              {errors.semestre && (
                <span className="text-rose-500 text-sm mt-1">
                  {errors.semestre.message}
                </span>
              )}
            </div>

            {/* Modalidade */}
            <div className="space-y-2">
              <Label className="text-zinc-600 text-sm font-semibold">
                Modalidade <span className="text-rose-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("modalidade", value as TurmaSchemaType["modalidade"])}>
                <SelectTrigger className="bg-transparent border border-[#ABABAB] p-5 rounded-lg w-full">
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                  <SelectItem value="EAD">EAD</SelectItem>
                  <SelectItem value="HIBRIDO">Híbrido</SelectItem>
                </SelectContent>
              </Select>
              {errors.modalidade && (
                <span className="text-rose-500 text-sm mt-1">
                  {errors.modalidade.message}
                </span>
              )}
            </div>

            {/* Botão de Envio */}
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
