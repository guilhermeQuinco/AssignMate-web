"use client";

import { signOut } from "@/app/actions/auth";
import { Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

export function Header() {
  const [currentDate, setCurrentDate] = useState("");

  const pathname = usePathname();

  const { user } = useUserContext();

  console.log(user);

  useEffect(() => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    setCurrentDate(`Manaus, ${formattedDate}`);
  }, []);

  const deleteSession = async () => {
    await signOut();
  };

  return (
    <header
      className={`sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b z-10 flex-row justify-between px-5 bg-[#d9d9d9] ${pathname.includes("/portal-professor")
          ? "border-[#1D3E62]"
          : pathname.includes("/portal-aluno")
            ? "border-[#0076A3]"
            : "border-zinc-800"
        } `}
    >
      <div
        className={`${pathname.includes("/portal-professor")
            ? "text-[#1D3E62]"
            : pathname.includes("/portal-aluno")
              ? "text-[#0076A3]"
              : "text-zinc-800"
          } font-medium text-lg tracking-[1px] gap-3 flex items-center font-robotoSlab`}
      >
        <SidebarTrigger />
        <div
          className={`${pathname.includes("/portal-professor")
              ? "bg-[#1D3E62]"
              : pathname.includes("/portal-aluno")
                ? "bg-[#0076A3]"
                : "bg-zinc-800"
            } w-[1px] h-5`}
        />
        {currentDate}
      </div>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          {/* Botão de notificação */}

          {pathname.includes("/portal-professor") || pathname.includes("/portal-aluno") ? (
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full font-robotoSlab">
              <Bell
                className={`${pathname.includes("/portal-professor")
                    ? "text-[#1D3E62]"
                    : pathname.includes("/portal-aluno")
                      ? "text-[#0076A3]"
                      : "text-zinc-800"
                  } w-6 h-6`}
              />
            </button>
          ) : null}

          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full font-robotoSlab">
              <User
                className={`${pathname.includes("/portal-professor")
                    ? "text-[#1D3E62]"
                    : pathname.includes("/portal-aluno")
                      ? "text-[#0076A3]"
                      : "text-zinc-800"
                  } w-6 h-6`}
              />
              <span
                className={`${pathname.includes("/portal-professor")
                    ? "text-[#1D3E62]"
                    : pathname.includes("/portal-aluno")
                      ? "text-[#0076A3]"
                      : "text-zinc-800"
                  } font-medium`}
              >
                {user?.name}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-robotoSlab">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={deleteSession}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}