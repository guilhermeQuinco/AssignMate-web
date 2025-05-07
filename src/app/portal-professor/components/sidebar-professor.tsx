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

export function SideBarProfessor() {
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
    <Sidebar className="font-robotoSlab ">
      <SidebarHeader className="bg-[#1D3E62]">
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

      <SidebarContent className="bg-[#1D3E62] text-white gap-0 pt-3">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-[#244e7c] hover:text-white text-lg"
                isActive={pathname.includes("turmas")}
                asChild
              >
                <Link href={"/dashboard/turmas"}>Turma</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
