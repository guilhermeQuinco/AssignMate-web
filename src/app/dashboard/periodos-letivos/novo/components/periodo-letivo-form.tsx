"use client";

import React from "react";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderCadastro } from "@/app/dashboard/_components/sectionHeaderCadastro";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addPeriodoLetivo } from "../../actions/periodos-letivos";
import { PeriodoLetivoSchemaType, periodoLetivoSchema } from "@/schemas/periodo-letivoSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Tipos opcionais
type PeriodoLetivoFormProps = {
  courses: { id: string; nome: string }[];
  turmas: { id: string; nome: string }[];
  disciplinas: { codigo: string; nome: string }[];
  professores: { id: string; nome: string }[];
  horarios: { id: string; intervalo: string }[];
  diasSemana: string[];
  periodos: string[];
};

export default function PeriodoLetivoForm({
  courses,
  turmas,
  disciplinas,
  professores,
  horarios,
  diasSemana,
  periodos,
}: PeriodoLetivoFormProps) {

  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PeriodoLetivoSchemaType>({
    resolver: zodResolver(periodoLetivoSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      cargaHoraria: 60,
      periodo: "",
      cursoId: "",
    },
  });

  const onSubmit = async (data: PeriodoLetivoSchemaType) => {
    const payload = {
      ...data,
      disciplinas: [],
      modalidade: "Presencial",
      turno: "Noturno",
    };

    try {
      await addPeriodoLetivo(payload);
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
      <SectionHeaderCadastro title="Cadastro de Período Letivo" />

      <Card className="bg-[#F3EDED] rounded-2xl max-w-7x1 mx-auto p-10">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <div className="space-y-8">
              <div className="grid md:grid-cols-7 gap-7">
                {/* Período Letivo */}
                <div className="space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">Período Letivo</Label>
                  <Input 
                  readOnly
                  disabled
                  type="text" 
                  value="2025/01"
                  className="opacity-40 bg-neutral-500 text-sm font-medium"
                  />
                </div>
                
                {/* Curso */}
                <div className="col-span-2 space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">Curso <span className="text-rose-500">*</span></Label>
                  <Select onValueChange={(value) => setValue("cursoId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cursoId && (
                    <p className="text-red-500 text-sm">{errors.cursoId.message}</p>
                  )}
                </div>

                {/* Turma */}
                <div className="space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">Turma <span className="text-rose-500">*</span></Label>
                  <Select onValueChange={(value) => setValue("turma", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {turmas.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cursoId && (
                    <p className="text-red-500 text-sm">{errors.cursoId.message}</p>
                  )}
                </div>

                {/* Período */}
                <div className="space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">Período <span className="text-rose-500">*</span></Label>
                  <Select onValueChange={(value) => setValue("periodo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {periodos?.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c} º
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cursoId && (
                    <p className="text-red-500 text-sm">{errors.cursoId.message}</p>
                  )}
                </div>

                {/* Modalidade */}
                <div className="space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">Modalidade</Label>
                  <Input 
                  readOnly
                  disabled
                  type="text" 
                  value="Presencial"
                  className="opacity-40 bg-neutral-500 text-sm font-medium"
                  />
                </div>

                {/* Turno */}
                <div className="col-span-1 space-y-2">
                  <Label className="text-zinc-600 text-sm font-semibold">Turno</Label>
                  <Input 
                  readOnly
                  disabled
                  type="text"
                  value="Noturno"
                  className="opacity-40 bg-neutral-500 text-sm font-medium"
                  />
                </div>
              </div>

               <div className="bg-white rounded-xl shadow overflow-hidden w-full">
                <Table className="min-w-[700px]">
                  <TableHeader className="bg-zinc-800">
                    <TableRow className="uppercase font-medium">
                      <TableHead className="text-white py-2 px-5">CÓDIGO</TableHead>
                      <TableHead className="text-white py-2 px-5">DISCIPLINA</TableHead>
                      <TableHead className="text-white py-2 px-5">PROFESSOR</TableHead>
                      <TableHead className="text-white py-2 px-5">DIA DA SEMANA</TableHead>
                      <TableHead className="text-white py-2 px-5">HORÁRIO</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white text-md text-black">
                    {disciplinas.length > 0 ? (
                      disciplinas.map((d) => (
                        <TableRow key={d.codigo} className="text-md">
                          <TableCell className="px-5">{d.codigo}</TableCell>
                          <TableCell className="px-5">{d.nome}</TableCell>
                          <TableCell className="px-5">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {professores.map((p) => (
                                  <SelectItem key={p.id} value={p.id}>
                                    {p.nome}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="px-5">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {diasSemana.map((dia) => (
                                  <SelectItem key={dia} value={dia}>
                                    {dia}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="px-5">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {horarios.map((h) => (
                                  <SelectItem key={h.id} value={h.id}>
                                    {h.intervalo}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Sem resultados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-center">
                <Button className="w-32 h-10 px-6 bg-zinc-800 rounded-2xl text-zinc-300">
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
