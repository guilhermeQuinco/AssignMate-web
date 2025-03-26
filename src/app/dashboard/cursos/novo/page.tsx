"use client";

import { Book, Code } from "lucide-react";
import { Container } from "../../_components/container";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, CourseSchemaType } from "@/schemas/courseSchema";
import { addCourse } from "../actions/course";
import { useRouter } from "next/navigation";

export default function CourseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
  });

  const router = useRouter();

  const createCourse = async (data: CourseSchemaType) => {
    try {
      await addCourse(data);
      router.back();
      router;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#065D89]">
      <Container>
        <div className="lex justify-center items-center rounded-2xl  mt-14 bg-black/10 p-20">
          <form
            className="grid grid-cols-2 gap-14"
            onSubmit={handleSubmit(createCourse)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <label className="text-xl">Disciplina</label>
                <div className="flex flex-row bg-white rounded-lg p-3 items-center gap-3">
                  <Book color="black" />
                  <input
                    className="bg-transparent text-black outline-none "
                    {...register("nome")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xl">Código da turma</label>
                <div className="flex flex-row bg-gray-400 rounded-lg p-3 ouline gap-3 items-center">
                  <Code color="black" />
                  <input
                    className="bg-transparent text-black outline-none text-lg"
                    defaultValue={"SISN01"}
                    {...register("codigo")}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl">Descrição</label>
              <div className="flex flex-row bg-white rounded-lg p-3 ouline gap-3 items-center">
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
