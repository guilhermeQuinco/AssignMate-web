import React, { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NextTopLoader from "nextjs-toploader";
import { Header } from "../dashboard/_components/header";
import { SideBarAluno } from "./components/sidebar-aluno";

const LayoutPortalAluno = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider className="flex h-screen w-screen overflow-hidden ">
      <SideBarAluno />
      <SidebarInset>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div>
            <NextTopLoader color="#098dc0" />
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutPortalAluno;
