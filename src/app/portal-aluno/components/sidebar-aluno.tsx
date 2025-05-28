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

export function SideBarAluno() {
  const pathname = usePathname();

  // This is sample data.
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      {
        title: "Acadêmico",
        url: "#",
        items: [
          {
            title: "Notas",
            url: "/portal-aluno/academico/notas",
            isActive: pathname.includes("/notas"),
          },
          {
            title: "Frequência",
            url: "/portal-aluno/academico/frequencia",
            isActive: pathname.includes("/frequencia"),
          },
          {
            title: "Desempenho",
            url: "/portal-aluno/academico/desempenho",
            isActive: pathname.includes("/desempenho"),
          },
        ],
      },
    ],
  };

  return (
    <Sidebar className="font-robotoSlab  ">
      <SidebarHeader className="bg-[#0076A3]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-zinc-2700 flex flex-row gap-3 py-20"
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

      <SidebarContent className="bg-[#0076A3] text-white gap-0 pt-3">
        
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            className="group/collapsible"
            defaultOpen={
              pathname.includes("notas") || pathname.includes("frequencia") || pathname.includes("desempenho")
                ? true
                : false
            }
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-lg text-sidebar-foreground hover:bg-[#244e7c]  hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="text-white text-[1.12rem] py-3 hover:bg-[#0076A3] hover:text-white">
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
                className={`text-lg hover:bg-[#244e7c] hover:text-white ${
                  pathname.includes("quadro-de-horarios") ? "bg-[#244e7c] text-white" : ""
                }`}
                asChild
              >
                <Link href={"/portal-aluno/quadro"}>Quadro de Horários</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
