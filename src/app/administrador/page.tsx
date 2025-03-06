"use client"
import { useState, useEffect } from "react";
import { User, Bell, HelpCircle, Settings, LogOut } from "lucide-react";
import React from "react";
import Image from "next/image";
import bemvindo from "../../../public/bg_bemvindo.png";


const Administrador = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    setCurrentDate(`Manaus, ${formattedDate}`);
  }, []);

  return (
    <div className="flex h-screen bg-[#415A77] flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-[#313056] text-white p-6 flex flex-col items-center font-playfair">
        <div className="mt-8">
          <Image 
            src="/logo_login.png" 
            alt="Logo Assignmate" 
            width={84} 
            height={84}
            priority
          />
        </div>

        <h1 className="my-8 tracking-[10px] text-2xl font-semibold">
          ASSIGNMATE
        </h1>
        
        <nav className="w-full space-y-4">
          <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
            <Image src="/icon_inicio.png" alt="Ícone Início" width={24} height={24} />
            Início
          </button>
          <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center justify-between px-4 gap-3 text-[#313056] transition-all">
            <div className="justify-between flex flex-row gap-2">
              <Image src="/icon_usuario.png" alt="Ícone Usuários" width={24} height={24} />
              Usuários
            </div>
            <Image src="/seta.png" alt="icone seta" width={22} height={22} ></Image> 
          </button>
          <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
            <Image src="/icon_turma.png" alt="Ícone Turmas" width={24} height={24} />
            Turma
          </button>
          <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
            <Image src="/icon_disc.png" alt="Ícone Disciplinas" width={24} height={24} />
            Disciplina
          </button>
          <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
            <Image src="/icon_curso.png" alt="Ícone Cursos" width={24} height={24} />
            Curso
          </button>
        </nav>
      </div>
      
      <div className="flex-1 flex flex-col">
        <header className="w-full bg-[#415A77] shadow-md p-2 flex justify-between items-center border-b border-[#313056]">
          <div className="text-[#d9d9d9] font-medium text-lg font-playfair tracking-[3px] px-5">{currentDate}</div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-[#d9d9d9]" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6 text-[#d9d9d9]" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <HelpCircle className="w-6 h-6 text-[#d9d9d9]" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-6 h-6 text-[#d9d9d9]" />
            </button>
            <button className="p-2 hover:bg-red-100 rounded-full">
              <LogOut className="w-6 h-6 text-[#d9d9d9]" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 flex items-center justify-center relative w-full h-full overflow-hidden">
          <h1 className="text-center text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-playfair tracking-[5px]">Bem-vindo</h1>
          <Image src={bemvindo} alt="bemvindo" fill priority />
        </div>
      </div>
    </div>
  );
};

export default Administrador;
