import React from "react";
import background from "../../../public/bg_login.png";
import Image from "next/image";
import background_login from "../../../public/logo_login.png";
import lock from "../../../public/icon_lock.png";
import user from "../../../public/icon_user.png";
import fundo_fosco from "../../../public/FundoFosco.png"

import { BiCheckboxChecked, BiLock, BiUser } from "react-icons/bi";
import Link from "next/link";

const login = () => {
  return (
    <div className="min-h-screen flex-col flex justify-center items-center">
      <Image
        className="object-cover -z-10"
        src={background}
        layout="fill"
        objectFit="cover"
        alt="background_login"
      ></Image>
      <div className="w-[70%] h-[700px] border border-white-600/50 bg-gray-400/20 backdrop-blur-lg grid grid-cols-[30rem_1fr] overflow-hidden rounded-3xl bg-[url('/FundoFosco.png')] bg-cover bg-center">
        
        <div className="flex justify-center items-center bg-custom-gradient">
            <Image alt="logo_login" src={background_login} className=""></Image>
        </div>

        <div className="flex-col flex justify-center items-center font-centurygothic">
          <div className="flex flex-col gap-10">
            <h2 className="text-black text-[48px] font-centurygothic">
              FAÇA LOGIN
            </h2>
            <div className="flex flex-row gap-5 items-center bg-[#D9D9D9] p-3 rounded-full w-[350px]">
              <Image alt="icon_user" src={user}></Image>
              <div className="bg-black w-[1px] h-[30px]"></div>
              <input
                className="bg-transparent placeholder:text-black w-full text-black"
                placeholder="USUÁRIO"
              ></input>
            </div>

            <div className="flex flex-row gap-5 items-center bg-[#D9D9D9] p-3 rounded-full w-[350px]">
              <Image alt="icon_lock" src={lock}></Image>
              <div className="bg-black w-[1px] h-[30px]"></div>
              <input
                className="bg-transparent placeholder:text-black w-full text-black"
                placeholder="SENHA"
              ></input>
            </div>
            <div className="flex flex-row justify-between text-black items-center text-sm">
              <input type="checkbox" className="w-5 h-5" />
              <h1> Lembrar de mim</h1>
              <Link href="https://www.youtube.com">Esqueceu a senha?</Link>
            </div>
            <div>
              <button className="bg-[#313056] w-full py-3 rounded-full text-[25px]">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
