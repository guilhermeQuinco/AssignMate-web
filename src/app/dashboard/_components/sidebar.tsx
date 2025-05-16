"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
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
} from "../../../components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";

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
    <Sidebar className="font-robotoSlab">
      <SidebarHeader className="bg-zinc-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-zinc-700 flex flex-row gap-3 py-20"
            >
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo Assignmate"
                  width={200}
                  height={200}
                  priority
                />
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
                <CollapsibleTrigger className="text-white text-[1.12rem] py-3 hover:bg-zinc-700 hover:text-white">
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
                asChild
              >
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
                asChild
              >
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

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-zinc-700 hover:text-white text-lg">
                <Link href={"/dashboard/periodos-letivos"}>Período Letivo</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
