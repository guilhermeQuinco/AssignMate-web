import React, { PropsWithChildren } from "react";
import { SideBar } from "./_components/sidebar";
import { Header } from "./_components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NextTopLoader from "nextjs-toploader";

const LayoutDashboard = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider className="flex h-screen w-screen overflow-hidden">
      <SideBar />
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

export default LayoutDashboard;
