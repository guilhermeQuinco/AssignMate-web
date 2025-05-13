import React from "react";
import { Container } from "@/app/dashboard/_components/container";
import { SectionHeaderProfessor } from "@/app/portal-professor/components/sectionHeaderProfessor";
import { ListChecks, CalendarDays } from "lucide-react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Params = Promise<{
  id: string;
}>;

const DetalhesTurma = async (props: { params: Params }) => {
  const { id } = await props.params;

  console.log(id);

  return (
    <main className="bg-[#d9d9d9] min-h-screen pb-10">
      {/* <div>{id}</div>; */}
      <Container>
        <SectionHeaderProfessor title="Detalhes da Turma: SIS221N01" />
        <div className="w-3/4 mx-auto mt-10 border border-[#1d3e62] rounded-md px-6 py-6 bg-[#d9d9d9] text-[#0f172a] flex flex-col sm:flex-row justify-between">
          <div className="space-y-2 sm:w-[48%]">
            <p>
              <strong>DISCIPLINA:</strong>{" "}
              <span className="text-gray-600">Programação Orientada a Objetos</span>
            </p>
            <p>
              <strong>TURMA:</strong>{" "}
              <span className="text-gray-600">02</span>
            </p>
            <p>
              <strong>CURSO:</strong>{" "}
              <span className="text-gray-600">Sistemas de Informação</span>
            </p>
            <p>
              <strong>DOCENTE:</strong>{" "}
              <span className="text-gray-600">Israel</span>
            </p>
          </div>

          <div className="space-y-2 w-full sm:w-[48%]">
            <p>
              <strong>CH LANÇADAS:</strong>{" "}
              <span className="text-red-600 font-semibold">0%</span>
            </p>
            <p>
              <strong>ANO:</strong>{" "}
              <span className="text-gray-600">2025</span>
            </p>
            <p>
              <strong>PERÍODO:</strong>{" "}
              <span className="text-gray-600">1°</span>
            </p>
          </div>
        </div>

        {/* Bloco 2: Status e Conteúdo da Aula */}
        <div className="w-3/4 mx-auto mt-10 border border-[#1d3e62] rounded-md px-8 py-6  bg-[#d9d9d9] text-[#0f172a] flex flex-wrap justify-between gap-y-4">
          <div className="space-y-2 w-full sm:w-[45%]">
            <p><strong>STATUS:</strong>{" "}
              <select
                id="status"
                name="status"
                className="px-1 py-1 rounded-xl bg-[#d9d9d9] border border-[#ABABAB] text-[#0f172a] text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a3a3a3] transition"
                defaultValue=""
              >
                <option value="" disabled>Aula pendente</option>
                <option value="realizada">Aula realizada</option>
                <option value="cancelada">Aula cancelada</option>
              </select>
            </p>

            <p>
              <strong>DATA:</strong>{" "}
              <input
                type="date"
                id="data"
                name="data"
                className="px-1 py-1 rounded-xl bg-[#d9d9d9] border border-[#ABABAB] text-[#0f172a] text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a3a3a3] transition"
                defaultValue="2025-01-01"
              />
            </p>
            <p>
              <strong>CARGA HORÁRIA:</strong>{" "}
              <span className="text-gray-600">66</span>
            </p>
          </div>

          <div className="w-full sm:w-[50%]">
            <p><strong>CONTEÚDO DA AULA:</strong></p>
            <textarea
              className="w-full h-28 mt-2 p-3 border rounded-md resize-none bg-[#d9d9d9] border-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-[#a3a3a3]"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center gap-10 mt-10">
          <Link href="./gerenciamento">
          <button className="bg-green-400 hover:bg-green-500 text-black font-semibold p-4 rounded-xl shadow-md transition-colors duration-200 border-2 border-transparent hover:border-black">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="black" strokeWidth="1.5" />
              <path d="M6 15.8L7.14286 17L10 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 8.8L7.14286 10L10 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 9L18 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13 16L18 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          </Link>



          <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold p-4 rounded-xl shadow-md transition-colors duration-200 border-2 border-transparent hover:border-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="black" strokeWidth="1.5" />
              <path d="M7 4V2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M17 4V2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2.5 9H21.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="black" />
              <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="black" />
              <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="black" />
              <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="black" />
              <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="black" />
              <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="black" />
            </svg>

          </button>
        </div>
      </Container>
    </main >
  )

};

export default DetalhesTurma;
