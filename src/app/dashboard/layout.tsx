import React, { PropsWithChildren } from "react";
import { SideBar } from "./_components/sidebar";
import { Header } from "./_components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const LayoutDashboard = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset>
        <Header />
        <main className="w-full ">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutDashboard;
