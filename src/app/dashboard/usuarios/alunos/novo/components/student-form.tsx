"use client";

import { Button } from "@/components/ui/button";
import { User, Mail, GraduationCap, Lock } from "lucide-react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Container } from "@/app/dashboard/_components/container";
import { useRouter } from "next/navigation";
import { studentSchema, StudentSchemaType } from "@/schemas/studentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addNewStudent } from "../../actions/students";
import { generateRegistration } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentForm = ({
  lastRegistration,
  courses,
}: {
  lastRegistration: string;
  courses: string[];
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
  });

  function generateNewRegistration() {
    const numberString = lastRegistration.replace("ALUNO", "");
    const number = parseInt(numberString, 10);

    const nextNumber = number + 1;
    const newRegistration = generateRegistration("ALUNO", nextNumber);

    return newRegistration;
  }

  const onSubmit = async (data: StudentSchemaType) => {
    console.log(data);
  };

  return (
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
                className=" ml-[-100px]  h-[30rem] grid grid-cols-2 gap-32 px-20 text-black"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Nome do Aluno */}
                <div className="flex flex-col gap-5">
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
                  <div className=" w-full">
                    <label className="text-white font-semibold">
                      Data de Nascimento <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                      <input
                        type="date"
                        className="w-full  p-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                        {...register("dataNascimento")}
                      />
                      <span className="absolute left-3 top-3 text-gray-500"></span>
                    </div>
                    <span className="text-red-500">
                      {errors.dataNascimento?.message}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="w-full">
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
                </div>

                <div className="flex flex-col gap-5">
                  {/* Matrícula */}
                  <div className="w-full">
                    <label className="text-white font-semibold">
                      Matrícula
                    </label>
                    <div className="">
                      <span className="absolute left-3 top-3 text-black">
                        <GraduationCap color="black" />
                      </span>
                      <input
                        className="w-full p-3 pl-10  rounded-lg bg-gray-400"
                        {...register("matricula")}
                        defaultValue={generateNewRegistration()}
                        disabled
                      />
                    </div>
                    <span className="text-red-500">
                      {errors.matricula?.message}
                    </span>
                  </div>
                </div>
                {/* Curso*/}
                <div className="">
                  <label className="text-white font-semibold">
                    Curso <span className="text-red-500">*</span>
                  </label>
                  <div className="">
                    {/* <Select {...register("curso")}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {courses.map((item, index) => (
                            <option value={item} key={item}>
                              <SelectItem value={item} key={item}>
                                {item}
                              </SelectItem>
                            </option>
                          ))}

                          
                        </SelectGroup>
                      </SelectContent>
                    </Select> */}
                    <select
                      className="bg-white p-4 rounded-lg w-full"
                      {...register("curso")}
                    >
                      <option value="">
                        {isSubmitting ? "Loading..." : "Choose a category"}
                      </option>
                      {courses.map((item, index) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Senha */}
                {/* <div className="relative">
                    <label className="text-white font-semibold">
                      Senha <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full p-3 pl-10  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
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
                </div> */}

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
  );
};

export default StudentForm;
