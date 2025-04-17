"use client";

import { Book, Code } from "lucide-react";
import { Container } from "../../_components/container";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, CourseSchemaType } from "@/schemas/courseSchema";
import { addCourse } from "../actions/course";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseForm() {
  const [course, setCourse] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      nome: "",
      codigo: "",
    },
  });

  const router = useRouter();

  function generateCourseCode() {
    return course.slice(0, 3).toUpperCase();
  }

  const createCourse = async (data: CourseSchemaType) => {
    try {
      await addCourse(data);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const courseName = watch("nome");

  useEffect(() => {
    if (courseName) {
      const generatedCode = courseName
        .slice(0, 3)
        .toUpperCase()
        .replace(/\s+/g, ""); // Remove espaços se houver

      setValue("codigo", generatedCode);
    }
  }, [courseName, setValue]);

  return (
    <main className="min-h-screen bg-[#d9d9d9]">
      <Container>
        <h1 className="text-[2em]">Cadastro de Curso</h1>
        <div className=" rounded-2xl  mt-14 bg-white p-14">
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(createCourse)}
          >
            <div className="grid grid-cols-2 gap-14">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label className="text-xl">Código</label>
                  <div className="flex flex-row bg-gray-500 rounded-lg p-3 items-center gap-3 border border-black">
                    <Controller
                      name="codigo"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="codigo"
                          className="w-full p-2 bg-transparent  rounded outline-none text-black"
                          readOnly
                          disabled
                          defaultValue={generateCourseCode()}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xl">Nome</label>
                  <div
                    className={`flex flex-row bg-white border ${
                      errors.nome && "border-red-500"
                    } border-black rounded-lg p-3 ouline gap-3 items-center`}
                  >
                    <Controller
                      name="nome"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="nome"
                          className="w-full p-2 rounded bg-transparent outline-none text-black font-semibold"
                          placeholder="Digite o nome do curso..."
                        />
                      )}
                    />
                  </div>
                  {errors.nome && (
                    <p className="text-rose-500 text-sm mt-1">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xl">Descrição</label>
                <div
                  className={`flex flex-row bg-white border border-black rounded-lg p-3 ouline gap-3 items-center ${
                    errors.descricao && "border-red-500"
                  }`}
                >
                  <textarea
                    className="bg-transparent text-black outline-none text-lg w-full min-h-[300px]"
                    {...register("descricao")}
                  />
                </div>
                {errors.descricao && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.descricao.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <Button
                type="submit"
                className="w-[10%] py-6 text-lg font-semibold"
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
}
