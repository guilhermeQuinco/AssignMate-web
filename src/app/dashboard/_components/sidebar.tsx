import Image from "next/image";
import Link from "next/link";

export function SideBar() {
  return (
    <div
      className="
      bg-[#313056] text-white p-6 flex flex-col flex-grow items-center font-playfair"
    >
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
        <Link
          href={"/dashboard"}
          className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all"
        >
          <Image
            src="/icon_inicio.png"
            alt="Ícone Início"
            width={24}
            height={24}
          />
          Início
        </Link>

        <Link
          href={"/dashboard/usuarios"}
          className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center justify-between px-4 gap-3 text-[#313056] transition-all"
        >
          <div className="justify-between flex flex-row gap-2">
            <Image
              src="/icon_usuario.png"
              alt="Ícone Usuários"
              width={24}
              height={24}
            />
            Usuários
          </div>
          <Image
            src="/seta.png"
            alt="icone seta"
            width={22}
            height={22}
          ></Image>
        </Link>

        <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
          <Image
            src="/icon_turma.png"
            alt="Ícone Turmas"
            width={24}
            height={24}
          />
          Turma
        </button>
        <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
          <Image
            src="/icon_disc.png"
            alt="Ícone Disciplinas"
            width={24}
            height={24}
          />
          Disciplina
        </button>
        <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
          <Image
            src="/icon_curso.png"
            alt="Ícone Cursos"
            width={24}
            height={24}
          />
          Curso
        </button>
      </nav>
    </div>
  );
}
