"use client";

import React, { useActionState, useState } from "react";
import LoginImage from "../../../public/login-image.png";
import Image from "next/image";
import background_login from "../../../public/logo.png";
import lock from "../../../public/icon_lock.png";
import user from "../../../public/icon_user.png";

import { BiCheckboxChecked, BiLock, BiUser } from "react-icons/bi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchem";
import { z } from "zod";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { signIn } from "../actions/auth";
import { redirect } from "next/navigation";

export type LoginUserSchema = z.infer<typeof loginSchema>;

const login = () => {
  const [onVisible, setOnVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const visiblePassword = (e: any) => {
    e.preventDefault();
    setOnVisible((prev) => !prev);
  };

  const onSubmit = async (formData: LoginUserSchema) => {
    const response = await signIn(formData);

    if (response.email === "prof@escola.com") {
      redirect("/portal-professor");
    } else {
      if (response.email === "admin@escola.com") {
        redirect("dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <Image
        className="w-full h-screen "
        src={LoginImage}
        alt="background_login"
      />
      <div className=" bg-white overflow-hidden flex flex-col justify-center">
        <div className="w-full flex flex-col justify-center items-center ">
          <Image
            alt="logo_login"
            src={background_login}
            className=""
            width={300}
            quality={100}
          ></Image>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-10 flex-col flex justify-center items-center font-centurygothic"
        >
          <div className="max-w-[50%] flex flex-col gap-5 w-full">
            <div>
              <div
                className={`flex flex-col gap-3
                }`}
              >
                <label className="text-black">E-mail</label>
                <input
                  className={`bg-transparent border-2 rounded-lg p-2 placeholder:text-black w-full text-black outline-none ${
                    errors.email && "border-red-500"
                  }`}
                  {...register("email")}
                  type="text"
                />
              </div>
              <span className="text-red-700 p-3">{errors.email?.message}</span>
            </div>

            <div>
              <div className={`flex flex-col gap-3`}>
                <label className="text-black">Senha</label>
                <div
                  className={`w-full flex flex-row justify-between border-2 rounded-lg p-2 ${
                    errors.password && "border-red-500"
                  }`}
                >
                  <input
                    {...register("password")}
                    className="bg-transparent w-full outline-none text-black"
                    type={onVisible ? "text" : "password"}
                  />
                  <button onClick={visiblePassword}>
                    {onVisible ? (
                      <BsEyeSlash size={30} color="#000" />
                    ) : (
                      <BsEye size={30} color="#000" />
                    )}
                  </button>
                </div>
              </div>
              <span className="text-red-700 p-3">
                {errors.password?.message}
              </span>
            </div>

            <div className="flex flex-row justify-between text-black items-center text-sm">
              <div className="text-blue-950 flex flex-row gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-xl bg-white"
                />
                <h1> Lembrar de mim</h1>
              </div>

              <Link href="https://www.youtube.com">Esqueceu a senha?</Link>
            </div>
            <div>
              <button
                className="bg-[#313056] w-full py-3 rounded-lg text-[25px] hover:opacity-90 text-white"
                type="submit"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
