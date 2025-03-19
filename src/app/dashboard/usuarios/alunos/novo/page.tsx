import React from "react";
import { CalendarDays, GraduationCap, Lock } from "lucide-react";
import { User, Mail} from "lucide-react";
import { Container } from "@/app/dashboard/_components/container";



const Users = () => {
  
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4 ">

        <div className="bg-[#2176b3a1] rounded-lg shadow-md p-8 w-full max-w-5xl text-black ">
          <h1 className="text-2xl font-bold mb-6">Cadastro de Aluno</h1>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">Nome do Aluno <span className="text-red-600">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                  type="text"
                  className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#ffff]"
                />
                </div>
                
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Data de Nascimento</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                  type="date"
                  className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#ffff]"
                />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">E-mail <span className="text-red-600">*</span></label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#ffff]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Matrícula <span className="text-red-600">*</span></label>
                <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input type="text"
                  className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#ffff]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold ">Senha <span className="text-red-600">*</span></label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input type="password"
                    className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#ffff]"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Confirmar Senha <span className="text-red-600">*</span></label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input type="password"
                    className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#ffff]"/>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                className="bg-[#52A00E] text-white py-3 px-5 rounded-lg hover:bg-green-700 transition-colors "
              >
                SALVAR
              </button>
            </div>
          </form>
        </div>

    </div>
  );
};

export default Users;
