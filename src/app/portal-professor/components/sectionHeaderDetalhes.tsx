"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SectionHeaderProps {
    title: string;
    addLabel?: string;
    onSave?: () => void; // nova prop opcional
}

export function SectionHeaderDetalhes({
    title,
    addLabel = "Voltar",
    onSave,
}: SectionHeaderProps) {
    const router = useRouter();

    return (
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

            <div className="space-y-2 w-full sm:w-[24%]">
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

            {/* space-y-1 w-full sm:w-[48%] flex justify-cente items-center */}
            <div className="w-full sm:w-[20%] flex items-center justify-center">
                <p>
                    <Button onClick={onSave} className="bg-[#20AB51] hover:bg-green-700  text-white px-4 py-1 rounded-full font-semibold text-sm ">
                        Concluido
                    </Button>
                </p>
            </div>
        </div>
    );
}
