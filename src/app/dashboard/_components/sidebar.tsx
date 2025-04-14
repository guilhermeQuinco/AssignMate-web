"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
  {
    title: "Home",
    url: "#",
  },
  {
    title: "Inbox",
    url: "#",
  },
  {
    title: "Calendar",
    url: "#",
  },
  {
    title: "Search",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
];

export function SideBar() {
  const pathname = usePathname();

  // This is sample data.
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      {
        title: "Usuários",
        url: "#",
        items: [
          {
            title: "Alunos",
            url: "/dashboard/usuarios/alunos",
            isActive: pathname.includes("/alunos"),
          },
          {
            title: "Professores",
            url: "/dashboard/usuarios/professores",
            isActive: pathname.includes("/professores"),
          },
        ],
      },
    ],
  };
  return (
    // <div
    //   className="
    //   bg-zinc-800 text-white p-6 flex flex-col flex-grow font-playfair"
    // >
    //   <div className="mt-5 flex flex-row gap-3 items-center">
    //     <Image
    //       src="/logo_login.png"
    //       alt="Logo Assignmate"
    //       width={40}
    //       height={40}
    //       priority
    //     />
    //     Assign Mate
    //   </div>

    //   <nav className="w-full space-y-4 font-semibold mt-10 text-sm">
    //     <Link
    //       href={"/dashboard"}
    //       className={`w-full py-3 text-white hover:bg-zinc-800 rounded-lg flex items-center px-4 gap-3  transition-all ${
    //         pathname === "/dashboard" ? "bg-[#9E9898]" : ""
    //       }`}
    //     >
    //       Início
    //     </Link>

    //     <Accordion
    //       type="single"
    //       collapsible
    //       className={`w-full bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg  px-4 gap-3 text-[#313056] transition-all ${
    //         pathname.includes("/usuarios") ? "bg-[#9E9898]" : ""
    //       }`}
    //       defaultValue={pathname.includes("/usuarios") ? "item-1" : ""}
    //     >
    //       <AccordionItem value="item-1" className="border-none outline-none">
    //         <AccordionTrigger>
    //           <div className="flex items-center gap-3">
    //             <span className="text-md font-semibold">Usuários</span>
    //           </div>
    //         </AccordionTrigger>
    //         <AccordionContent className="flex flex-col gap-3">
    //           <Link href={"/dashboard/usuarios/alunos"} className="w-full">
    //             <div
    //               className={`w-full px-8 ${
    //                 pathname.includes("/alunos") ? "font-bold" : ""
    //               }`}
    //             >
    //               Alunos
    //             </div>
    //           </Link>
    //           <Link href={"/dashboard/usuarios/professores"} className="w-full">
    //             <div
    //               className={`w-full px-8 ${
    //                 pathname.includes("/professores") ? "font-bold" : ""
    //               }`}
    //             >
    //               Professores
    //             </div>
    //           </Link>
    //         </AccordionContent>
    //       </AccordionItem>
    //     </Accordion>

    //     <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
    //       Turma
    //     </button>
    //     <button className="w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all">
    //       Disciplina
    //     </button>
    //     <Link
    //       href={"/dashboard/cursos"}
    //       className={`w-full py-3 bg-[#d9d9d9] hover:bg-[#c0c0c0] rounded-lg flex items-center px-4 gap-3 text-[#313056] transition-all  ${
    //         pathname.includes("/cursos") ? "bg-[#9E9898]" : ""
    //       }`}
    //     >
    //       Curso
    //     </Link>
    //   </nav>
    // </div>

    <Sidebar>
      <SidebarHeader className="bg-zinc-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-zinc-700 flex flex-row gap-3"
            >
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-gray-100 ">
                  <Image
                    src="/logo.png"
                    alt="Logo Assignmate"
                    width={40}
                    height={40}
                    priority
                  />
                </div>
                <div className="grid flex-1 text-left  leading-tight text-white text-xl">
                  <span className="truncate font-semibold">Assign Mate</span>
                  <span className="truncate text-sm">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-zinc-800 text-white gap-0 pt-3">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            className="group/collapsible"
            defaultOpen={
              pathname.includes("alunos") || pathname.includes("professores")
                ? true
                : false
            }
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="text-white text-[1em] py-3 hover:bg-zinc-700 hover:text-white">
                  {item.title}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub className="">
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.isActive}
                          className=""
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-zinc-700 hover:text-white text-lg"
                isActive={pathname.includes("turmas")}
                asChild>
                <Link href={"/dashboard/turmas"}>Turma</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-zinc-700 hover:text-white text-lg"
                isActive={pathname.includes("cursos")}
                asChild>
                <Link href={"/dashboard/cursos"}>Curso</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-zinc-700 hover:text-white text-lg">
                <Link href={"/dashboard/disciplinas"}>Disciplina</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
