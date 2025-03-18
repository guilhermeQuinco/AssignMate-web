import React from "react";
import { Lock } from "lucide-react";
import { Container } from "@/app/dashboard/_components/container";

const Users = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Container>
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-5xl text-black">
          <h1 className="text-2xl font-bold mb-6">Cadastro de Aluno</h1>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">Nome do Aluno</label>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Data de Nascimento</label>
                <input
                  type="date"
                  className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">E-mail</label>
                <input
                  type="email"
                  className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Matrícula</label>
                <input className="border rounded-lg px-4 py-2 w-full  focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold ">Senha</label>
                <input
                  type="password"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Confirmar Senha</label>
                <input
                  type="password"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-blue-500"
                />
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
      </Container>
    </div>
  );
};

export default Users;
