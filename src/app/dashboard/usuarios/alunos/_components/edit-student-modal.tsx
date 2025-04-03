import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { StudentSchemaType } from "@/schemas/studentSchema";
import { Button } from "@/components/ui/button";

interface StudentProps {
  nomeCompleto: string;
  email: string;
  matricula: string;
  dataNascimento: string;
}

const EditStudentModal = ({ student }: { student: StudentProps }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Edit size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] bg-white">
        <DialogHeader>
          <DialogTitle>Editar Informações</DialogTitle>
          <DialogDescription>
            <span className="text-black">{student.email}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Button type="submit" className="font-bold">
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentModal;
