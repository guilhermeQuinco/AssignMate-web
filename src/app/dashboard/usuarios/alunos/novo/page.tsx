"use client";

import React from "react";
import { CalendarDays, GraduationCap, Lock } from "lucide-react";
import { User, Mail } from "lucide-react";
import { Container } from "@/app/dashboard/_components/container";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { addNewStudent } from "../actions/students";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, StudentSchemaType } from "@/schemas/studentSchema";
import { Button } from "@/components/ui/button";

const Student = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
  });
  const createUser = async (data: StudentSchemaType) => {
    // try {
    //   await addNewStudent(data);
    // } catch (error) {
    //   {
    //     isSubmitting ? "" : router.back();
    //   }
    // }

    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[#065D89] ">
      <Container>
        <main className="flex-1 ">
          <div className="">
            <div className="flex p-19 justify-between">
              <h2 className=" flex  text-4xl font- text-white ">
                Cadastro de Aluno
              </h2>
              <button
                className="bg-white text-black px-4 py-2 rounded flex items-center"
                onClick={() => router.back()}
              >
                <FaArrowLeft className="mr-2" /> Voltar
              </button>
            </div>

            {/* Table */}
            <div className="flex justify-center items-center rounded-2xl  mt-14 bg-black/10 p-20">
              <div className="flex items-center justify-center w-full max-w-screen-2xl h-full max-h-4xl  bg-opacity-30 p-50 rounded-4xl">
                {/* Formulario */}
                <form
                  className=" items-center justify-center ml-[-100px]  w-[86rem] h-[30rem] grid grid-cols-2 gap-4 px-20 text-black"
                  onSubmit={handleSubmit(createUser)}
                >
                  {/* Nome do Aluno */}
                  <div>
                    <label className="text-white font-semibold">
                      Nome do Aluno <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-[40rem] p-3 pl-10  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-[#D9D9D9]"
                        {...register("nomeCompleto")}
                      />
                      <span className="absolute left-3 top-3 text-gray-800">
                        <User className="w-6 h-6 text-[#000]" />
                      </span>
                    </div>

                    <span className="text-red-500">
                      {errors.nomeCompleto?.message}
                    </span>
                  </div>

                  {/* Data de Nascimento */}
                  <div className="relative left-52">
                    <label className="text-white font-semibold">
                      Data de Nascimento <span className="text-red-500">*</span>
                    </label>
                    <div className="">
                      <input
                        type="date"
                        className="w-[20rem]  p-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                        {...register("dataNascimento")}
                      />
                      <span className="absolute left-3 top-3 text-gray-500"></span>
                    </div>
                    <span className="text-red-500">
                      {errors.dataNascimento?.message}
                    </span>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-white font-semibold">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-[40rem]  p-3 pl-10  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                        {...register("email")}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        <Mail />
                      </span>
                    </div>
                    <span className="text-red-500">
                      {errors.email?.message}
                    </span>
                  </div>

                  {/* Matrícula */}
                  <div className="relative left-52">
                    <label className="text-white font-semibold">
                      Matrícula
                    </label>
                    <div className="relative">
                      <input
                        className="w-[20rem] p-3 pl-10  rounded-lg bg-[#D9D9D9]"
                        {...register("matricula")}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        <GraduationCap />
                      </span>
                    </div>
                    <span className="text-red-500">
                      {errors.matricula?.message}
                    </span>
                  </div>

                  {/* Senha */}
                  <div className="relative top-25 left-25">
                    <label className="text-white font-semibold">
                      Senha <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-[20rem] p-3 pl-10  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
                        {...register("senha")}
                        defaultValue={"123456"}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        <Lock />
                      </span>
                    </div>
                    <span className="text-red-500">
                      {errors.senha?.message}
                    </span>
                  </div>

                  {/* Confirmar Senha */}
                  <div className="relative ">
                    <label className="text-white font-semibold">
                      Confirmar Senha <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-[20rem] p-3 pl-10 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
                        {...register("confirmarSenha")}
                        defaultValue={"123456"}
                        disabled
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        <Lock />
                      </span>
                    </div>
                    <span className="text-red-500">
                      {errors.confirmarSenha?.message}
                    </span>
                  </div>

                  {/* <div className="col-span-2 flex justify-center mt-4">
                    <button
                      className="bg-green-500 border border-black text-white py-3 px-20 rounded-lg font-semibold hover:bg-green-600 transition"
                      type="submit"
                    >
                      SALVAR
                    </button>
                  </div> */}
                  <Button type="submit">Salvar</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Student;
